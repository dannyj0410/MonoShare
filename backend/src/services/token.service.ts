import crypto from "crypto";
import { prisma } from "../lib/prisma-client.js";
import { TokenType } from "@prisma/client";
import { ONE_DAY_MS, ONE_HOUR_MS } from "../constants/time_ms.js";

export const TokenService = {
  generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  },

  hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  },

  async createEmailVerificationToken(userId: string): Promise<string> {
    const token = this.generateToken();
    const tokenHash = this.hashToken(token);

    // delete all existing tokens
    await prisma.token.deleteMany({
      where: { userId, type: TokenType.EMAIL_VERIFICATION },
    });

    await prisma.token.create({
      data: {
        tokenHash,
        userId,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt: new Date(Date.now() + ONE_DAY_MS),
      },
    });

    return token;
  },

  async createPasswordResetToken(userId: string): Promise<string> {
    const token = this.generateToken();
    const tokenHash = this.hashToken(token);

    // delete all existing tokens
    await prisma.token.deleteMany({
      where: { userId, type: TokenType.PASSWORD_RESET },
    });

    await prisma.token.create({
      data: {
        tokenHash,
        userId,
        type: TokenType.PASSWORD_RESET,
        expiresAt: new Date(Date.now() + ONE_HOUR_MS),
      },
    });

    return token;
  },

  async validateToken(token: string, type: TokenType) {
    const tokenHash = this.hashToken(token);

    const record = await prisma.token.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!record) return null;
    if (record.type !== type) return null;
    if (record.expiresAt < new Date()) return null;
    if (record.usedAt) return null;

    return record;
  },
};
