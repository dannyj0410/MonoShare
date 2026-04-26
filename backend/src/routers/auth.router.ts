import express from "express";
import {
  checkUser,
  createUser,
  logoutUser,
  signinUser,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { rateLimiter } from "../middleware/rateLimit.middleware.js";
import {
  registerLimiterMessage,
  signInLimiterMessage,
} from "../constants/limiter_messages.js";

const router = express.Router();

router.post("/register", rateLimiter(registerLimiterMessage, 3), createUser);
router.post("/signin", rateLimiter(signInLimiterMessage), signinUser);
router.post("/logout", requireAuth, logoutUser);
router.get("/user-check", requireAuth, checkUser);

export { router as authRouter };
