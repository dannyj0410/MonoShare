export type ToastType = "success" | "error" | "info";

export interface ToastOptions {
  redirect?: boolean;
  duration?: number;
}

export type ToastState = {
  message: string | null;
  type: ToastType;
  isVisible: boolean;
};

export type ToastAction =
  | { type: "SHOW"; payload: { message: string; toastType: ToastType } }
  | { type: "HIDE" }
  | { type: "CLEAR" };

export interface ToastContextType {
  showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
  clearToast: () => void;
}

export interface ApiResponse {
  message: string;
  statusCode?: number;
}

export interface ApiError extends Error {
  response?: {
    data?: ApiResponse;
    status?: number;
  };
}

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && error !== null && "response" in error;
};
