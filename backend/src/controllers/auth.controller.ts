import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma-client.js";
import { AuthDto, UserResponse } from "../dtos/auth.dto.js";
import { AuthUtil } from "../utils/auth.util.js";
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
import { Sentry } from "../lib/sentry.js";
import { AuthService } from "../services/auth.service.js";

//* CREATE
export const createUser = asyncHandler(
  async (req: Request, res: Response<UserResponse>) => {
    const { email, password, confirm }: AuthDto = req.body;

    AuthUtil.validateAuthPayload({
      email,
      password,
      confirm,
    });

    const existingToken = req.cookies.session;

    const { user, session, token } = await AuthService.createUser(
      email,
      password,
      existingToken,
    );

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

    AuthUtil.validateAuthPayload({
      email,
      password,
    });

    const existingToken = req.cookies.session;
    const { user, session, token } = await AuthService.signinUser(
      email,
      password,
      existingToken,
    );

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

  AuthService.logoutUser(tokenHash);

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
    // No await on purpose, runs in background to protect from timing attacks checking response times
    TokenService.createPasswordResetToken(user.id)
      .then((token) => EmailService.sendPasswordResetEmail(user.email, token))
      .catch((error) => {
        console.error(
          `Forgot password background task failed for user ${user.id}:`,
          error,
        );

        Sentry.captureException(error, {
          tags: { mechanism: "background-task" },
          user: { id: user.id, email: user.email },
        });
      });
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

  AuthUtil.validatePassword(password);

  const record = await TokenService.validateToken(
    token,
    TokenType.PASSWORD_RESET,
  );
  if (!record) {
    throw new AppError("Invalid or expired reset link", HTTP_BAD_REQUEST);
  }

  const passwordHash = await AuthUtil.hashPassword(password);
  const tokenHash = TokenService.hashToken(token);

  const deletedSessions = await prisma.$transaction(async (tx) => {
    // Gets all active user sessions
    const userSessions = await tx.session.findMany({
      where: { userId: record.userId },
      select: { tokenHash: true },
    });

    // password update
    await tx.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });

    // consume token
    await tx.token.update({
      where: { tokenHash },
      data: { usedAt: new Date() },
    });

    // delete sessions
    await tx.session.deleteMany({
      where: { userId: record.userId },
    });

    return userSessions;
  });

  // remove each active session of cache
  for (const session of deletedSessions) {
    console.log(session.tokenHash);
    invalidateCachedSession(session.tokenHash);
  }
  // Clear current browser session cookie just in case
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res
    .status(HTTP_SUCCESS)
    .json({ message: "Password reset successfully. Please sign in." });
});
