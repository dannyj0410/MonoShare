import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import argon2 from "argon2";
import { AuthDto } from "../interfaces/auth.dto";
import { AuthService } from "../services/auth.service";
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_CREATED,
  HTTP_SUCCESS,
  HTTP_UNAUTHORIZED,
} from "../constants/http_status";

// *CREATE
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, confirm } = req.body as AuthDto;

  if (!email || !password || !confirm) {
    res
      .status(HTTP_BAD_REQUEST)
      .json({ message: "Email and password are required" });
    return;
    // throw new Error("Email and password are required");
    //throw error or return both work, use global error handler if throwing errors
  }

  if (password !== confirm) {
    res.status(HTTP_BAD_REQUEST).json({ message: "Password not confirmed" });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const userExists = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (userExists) {
    res.status(HTTP_CONFLICT).send({ message: "User already registered!" });
    return;
  }

  // Transaction
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
    res
      .status(HTTP_BAD_REQUEST)
      .send({ message: "Error creating user or session" });
    return;
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
      user: { id: user.id, email: user.email },
    });
});

// *SIGN IN
export const signinUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthDto;

  if (!email || !password) {
    res
      .status(HTTP_BAD_REQUEST)
      .json({ message: "Email and password are required" });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    res
      .status(HTTP_UNAUTHORIZED)
      .send({ message: "Incorrect email or password" });
    return;
  }

  const verified = await argon2.verify(user.passwordHash, password);
  if (!verified) {
    res
      .status(HTTP_UNAUTHORIZED)
      .send({ message: "Incorrect email or password" });
    return;
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
    .send({
      message: "Sign in successful",
      user: { id: user.id, email: user.email },
    });
});

// *SIGN OUT
export const signoutUser = asyncHandler(async (req: any, res: Response) => {
  if (!req.session) {
    res.status(HTTP_UNAUTHORIZED).send({ message: "Unable to logout" });
    return;
  }

  const tokenHash = req.session.tokenHash;

  await prisma.session.delete({ where: { tokenHash } });
  res.clearCookie("session");
  res.status(HTTP_SUCCESS).send({ message: "Successfully logged out" });
  return;
});
