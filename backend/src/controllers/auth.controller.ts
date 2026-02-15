import asyncHandler from "express-async-handler";
import argon2 from "argon2";
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { AuthDto, UserResponse } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
import { AppError } from "../utils/AppError";
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_CREATED,
  HTTP_SUCCESS,
  HTTP_UNAUTHORIZED,
} from "../constants/http_status";

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

    const [user, session, token] = await prisma.$transaction(async (tx) => {
      const passwordHash = await AuthService.hashPassword(password);
      const user = await tx.user.create({
        data: { email: normalizedEmail, passwordHash },
      });

      const token = AuthService.generateSessionToken();
      const tokenHash = AuthService.hashSessionToken(token);
      const expiresAt = new Date(Date.now() + 7 * 86400000); //7 days
      const session = await tx.session.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      return [user, session, token];
    }); // can put this in a user.service.ts create which will receive email,passwordHash tokenhash and user.id. Maybe create userCreateDetails which will have those and send it as one object

    if (!user || !session) {
      throw new AppError("Error creating user or session", HTTP_BAD_REQUEST);
    }

    res
      .status(HTTP_CREATED)
      .cookie("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: session.expiresAt,
        path: "/",
      })
      .json({
        message: "User registered successfully",
        user: { email: user.email, id: user.id },
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
        sameSite: "lax",
        expires: session.expiresAt,
        path: "/",
      })
      .json({
        message: "Sign in successful",
        user: { email: user.email, id: user.id },
      });
  },
);

//* LOGOUT
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const tokenHash = req.session!.tokenHash;

  await prisma.session.delete({ where: { tokenHash } });
  res.clearCookie("session");
  res.status(HTTP_SUCCESS).json({ message: "Successfully logged out" });
  return;
});

//* CHECK
export const checkUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Unauthorized", HTTP_BAD_REQUEST);
  }

  res.status(HTTP_SUCCESS).json({
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
  });
  return;
});
