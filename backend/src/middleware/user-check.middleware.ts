import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { AuthService } from "../services/auth.service";
import { getCachedSession, setCachedSession } from "../lib/sessionCache";

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

  const cache = getCachedSession(tokenHash);
  if (cache) {
    req.user = cache.user;
    req.session = cache;
    return next();
  }

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ message: "Invalid session." });
  }

  setCachedSession(tokenHash, session);
  req.user = session.user;
  req.session = session;

  return next();
};
