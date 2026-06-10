import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  CreateSecretResponse,
  GetSecretDetailsResponse,
  GetSecretMetadataResponse,
  MySecretsReponse,
  ViewSecretResponse,
} from "../dtos/secret.dto.js";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_SUCCESS,
  HTTP_UNAUTHORIZED,
} from "../constants/http_status.js";
import { AppError } from "../utils/AppError.js";
import { SecretService } from "../services/secret.service.js";

export const createSecret = asyncHandler(
  async (req: Request, res: Response<CreateSecretResponse>) => {
    const createdSecretResponse = await SecretService.createSecret(
      req.body,
      req.user,
    );

    res.status(HTTP_CREATED).json(createdSecretResponse);
  },
);

export const getMySecrets = asyncHandler(
  async (req: Request, res: Response<MySecretsReponse>) => {
    const user = req.user;

    if (!user) {
      throw new AppError(
        "You are unauthenticated. Please sign in.",
        HTTP_UNAUTHORIZED,
      );
    }

    const secrets = await SecretService.getMySecrets(user.id);

    res.status(HTTP_SUCCESS).json({
      userId: user.id,
      ownedSecrets: secrets,
    });
  },
);

export const getSecretDetails = asyncHandler(
  async (req: Request, res: Response<GetSecretDetailsResponse>) => {
    const slug = req.params.secretid;
    const user = req.user;

    if (!user) {
      throw new AppError(
        "You are unauthenticated. Please sign in.",
        HTTP_UNAUTHORIZED,
      );
    }

    const secretMetadata = await SecretService.getSecretDetails(slug, user.id);

    res.status(HTTP_SUCCESS).json({ ...secretMetadata });
  },
);

export const getSecretMetadata = asyncHandler(
  async (req: Request, res: Response<GetSecretMetadataResponse>) => {
    const user = req.user;

    const slug = req.params.secretid;
    const hasHash = req.query.hasHash === "true";

    const { passwordProtected, isOwner } =
      await SecretService.getSecretMetadata(slug, hasHash, user);

    res.status(HTTP_SUCCESS).json({
      passwordProtected,
      isOwner,
    });
  },
);

export const viewSecret = asyncHandler(
  async (req: Request, res: Response<ViewSecretResponse>) => {
    const user = req.user;

    const slug = req.params.secretid;
    const { secretKey } = req.body;

    const viewedSecret = await SecretService.viewSecret(slug, secretKey, user);

    res.status(HTTP_SUCCESS).json(viewedSecret);
  },
);

export const deleteSecret = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const slug = req.params.secretid;

    if (!slug) {
      throw new AppError("Secret ID is required", HTTP_BAD_REQUEST);
    }

    if (!user) {
      throw new AppError("You are unauthenticated!", HTTP_UNAUTHORIZED);
    }

    await SecretService.deleteSecret(slug, user.id);

    res.status(HTTP_SUCCESS).json({
      message: slug + " Deleted successfully",
    });
  },
);
