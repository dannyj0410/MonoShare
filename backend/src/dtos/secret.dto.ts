export interface SecretBase {
  id: string;
  encryptedText: string;
  encryptionIV: string;
  creatorId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  viewedAt: Date | null;
  receiverEmail: string | null;
  shareUrl: string;
}

export type ComputedStatus = "ACTIVE" | "VIEWED" | "EXPIRED";

export type SecretExpirationOptions = "1h" | "1d" | "7d";

export interface CreateSecretDto {
  encryptedText: string;
  encryptionIV: string;
  timeTillExpiration: SecretExpirationOptions;
  receiverEmail?: string;
}

type WithStatus<T> = T & {
  status: ComputedStatus;
};

export type CreateSecretResponse = {
  message: string;
  secret: WithStatus<
    Pick<
      SecretBase,
      | "id"
      | "creatorId"
      | "createdAt"
      | "updatedAt"
      | "expiresAt"
      | "viewedAt"
      | "receiverEmail"
    >
  >;
  shareUrl: string;
};

export type MySecretsReponse = {
  userId: string;
  ownedSecrets: WithStatus<
    Pick<
      SecretBase,
      "id" | "createdAt" | "expiresAt" | "viewedAt" | "receiverEmail"
    >
  >[];
};

export type ViewSecretResponse = WithStatus<
  Pick<
    SecretBase,
    "id" | "encryptedText" | "encryptionIV" | "receiverEmail" | "viewedAt"
  >
>;

export type getSecretDetailsResponse = WithStatus<
  Pick<
    SecretBase,
    | "id"
    | "receiverEmail"
    | "creatorId"
    | "createdAt"
    | "updatedAt"
    | "expiresAt"
    | "viewedAt"
    | "shareUrl"
  >
>;
