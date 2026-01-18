import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";
import { SecretStatus } from "@prisma/client";
import { CreateSecretDto } from "../interfaces/secret.dto";
import { HTTP_NOT_FOUND } from "../constants/http_status";

export const getSecrets = asyncHandler(async (req: Request, res: Response) => {
  const allSecrets = await prisma.secret.findMany();
  if (!allSecrets) {
    res.status(HTTP_NOT_FOUND).json({ message: "No secrets found." });
    return;
  }
  res.json({ message: "All secrets", secrets: allSecrets });
});

// export const createSecret = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { text, status, receiver, expiresAt } = req.body
//        as CreateSecretDto;

//     console.log(SecretStatus);
//     if (!Object.values(SecretStatus).includes(status)) {
//       res.status(400).json({
//         message: `Invalid status. Must be one of: ${Object.values(
//           SecretStatus
//         ).join(", ")}`,
//       });
//       return;
//     }
//     // Inject userId through auth middleware
//     const secret = await prisma.secret.create({
//       data: {
//         text,
//         status,
//         receiver,
//         expiresAt: new Date(expiresAt),
//         creator: {
//           connect: {
//             id: userId,
//           },
//         },
//       },
//     });

//     res.status(201).json({
//       message: "Secret created successfully",
//       secret,
//     });
//   }
// );

// export const getUsersSecrets = asyncHandler(
//   async (req: Request, res: Response) => {
//     // inject id through auth

//     const userWithSecrets = await prisma.user.findUnique({
//       where: { id },
//       include: { ownedSecrets: true },
//     });

//     if (!userWithSecrets) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     res.json({
//       message: "This users secrets are:",
//       ownedSecrets: userWithSecrets.ownedSecrets,
//     });
//   }
// );

// export const updateSecret = asyncHandler(async (req, res) => {
//   const { secretId, status } = req.body;

//   if (status === "VIEWED") {
//     const secret = await markSecretViewed(secretId);
//     return res.json(secret);
//   }

//   if (status === "ACTIVE" || status === "EXPIRED") {
//     const secret = await updateSecretStatus(secretId, status);
//     return res.json(secret);
//   }

//   throw new Error("Invalid status");
// });

// export const markSecretViewed = async (secretId: string) => {
//   return prisma.secret.update({
//     where: { id: secretId },
//     data: {
//       status: "VIEWED",
//       viewedAt: new Date(),
//     },
//   });
// };

// export const updateSecretStatus = async (
//   secretId: string,
//   status: "ACTIVE" | "EXPIRED"
// ) => {
//   return prisma.secret.update({
//     where: { id: secretId },
//     data: {
//       status,
//       viewedAt: null,
//     },
//   });
// };

// const validateSecretStatus = (status, viewedAt) => {
//   if (status === "VIEWED" && !viewedAt) {
//     throw new Error("viewedAt is required when status is VIEWED");
//   }

//   if (status !== "VIEWED" && viewedAt) {
//     throw new Error("viewedAt must be null unless status is VIEWED");
//   }
// };
