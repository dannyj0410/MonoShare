import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma-client.js";
import { AuthUtil } from "../utils/auth.util.js";
import { getCachedSession, setCachedSession } from "../lib/sessionCache.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.session;

  if (!token) {
    return res
      .status(401)
      .json({ message: "You are unauthenticated. Please sign in." });
  }

  const tokenHash = AuthUtil.hashSessionToken(token);

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
    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return res.status(401).json({ message: "Invalid session." });
  }

  setCachedSession(tokenHash, session);
  req.user = session.user;
  req.session = session;
  return next();
};
