import { createContext } from "react";
import type { ToastContextType } from "../../interfaces/toast.interface";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
