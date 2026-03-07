import { useEffect } from "react";
import { useUser } from "./useUser";
import { type ToastType } from "../../interfaces/toast.interface";
import { useToast } from "../useToast";
import { useHandleResponse } from "../useHandleResponse";

export const useAuthCheck = () => {
  const handleResponse = useHandleResponse();
  const { showToast } = useToast();
  const { data: user, isFetching, isError, error } = useUser();

  useEffect(() => {
    if (isError && error) {
      const toastType: ToastType = "error";
      handleResponse(
        toastType,
        "Failed to load secret details",
        error,
        5000,
        true,
      );
    }
  }, [isError, error, showToast, handleResponse]);

  return {
    user,
    isFetching,
    isAuthenticated: !!user && !isError,
  };
};
