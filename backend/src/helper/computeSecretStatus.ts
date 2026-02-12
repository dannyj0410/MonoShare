import { ComputedStatus } from "../dtos/secret.dto";

export const computeSecretStatus = (secret: {
  viewedAt: Date | null;
  expiresAt: Date;
}): ComputedStatus => {
  const now = new Date();

  if (secret.viewedAt) return "VIEWED";
  if (secret.expiresAt <= now) return "EXPIRED";
  return "ACTIVE";
};
