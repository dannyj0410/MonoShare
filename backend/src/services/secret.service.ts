import { prisma } from "../lib/prisma-client.js";
import { CreateSecretDto, ComputedStatus } from "../dtos/secret.dto.js";
import { SecretUtil } from "../utils/secret.util.js";
import { AppError } from "../utils/AppError.js";
import { computeSecretStatus } from "../utils/computeSecretStatus.js";
import {
  HTTP_BAD_REQUEST,
  HTTP_FORBIDDEN,
  HTTP_GONE,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED,
} from "../constants/http_status.js";
import { UserDto } from "../dtos/auth.dto.js";

export const SecretService = {
  // Create Secret
  async createSecret(payload: CreateSecretDto, user: UserDto | undefined) {
    const {
      encryptedText,
      encryptionIV,
      timeTillExpiration,
      receiverEmail,
      secretKey,
    } = payload;

    SecretUtil.validateSecretPayload({
      isAuthenticated: !!user,
      encryptedText,
      encryptionIV,
      timeTillExpiration,
      receiverEmail,
      secretKey,
    });

    const secretKeyHash = await SecretUtil.hashSecretKey(secretKey);
    const expiresAt = SecretUtil.setSecretExpirationDate(timeTillExpiration);
    const slug = SecretUtil.generateSlug();

    const createdSecret = await prisma.secret.create({
      data: {
        slug,
        encryptedText,
        encryptionIV,
        receiverEmail:
          receiverEmail && user ? receiverEmail.trim().toLowerCase() : null,
        secretKeyHash,
        expiresAt: expiresAt!,
        creatorId: user ? user.id : null,
      },
    });

    const secret = {
      id: createdSecret.id,
      slug: createdSecret.slug,
      creatorId: createdSecret.creatorId,
      createdAt: createdSecret.createdAt,
      updatedAt: createdSecret.updatedAt,
      expiresAt: createdSecret.expiresAt,
      viewedAt: createdSecret.viewedAt,
      receiverEmail: createdSecret.receiverEmail,
      passwordProtected: !!createdSecret.secretKeyHash,
      status: "ACTIVE" as ComputedStatus,
    };

    const createdSecretResponse = {
      message: "Secret created successfully",
      secret: {
        ...secret,
      },
      shareUrl: `${process.env.FRONTEND_URL}/secret/${secret.slug}`,
    };

    return createdSecretResponse;
  },

  // Get My Secretss
  async getMySecrets(userId: string) {
    const userWithSecrets = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        ownedSecrets: {
          select: {
            id: true,
            slug: true,
            createdAt: true,
            expiresAt: true,
            viewedAt: true,
            receiverEmail: true,
            secretKeyHash: true,
          },
        },
      },
    });

    if (!userWithSecrets) {
      throw new AppError("Failure to find user and/or secrets", HTTP_NOT_FOUND);
    }

    const secrets = userWithSecrets.ownedSecrets.map((secret) => {
      let computedStatus: ComputedStatus = computeSecretStatus(secret);
      return {
        id: secret.id,
        slug: secret.slug,
        receiverEmail: secret.receiverEmail,
        createdAt: secret.createdAt,
        status: computedStatus,
        passwordProtected: !!secret.secretKeyHash,
      };
    });

    return secrets;
  },

  // Get Secret Details
  async getSecretDetails(slug: string, userId: string) {
    const secret = await prisma.secret.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        receiverEmail: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
        expiresAt: true,
        viewedAt: true,
        secretKeyHash: true,
      },
    });

    if (!secret) {
      throw new AppError("That secret does not exist", HTTP_NOT_FOUND);
    }

    if (secret.creatorId !== userId) {
      throw new AppError("Unauthorized to view this secret", HTTP_UNAUTHORIZED);
    }

    const { secretKeyHash, ...secretToReturn } = secret;

    const secretMetadata = {
      ...secretToReturn,
      status: computeSecretStatus(secret),
      passwordProtected: !!secret.secretKeyHash,
    };

    return secretMetadata;
  },

  // Get Secret MetaData
  async getSecretMetadata(slug: string, hasHash: boolean, user: any) {
    if (!hasHash) {
      throw new AppError("Incorrect secret link", HTTP_UNAUTHORIZED);
    }

    const secret = await prisma.secret.findUnique({
      where: { slug },
      select: {
        secretKeyHash: true,
        expiresAt: true,
        viewedAt: true,
        creatorId: true,
        receiverEmail: true,
      },
    });

    if (!secret) {
      throw new AppError("Secret doesn't exist", HTTP_NOT_FOUND);
    }

    const status = computeSecretStatus(secret);
    const isOwner = user ? user.id === secret.creatorId : false;

    if (status === "VIEWED") {
      throw new AppError("Secret has already been viewed", HTTP_GONE);
    }

    if (status === "EXPIRED") {
      throw new AppError(
        "This secret has expired and is no longer available",
        HTTP_GONE,
      );
    }

    if (secret.receiverEmail) {
      if (!user) {
        throw new AppError(
          "Please sign in to view this secret",
          HTTP_UNAUTHORIZED,
        );
      }
      if (!user.emailVerified) {
        throw new AppError(
          "Your email must be verified to view this secret",
          HTTP_FORBIDDEN,
        );
      }
      if (secret.receiverEmail !== user.email) {
        throw new AppError(
          "You are not authorized to view this secret",
          HTTP_FORBIDDEN,
        );
      }
    }

    return {
      passwordProtected: !!secret.secretKeyHash,
      isOwner,
    };
  },

  // View Secret
  async viewSecret(slug: string, secretKey: string, user: any) {
    return await prisma.$transaction(async (tx) => {
      const originalSecret = await tx.secret.findUnique({
        where: { slug },
      });

      if (!originalSecret) {
        throw new AppError("Secret doesn't exist", HTTP_NOT_FOUND);
      }

      const originalStatus = computeSecretStatus(originalSecret);

      if (originalStatus === "VIEWED") {
        throw new AppError("Secret has already been viewed", HTTP_GONE);
      }

      if (originalStatus === "EXPIRED") {
        throw new AppError(
          "This secret has expired and is no longer available",
          HTTP_GONE,
        );
      }

      if (originalSecret.receiverEmail) {
        if (!user) {
          throw new AppError(
            "Please sign in to view this secret",
            HTTP_UNAUTHORIZED,
          );
        }
        if (!user.emailVerified) {
          throw new AppError(
            "You must verify your email to view this secret",
            HTTP_UNAUTHORIZED,
          );
        }
        if (originalSecret.receiverEmail !== user.email) {
          throw new AppError(
            "You are not authorized to view this secret",
            HTTP_FORBIDDEN,
          );
        }
      }

      if (originalSecret.secretKeyHash) {
        const verified = await SecretUtil.verifySecretKey(
          originalSecret.secretKeyHash,
          secretKey,
        );
        if (!verified) {
          throw new AppError("Incorrect password", HTTP_BAD_REQUEST);
        }
      }

      const updatedSecret = await tx.secret.update({
        where: { slug },
        data: {
          encryptedText: "",
          encryptionIV: "",
          viewedAt: new Date(),
        },
      });

      return {
        id: updatedSecret.id,
        slug: updatedSecret.slug,
        encryptedText: originalSecret.encryptedText,
        encryptionIV: originalSecret.encryptionIV,
        receiverEmail: originalSecret.receiverEmail,
        viewedAt: updatedSecret.viewedAt,
        creatorId: updatedSecret.creatorId,
        status: computeSecretStatus(updatedSecret),
      };
    });
  },

  // Delete Secret
  async deleteSecret(slug: string, userId: string) {
    await prisma.secret.delete({
      where: { slug, creatorId: userId },
    });
  },
};
