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
    }: CreateSecretDto = req.body;
    const user = req.user;

    SecretService.validateSecretPayload({
      encryptedText,
      encryptionIV,
      timeTillExpiration,
      receiverEmail,
    });

    const expiresAt = SecretService.setSecretExpirationDate(timeTillExpiration);

    const secret = await prisma.secret.create({
      data: {
        encryptedText,
        encryptionIV,
        receiverEmail,
        expiresAt: expiresAt!,
        creatorId: user ? user.id : "guest",
      },
    });

    res.status(HTTP_CREATED).json({
      message: "Secret created successfully",
      secret: {
        id: secret.id,
        creatorId: secret.creatorId,
        createdAt: secret.createdAt,
        updatedAt: secret.updatedAt,
        expiresAt: secret.expiresAt,
        viewedAt: secret.viewedAt,
        receiverEmail: secret.receiverEmail,
        status: "ACTIVE",
      },
      shareUrl: `${process.env.FRONTEND_URL}/secret/${secret.id}`,
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
            createdAt: true,
            expiresAt: true,
            viewedAt: true,
            receiverEmail: true,
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
        ...secret,
        status: computedStatus,
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
    const id = req.params.secretid;
    const user = req.user!;

    const secret = await prisma.secret.findUnique({
      where: { id },
      select: {
        id: true,
        receiverEmail: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
        expiresAt: true,
        viewedAt: true,
      },
    });

    if (!secret) {
      throw new AppError("Secret doesn't exist", HTTP_NOT_FOUND);
    }

    if (secret.creatorId !== user.id) {
      throw new AppError("Unauthorized to view this secret", HTTP_UNAUTHORIZED);
    }

    res
      .status(HTTP_SUCCESS)
      .json({ ...secret, status: computeSecretStatus(secret) });
  },
);

//Could have two routes for this, one for auth and one for non-auth users and the auth users one checks if youre the owner and warns you youre about to view your own secret. Or just do what you do in auth middleware here and check if auth-ed
export const viewSecret = asyncHandler(
  async (req: Request, res: Response<ViewSecretResponse>) => {
    const id = req.params.secretid;

    const updatedSecret = await prisma.$transaction(async (tx) => {
      const originalSecret = await tx.secret.findUnique({
        where: { id },
      });

      if (!originalSecret) {
        throw new AppError("Secret doesn't exist", HTTP_NOT_FOUND);
      }

      const status = computeSecretStatus(originalSecret);

      if (!originalSecret || status === "VIEWED") {
        throw new AppError("Secret has already been viewed", HTTP_NOT_FOUND);
      }

      if (status === "EXPIRED") {
        await tx.secret.update({
          where: { id },
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
        where: { id },
        data: {
          encryptedText: "",
          encryptionIV: "",
          viewedAt: new Date(),
        },
      });
      return {
        id: updatedSecret.id,
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
    const id = req.params.secretid;

    if (!id) {
      throw new AppError("Secret ID is required", HTTP_BAD_REQUEST);
    }

    await prisma.secret.delete({ where: { id, creatorId: user.id } });

    res.status(HTTP_SUCCESS).json({
      message: id + " Deleted successfully",
    });
  },
);
