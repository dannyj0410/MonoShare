import express from "express";
import {
  checkUser,
  createUser,
  logoutUser,
  signinUser,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { rateLimiter } from "../middleware/rateLimit.middleware";
import {
  registerLimiterMessage,
  signInLimiterMessage,
} from "../constants/limiter_messages";

const router = express.Router();

router.post("/register", rateLimiter(registerLimiterMessage, 3), createUser);
router.post("/signin", rateLimiter(signInLimiterMessage), signinUser);
router.post("/logout", requireAuth, logoutUser);
router.get("/user-check", requireAuth, checkUser);

export { router as authRouter };
