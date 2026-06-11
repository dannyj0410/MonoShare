import { NextFunction, Request, Response } from "express";
import { HTTP_BAD_REQUEST } from "../constants/http_status.js";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export const verifyTurnstile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV !== "production") return next();

  const token = req.body?.turnstileToken;

  if (!token) {
    return res.status(HTTP_BAD_REQUEST).json({
      message:
        "Failed or still verifying you are human. Please wait a moment and try again.",
    });
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: req.ip,
        }),
      },
    );

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      return res
        .status(HTTP_BAD_REQUEST)
        .json({ message: "Captcha verification failed" });
    }

    // Strip the token so it doesn't reach controllers/services
    delete req.body.turnstileToken;

    return next();
  } catch {
    // Don't block the user if Cloudflare is down — fail open
    return next();
  }
};

export const verifyTurnstileIfGuest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Authenticated users skip captcha
  if (req.user) return next();
  return verifyTurnstile(req, res, next);
};
