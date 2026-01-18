import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { UserDto } from "../interfaces/user.dto";
import argon2 from "argon2";
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_SUCCESS,
} from "../constants/http_status";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  console.log("Create User attempt");

  const { email, password } = req.body as UserDto;

  if (!email || !password) {
    res
      .status(HTTP_BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (userExists) {
    res.status(HTTP_CONFLICT).send({ message: "User already registered" });
    // return; // ??
  }
  const passwordHash = await argon2.hash(password); //put the hashing in a user.service.ts
  const user = await prisma.user.create({
    data: { email, passwordHash },
  });
  res.status(HTTP_SUCCESS).json({
    message: "User registered successfully",
    user: { id: user.id, email: user.email }, //or some kind of session token instead of id?
  });
});

// export const signInUser = asyncHandler(async (req: Request, res: Response) => {
//   console.log("Signing in attempt");

//   let { email, password } = req.body as UserDto;
//   const user = await prisma.user.findUnique({ where: { email: email } });

//   if (user) {
//     const verified = await argon2.verify(user.passwordHash, password);
//     if (verified) {
//       res.send({
//         message: "Sign in successful",
//         user: { email: user.email, token: "session token cookie" },
//       });
//     }
//   } else
//     res.status(201).send({ message: "User with that email does not exist" });
// });
