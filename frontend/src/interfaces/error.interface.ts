export interface ErrorOptions {
  redirect?: boolean;
  duration?: number;
}

export interface ErrorContextType {
  showError: (message: string, options?: ErrorOptions) => void;
  clearError: () => void;
}

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}

export interface ApiError extends Error {
  response?: {
    data?: ApiErrorResponse;
    status?: number;
  };
}

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && error !== null && "response" in error;
};
