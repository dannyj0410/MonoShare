import { useEffect } from "react";
import { useUser } from "./useUser";
import { isApiError } from "../../interfaces/error.interface";
import { useError } from "../useError";

export const useAuthCheck = () => {
  const { showError } = useError();
  const { data: user, isLoading, isError, error } = useUser();

  useEffect(() => {
    if (isError && error) {
      let message = "Unauthorized";
      let statusCode: number | undefined;

      if (isApiError(error)) {
        message = error.response?.data?.message || message;
        statusCode = error.response?.status;
      } else if (error instanceof Error) {
        message = error.message;
      }

      console.log("Error detected:", { message, statusCode });

      if (statusCode === 404 || statusCode === 401 || statusCode === 500) {
        showError(message, { redirect: true, duration: 5000 });
      } else {
        showError(message, { redirect: false, duration: 5000 });
      }
    }
  }, [isError, error, showError]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
  };
};
