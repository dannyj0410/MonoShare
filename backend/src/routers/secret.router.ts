import { Router } from "express";
import {
  createSecret,
  deleteSecret,
  getMySecrets,
  getSecretDetails,
  viewSecret,
} from "../controllers/secret.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { userCheck } from "../middleware/user-check.middleware";

const router = Router();

router.post("/create", userCheck, createSecret);
router.get("/my-secrets", requireAuth, getMySecrets);
router.get("/details/:secretid", requireAuth, getSecretDetails);
router.get("/view/:secretid", viewSecret);
router.delete("/delete/:secretid", requireAuth, deleteSecret);

export { router as secretRouter };
