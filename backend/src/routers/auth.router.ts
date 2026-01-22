import express from "express";
import { createUser } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", createUser);
// router.post("/signin", requireAuth, signinUser);

export { router as authRouter };
