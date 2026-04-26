import { Router } from "express";
import {
  createSecret,
  deleteSecret,
  getMySecrets,
  getSecretDetails,
  getSecretMetadata,
  viewSecret,
} from "../controllers/secret.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { userCheck } from "../middleware/user-check.middleware.js";
import { apiLimiter, rateLimiter } from "../middleware/rateLimit.middleware.js";
import { createSecretLimiterMessage } from "../constants/limiter_messages.js";

const router = Router();

router.post(
  "/create",
  userCheck,
  rateLimiter(createSecretLimiterMessage, 20, 10),
  createSecret,
);
router.get("/my-secrets", requireAuth, apiLimiter, getMySecrets);
router.get("/details/:secretid", requireAuth, apiLimiter, getSecretDetails);
router.get("/metadata/:secretid", userCheck, apiLimiter, getSecretMetadata);
router.post("/view/:secretid", userCheck, apiLimiter, viewSecret);
router.delete("/delete/:secretid", requireAuth, apiLimiter, deleteSecret);

export { router as secretRouter };
