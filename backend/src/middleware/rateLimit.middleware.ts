import rateLimit from "express-rate-limit";
import { HTTP_TOO_MANY_REQ } from "../constants/http_status";

export const rateLimiter = (
  message: string,
  maxAttempts: number = 10,
  minutes: number = 10,
) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max: maxAttempts,
    handler: (req, res, next) => {
      res.status(HTTP_TOO_MANY_REQ).json({
        message: message,
      });
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => process.env.NODE_ENV === "development",
  });
};

export const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    res.status(HTTP_TOO_MANY_REQ).json({
      message: "Too many requests. Please try again later.",
    });
  },
});
