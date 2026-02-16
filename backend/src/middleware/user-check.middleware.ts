import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { AuthService } from "../services/auth.service";

export const userCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.session;
  if (!token) {
    return next();
  }

  const tokenHash = AuthService.hashSessionToken(token);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ message: "Invalid session." });
  }

  req.user = session.user;
  req.session = session;

  next();
};
