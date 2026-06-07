import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useHandleResponse } from "../useHandleResponse";
import { verifyEmail } from "../../api/auth.api";
import { useEffect } from "react";
import { useToast } from "../useToast";
import type { ToastType } from "../../interfaces/toast.interface";

export const useVerifyEmail = (token: string | null) => {
  const handleResponse = useHandleResponse();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const query = useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => verifyEmail(token!),
    staleTime: Infinity,
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const toastType: ToastType = "success";

      handleResponse(toastType, "Email verified successfully!", null, 5000);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }

    if (query.isError && query.error) {
      const toastType: ToastType = "error";
      handleResponse(
        toastType,
        "Verification Failed. Please try again.",
        query.error,
        5000,
      );
    }
  }, [
    query.isError,
    query.error,
    showToast,
    handleResponse,
    query.isSuccess,
    queryClient,
  ]);

  return query;
};
