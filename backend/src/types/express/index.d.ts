import { User, Session } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    session?: Session;
  }
}

export {};
