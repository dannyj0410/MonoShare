import argon2 from "argon2";
import crypto from "crypto";
import { AuthDto } from "../dtos/auth.dto";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { AppError } from "../utils/AppError";

export const AuthService = {
  async hashPassword(password: string) {
    const passwordHash = await argon2.hash(password);
    return passwordHash;
  },

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  },

  generateSessionToken(): string {
    const sessionToken = crypto.randomBytes(32).toString("hex");
    return sessionToken;
  },

  hashSessionToken(token: string): string {
    const hashedSessionToken = crypto
      .createHmac("sha256", process.env.SESSION_SECRET!)
      .update(token)
      .digest("hex");
    return hashedSessionToken;
  },

  validateAuthPayload({ email, password, confirm }: AuthDto) {
    if (!email || !password) {
      throw new AppError("Email and password are required", HTTP_BAD_REQUEST);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email", HTTP_BAD_REQUEST);
    }

    if (confirm && password !== confirm) {
      throw new AppError("Passwords do not match", HTTP_BAD_REQUEST);
    }

    if (password.length < 6) {
      throw new AppError(
        "Password must be at least 6 characters",
        HTTP_BAD_REQUEST,
      );
    }

    return { success: true };
  },
};
