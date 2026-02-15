import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2025 is not found
    if (
      err.code === "P2025" ||
      err.code === "P2023" ||
      err.code === "P2022" ||
      err.code === "P2021"
    ) {
      statusCode = 404;
      message = "The requested record was not found.";
    }

    // P2002 means already exists
    if (err.code === "P2002") {
      statusCode = 409;
      message = "A record with this information already exists.";
    }
  }

  res.status(statusCode).json({
    status: "error",
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
