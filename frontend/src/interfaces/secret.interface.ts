export type SecretStatus = "ACTIVE" | "VIEWED" | "EXPIRED";
export type ExpirationTimeOptions = "7d" | "1d" | "1h";

export interface ISecret {
  id: string;
  slug: string;
  status: SecretStatus;
  receiverEmail: string | null;
  passwordProtected: string | null;
  creatorId: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  viewedAt: string | null;
}

export interface ICreateSecretRequest {
  receiverEmail: string;
  secret: string;
  password: string;
  timeTillExpiration: ExpirationTimeOptions;
}

export interface ICreateSecretResponse {
  message: string;
  shareUrl: string;
  secret: ISecret;
}

export interface IViewSecretResponse extends Omit<
  ISecret,
  "updatedAt" | "expiresAt"
> {
  encryptedText: string;
  encryptionIV: string;
  viewedAt: string;
}

export interface IMySecretsResponse {
  userId: string;
  ownedSecrets: Omit<
    ISecret,
    "creatorId" | "updatedAt" | "viewedAt" | "expiresAt"
  >[];
}
