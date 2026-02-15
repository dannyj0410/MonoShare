import { createContext } from "react";
import type { ErrorContextType } from "../../interfaces/error.interface";

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);
