export interface ICreateSecretResponse {
  message: string;
  shareUrl: string;
  secret: {
    id: string;
    slug: string;
    status: string;
    receiverEmail: string;
    creatorId: string | null;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    viewedAt: string | null;
  };
}
