export type ToastType = "success" | "error" | "info";

export interface ToastOptions {
  redirect?: boolean;
  duration?: number;
}

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
