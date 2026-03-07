import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../lib/auth";
import { useHandleResponse } from "../useHandleResponse";
import type { ToastType } from "../../interfaces/toast.interface";

export const useSignin = () => {
  const handleResponse = useHandleResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      const toastType: ToastType = "success";
      handleResponse(toastType, "Signed In", null, 5000);
    },
    onError: (error) => {
      const toastType: ToastType = "error";
      handleResponse(toastType, "Error Signing In", error, 5000);
    },
  });
};
