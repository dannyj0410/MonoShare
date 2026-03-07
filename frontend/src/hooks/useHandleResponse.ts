import { useCallback } from "react";
import { isApiError, type ToastType } from "../interfaces/toast.interface";
import { useToast } from "./useToast";

export const useHandleResponse = () => {
  const { showToast } = useToast();

  return useCallback(
    (
      toastType: ToastType,
      defaultMessage = "An error occurred",
      error: unknown | null,
      duration?: number,
      redirect = false,
    ) => {
      let type = toastType;
      let message = defaultMessage;
      let statusCode: number | undefined;

      if (isApiError(error)) {
        message = error.response?.data?.message || message;
        statusCode = error.response?.status;
      } else if (error instanceof Error) {
        message = error.message;
      }

      if (statusCode === 429) {
        type = "info";
      }

      showToast(message, type, { redirect: redirect, duration: duration });
      console.log("Response:", { message, statusCode });
    },
    [showToast],
  );
};
