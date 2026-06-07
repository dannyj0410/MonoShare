import asyncHandler from "express-async-handler";
import argon2 from "argon2";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma-client.js";
import { AuthBase, AuthDto, UserResponse } from "../dtos/auth.dto.js";
import { AuthService } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_CREATED,
  HTTP_SUCCESS,
  HTTP_UNAUTHORIZED,
} from "../constants/http_status.js";
import { invalidateCachedSession } from "../lib/sessionCache.js";
import { TokenService } from "../services/token.service.js";
import { EmailService } from "../services/email.service.js";
import { TokenType } from "@prisma/client";

//* CREATE
export const createUser = asyncHandler(
  async (req: Request, res: Response<UserResponse>) => {
    const { email, password, confirm }: AuthDto = req.body;

    AuthService.validateAuthPayload({
      email,
      password,
      confirm,
    });

    const normalizedEmail = email.trim().toLowerCase();
    const userExists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (userExists) {
      throw new AppError(
        "A user with that email already exists",
        HTTP_CONFLICT,
      );
    }

    const passwordHash = await AuthService.hashPassword(password);
    const expiresAt = new Date(Date.now() + 7 * 86400000); //7 days ms
    const [user, session, token] = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email: normalizedEmail, passwordHash },
      });

      const existingToken = req.cookies.session;
      if (existingToken) {
        const existingTokenHash = AuthService.hashSessionToken(existingToken);
        invalidateCachedSession(existingTokenHash);
      }

      const token = AuthService.generateSessionToken();
      const tokenHash = AuthService.hashSessionToken(token);
      const session = await tx.session.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      return [user, session, token];
    });

    if (!user || !session) {
      throw new AppError("Error creating user or session", HTTP_BAD_REQUEST);
    }

    // send verification email
    const verificationToken = await TokenService.createEmailVerificationToken(
      user.id,
    );
    await EmailService.sendVerificationEmail(user.email, verificationToken);

    res
      .status(HTTP_CREATED)
      .cookie("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: session.expiresAt,
        path: "/",
      })
      .json({
        message: "User registered successfully",
        user: {
          email: user.email,
          id: user.id,
          emailVerified: user.emailVerified,
        },
      });
  },
);

//* SIGN IN
export const signinUser = asyncHandler(
  async (req: Request, res: Response<UserResponse>) => {
    const { email, password }: AuthDto = req.body;

    AuthService.validateAuthPayload({
      email,
      password,
    });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    const verifiedPassword = user
      ? await AuthService.verifyPassword(user.passwordHash, password)
      : false;
    if (!user || !verifiedPassword) {
      throw new AppError("Incorrect email or password", HTTP_UNAUTHORIZED);
    }

    const existingToken = req.cookies.session;
    if (existingToken) {
      const existingTokenHash = AuthService.hashSessionToken(existingToken);
      invalidateCachedSession(existingTokenHash);
    }

    const token = AuthService.generateSessionToken();
    const tokenHash = AuthService.hashSessionToken(token);
    const expiresAt = new Date(Date.now() + 7 * 86400000); //7 days
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    res
      .status(HTTP_SUCCESS)
      .cookie("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: session.expiresAt,
        path: "/",
      })
      .json({
        message: "Sign in successful",
        user: {
          email: user.email,
          id: user.id,
          emailVerified: user.emailVerified,
        },
      });
  },
);

//* LOGOUT
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const tokenHash = req.session!.tokenHash;

  await prisma.session.delete({ where: { tokenHash } });
  invalidateCachedSession(tokenHash);
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.status(HTTP_SUCCESS).json({ message: "Successfully logged out" });
  return;
});

//* USER CHECK
export const checkUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Unauthorized", HTTP_BAD_REQUEST);
  }

  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });

  res.status(HTTP_SUCCESS).json({
    user: {
      email: user.email,
      createdAt: user.createdAt,
      emailVerified: user.emailVerified,
    },
  });
  return;
});

// Email verification
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) throw new AppError("Token is required", HTTP_BAD_REQUEST);

  const record = await TokenService.validateToken(
    token,
    TokenType.EMAIL_VERIFICATION,
  );
  if (!record) {
    throw new AppError(
      "Invalid or expired verification link",
      HTTP_BAD_REQUEST,
    );
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: true },
    }),
    prisma.token.update({
      where: { tokenHash: TokenService.hashToken(token) },
      data: { usedAt: new Date() },
    }),
  ]);

  const tokenHash = req.session!.tokenHash;
  if (tokenHash) {
    invalidateCachedSession(tokenHash);
  }

  res.status(HTTP_SUCCESS).json({ message: "Email verified successfully" });
});

export const resendVerification = asyncHandler(async (req, res) => {
  const user = req.user!;

  if (user.emailVerified) {
    throw new AppError("Email already verified", HTTP_BAD_REQUEST);
  }

  const token = await TokenService.createEmailVerificationToken(user.id);
  await EmailService.sendVerificationEmail(user.email, token);

  res.status(HTTP_SUCCESS).json({ message: "Verification email sent" });
});

// Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new AppError("Email is required", HTTP_BAD_REQUEST);

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (user) {
    const token = await TokenService.createPasswordResetToken(user.id);
    await EmailService.sendPasswordResetEmail(user.email, token);
  }
  res.status(HTTP_SUCCESS).json({
    message: "A reset link has been sent to that email",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    throw new AppError("Token and password are required", HTTP_BAD_REQUEST);
  }

  AuthService.validatePassword(password);

  const record = await TokenService.validateToken(
    token,
    TokenType.PASSWORD_RESET,
  );
  if (!record) {
    throw new AppError("Invalid or expired reset link", HTTP_BAD_REQUEST);
  }

  const passwordHash = await AuthService.hashPassword(password);
  const tokenHash = TokenService.hashToken(token);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    }),
    prisma.token.update({
      where: { tokenHash },
      data: { usedAt: new Date() },
    }),
    // invalidate all old sessions
    prisma.session.deleteMany({
      where: { userId: record.userId },
    }),
  ]);

  res
    .status(HTTP_SUCCESS)
    .json({ message: "Password reset successfully. Please sign in." });
});
