import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_CONTENT_TOO_LARGE,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
} from "../constants/http_status";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || HTTP_INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  // express errors
  if (err.type === "entity.too.large") {
    statusCode = HTTP_CONTENT_TOO_LARGE;
    message = "Payload size too large";
  } else if (err instanceof SyntaxError && "body" in err) {
    statusCode = HTTP_BAD_REQUEST;
    message = "Invalid JSON format";
  }

  // prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (["P2025", "P2023", "P2022", "P2021"].includes(err.code)) {
      statusCode = 404;
      message = "The requested record was not found.";
    }

    // P2002 means already exists
    if (err.code === "P2002") {
      statusCode = HTTP_CONFLICT;
      message = "A record with this information already exists.";
    }
  }

  res.status(statusCode).json({
    status: "error",
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
