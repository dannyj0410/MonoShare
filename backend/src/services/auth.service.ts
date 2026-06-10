import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_UNAUTHORIZED,
} from "../constants/http_status.js";
import { prisma } from "../lib/prisma-client.js";
import { invalidateCachedSession } from "../lib/sessionCache.js";
import { AppError } from "../utils/AppError.js";
import { AuthUtil } from "../utils/auth.util.js";
import { EmailService } from "./email.service.js";
import { TokenService } from "./token.service.js";

export const AuthService = {
  // Create User
  async createUser(email: string, password: string, existingToken: string) {
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

    const passwordHash = await AuthUtil.hashPassword(password);
    const expiresAt = new Date(Date.now() + 7 * 86400000); // 7 days ms
    const [user, session, token] = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email: normalizedEmail, passwordHash },
      });

      if (existingToken) {
        const existingTokenHash = AuthUtil.hashSessionToken(existingToken);
        invalidateCachedSession(existingTokenHash);
      }

      const token = AuthUtil.generateSessionToken();
      const tokenHash = AuthUtil.hashSessionToken(token);
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

    return { user, session, token };
  },

  // Sign In User
  async signinUser(email: string, password: string, existingToken: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    const verifiedPassword = user
      ? await AuthUtil.verifyPassword(user.passwordHash, password)
      : false;
    if (!user || !verifiedPassword) {
      throw new AppError("Incorrect email or password", HTTP_UNAUTHORIZED);
    }

    if (existingToken) {
      const existingTokenHash = AuthUtil.hashSessionToken(existingToken);
      invalidateCachedSession(existingTokenHash);
    }

    const token = AuthUtil.generateSessionToken();
    const tokenHash = AuthUtil.hashSessionToken(token);
    const expiresAt = new Date(Date.now() + 7 * 86400000); //7 days
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    return { user, session, token };
  },
  async logoutUser(tokenHash: string) {
    await prisma.session.delete({ where: { tokenHash } });
    invalidateCachedSession(tokenHash);
  },
};
