import { Router } from "express";
import {
  createSecret,
  deleteSecret,
  getMySecrets,
  getSecretDetails,
  getSecretMetadata,
  viewSecret,
} from "../controllers/secret.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { userCheck } from "../middleware/user-check.middleware";
import { apiLimiter, rateLimiter } from "../middleware/rateLimit.middleware";
import { createSecretLimiterMessage } from "../constants/limiter_messages";

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
