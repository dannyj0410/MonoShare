import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import {
  ComputedStatus,
  CreateSecretDto,
  CreateSecretResponse,
  getSecretDetailsResponse,
  MySecretsReponse,
  ViewSecretResponse,
} from "../dtos/secret.dto";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_GONE,
  HTTP_NOT_FOUND,
  HTTP_SUCCESS,
  HTTP_UNAUTHORIZED,
} from "../constants/http_status";
import { SecretService } from "../services/secret.service";
import { AppError } from "../utils/AppError";
import { computeSecretStatus } from "../helper/computeSecretStatus";

export const createSecret = asyncHandler(
  async (req: Request, res: Response<CreateSecretResponse>) => {
    const {
      encryptedText,
      encryptionIV,
      timeTillExpiration,
      receiverEmail,
      password,
    }: CreateSecretDto = req.body;
    const user = req.user;

    SecretService.validateSecretPayload({
      encryptedText,
      encryptionIV,
      timeTillExpiration,
      receiverEmail,
      password,
    });

    const passwordHash = await SecretService.hashPassword(password);
    const expiresAt = SecretService.setSecretExpirationDate(timeTillExpiration);
    const slug = SecretService.generateSlug();

    const secret = await prisma.secret.create({
      data: {
        slug,
        encryptedText,
        encryptionIV,
        receiverEmail: receiverEmail ? receiverEmail : null,
        passwordHash,
        expiresAt: expiresAt!,
        creatorId: user ? user.id : null,
      },
    });

    const passwordProtected = !!secret.passwordHash;

    res.status(HTTP_CREATED).json({
      message: "Secret created successfully",
      secret: {
        id: secret.id,
        slug: secret.slug,
        creatorId: secret.creatorId,
        createdAt: secret.createdAt,
        updatedAt: secret.updatedAt,
        expiresAt: secret.expiresAt,
        viewedAt: secret.viewedAt,
        receiverEmail: secret.receiverEmail,
        passwordProtected,
        status: "ACTIVE",
      },
      shareUrl: `${process.env.FRONTEND_URL}/secret/${secret.slug}`,
    });
  },
);

export const getMySecrets = asyncHandler(
  async (req: Request, res: Response<MySecretsReponse>) => {
    const user = req.user!;

    const userWithSecrets = await prisma.user.findUnique({
      where: { id: user.id },
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
            passwordHash: true,
          },
        },
      },
    });

    if (!userWithSecrets) {
      throw new AppError("Failure to find user and/or secrets", HTTP_NOT_FOUND);
    }

    const now = new Date();

    const secrets = userWithSecrets.ownedSecrets.map((secret) => {
      let computedStatus: ComputedStatus = "ACTIVE";

      if (secret.viewedAt) {
        computedStatus = "VIEWED";
      } else if (secret.expiresAt <= now) {
        computedStatus = "EXPIRED";
      }

      return {
        id: secret.id,
        slug: secret.slug,
        receiverEmail: secret.receiverEmail,
        createdAt: secret.createdAt,
        status: computedStatus,
        passwordProtected: !!secret.passwordHash,
      };
    });

    res.status(HTTP_SUCCESS).json({
      userId: user.id,
      ownedSecrets: secrets,
    });
  },
);

export const getSecretDetails = asyncHandler(
  async (req: Request, res: Response<getSecretDetailsResponse>) => {
    const slug = req.params.secretid;
    const user = req.user!;

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
        passwordHash: true,
      },
    });

    if (!secret) {
      throw new AppError("That secret does not exist", HTTP_NOT_FOUND);
    }

    if (secret.creatorId !== user.id) {
      throw new AppError("Unauthorized to view this secret", HTTP_UNAUTHORIZED);
    }

    const { passwordHash, ...secretToReturn } = secret;

    res.status(HTTP_SUCCESS).json({
      ...secretToReturn,
      status: computeSecretStatus(secret),
      passwordProtected: !!secret.passwordHash,
    });
  },
);

// send creatorId aswell. On frontend check if creatorId = user.id and if it is show warning
export const viewSecret = asyncHandler(
  async (req: Request, res: Response<ViewSecretResponse>) => {
    const slug = req.params.secretid;
    // get password from body, if invalid compare throw apperror and redirect on frontend

    const updatedSecret = await prisma.$transaction(async (tx) => {
      const originalSecret = await tx.secret.findUnique({
        where: { slug },
      });

      if (!originalSecret) {
        throw new AppError("Secret doesn't exist", HTTP_NOT_FOUND);
      }

      const originalStatus = computeSecretStatus(originalSecret);

      if (!originalSecret || originalStatus === "VIEWED") {
        throw new AppError("Secret has already been viewed", HTTP_NOT_FOUND);
      }

      if (originalStatus === "EXPIRED") {
        await tx.secret.update({
          where: { slug },
          data: {
            encryptedText: "",
            encryptionIV: "",
          },
        });

        throw new AppError(
          "This secret has expired and is no longer available",
          HTTP_GONE,
        );
      }

      const updatedSecret = await tx.secret.update({
        where: { slug },
        data: {
          encryptedText: "",
          encryptionIV: "",
          viewedAt: new Date(),
        },
      });

      const status = computeSecretStatus(updatedSecret);
      return {
        id: updatedSecret.id,
        slug: updatedSecret.slug,
        encryptedText: originalSecret.encryptedText,
        encryptionIV: originalSecret.encryptionIV,
        receiverEmail: originalSecret.receiverEmail,
        viewedAt: updatedSecret.viewedAt,
        status,
      };
    });

    res.status(HTTP_SUCCESS).json(updatedSecret);
  },
);

export const deleteSecret = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const slug = req.params.secretid;

    if (!slug) {
      throw new AppError("Secret ID is required", HTTP_BAD_REQUEST);
    }

    await prisma.secret.delete({ where: { slug, creatorId: user.id } });

    res.status(HTTP_SUCCESS).json({
      message: slug + " Deleted successfully",
    });
  },
);
