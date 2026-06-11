import express from "express";
import {
  checkUser,
  createUser,
  forgotPassword,
  logoutUser,
  resendVerification,
  resetPassword,
  signinUser,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { apiLimiter, rateLimiter } from "../middleware/rateLimit.middleware.js";
import {
  registerLimiterMessage,
  signInLimiterMessage,
} from "../constants/limiter_messages.js";
import { userCheck } from "../middleware/user-check.middleware.js";
import { verifyTurnstile } from "../middleware/turnstile.middleware.js";

const router = express.Router();

router.post(
  "/register",
  verifyTurnstile,
  rateLimiter(registerLimiterMessage, 3),
  createUser,
);
router.post(
  "/signin",
  verifyTurnstile,
  rateLimiter(signInLimiterMessage),
  signinUser,
);
router.post("/logout", requireAuth, logoutUser);
router.get("/user-check", requireAuth, checkUser);

router.post(
  "/verify-email",
  userCheck,
  rateLimiter("Too many requests. Please try again later.", 5),
  verifyEmail,
);
router.post(
  "/resend-verification",
  requireAuth,
  rateLimiter("Too many requests. Please try again later.", 5),
  resendVerification,
);
router.post(
  "/forgot-password",
  verifyTurnstile,
  rateLimiter("Too many requests. Please try again later.", 5),
  forgotPassword,
);
router.post(
  "/reset-password",
  rateLimiter("Too many requests. Please try again later.", 5),
  resetPassword,
);

export { router as authRouter };
