import argon2 from "argon2";
import crypto from "crypto";
import { AuthDto } from "../dtos/auth.dto";

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
    if (!email || !password || !confirm) {
      return { success: false, message: "Email and password are required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email" };
    }

    if (password !== confirm) {
      return { success: false, message: "Passwords do not match" };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    return { success: true };
  },
};
