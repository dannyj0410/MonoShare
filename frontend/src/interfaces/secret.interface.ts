export type SecretStatus = "ACTIVE" | "VIEWED" | "EXPIRED";
export type ExpirationTimeOptions = "7d" | "1d" | "1h";
export type DeleteSecretResponse = {
  message: string;
};

export interface ISecret {
  id: string;
  slug: string;
  status: SecretStatus;
  receiverEmail: string | null;
  passwordProtected: boolean;
  creatorId: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  viewedAt: string | null;
}

export interface IHydratedSecret extends ISecret {
  text: string;
  key: string;
  shareUrl: string;
  created: boolean;
}

export interface ICreateSecretFormData {
  receiverEmail: string;
  secret: string;
  password: string;
  timeTillExpiration: ExpirationTimeOptions;
}

export interface ICreateSecretRequest {
  receiverEmail: string;
  encryptedText: string;
  encryptionIV: string;
  password: string;
  timeTillExpiration: ExpirationTimeOptions;
}

export interface ICreateSecretResponse {
  message: string;
  shareUrl: string;
  secret: IHydratedSecret;
}

export interface ISecretMetadata {
  passwordProtected: boolean;
  isOwner: boolean;
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
