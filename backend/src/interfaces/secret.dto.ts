import { SecretStatus } from "@prisma/client";

export interface CreateSecretDto {
  text: string;
  status: SecretStatus;
  receiver?: string | null;
  expiresAt: string; // or maybe Date, but preferable an ISO string. Might have to create the date, add 7 days and then send it to the backend. Or send a value of '1h, 1d, or 7d' to the backend and create the date in the api
}

export interface UpdateSecretStatusDto {
  secretId: string;
  status: "ACTIVE" | "VIEWED" | "EXPIRED";
}

export interface SecretResponse {
  id: string;
  text: string;
  status: SecretStatus;
  receiver?: string | null;
  expiresAt: string;
  viewedAt?: string | null;
  creatorId: string;
}
