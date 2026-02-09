import { SecretStatus } from "@prisma/client";

export interface SecretBase {
  id: string;
  encryptedText: string;
  encryptionIV: string;
  creatorId?: string;
  status: SecretStatus;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  viewedAt: Date | null;
  receiverEmail: string | null;
}

export type SecretExpirationOptions = "1h" | "1d" | "7d";

export interface CreateSecretDto {
  encryptedText: string;
  encryptionIV: string;
  timeTillExpiration: SecretExpirationOptions;
  receiverEmail?: string;
}

export type CreateSecretResponse = {
  message: string;
  secret: Pick<
    SecretBase,
    | "id"
    | "creatorId"
    | "status"
    | "createdAt"
    | "updatedAt"
    | "expiresAt"
    | "viewedAt"
    | "receiverEmail"
  >;
  shareUrl: string;
};

export type MySecretsReponse = {
  userId: string;
  ownedSecrets: Pick<
    SecretBase,
    "id" | "status" | "createdAt" | "expiresAt" | "viewedAt" | "receiverEmail"
  >[];
};

export type ViewSecretResponse = Pick<
  SecretBase,
  | "id"
  | "encryptedText"
  | "encryptionIV"
  | "receiverEmail"
  | "status"
  | "viewedAt"
>;

export type getSecretDetailsResponse = Pick<
  SecretBase,
  | "id"
  | "receiverEmail"
  | "creatorId"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "expiresAt"
  | "viewedAt"
>;
