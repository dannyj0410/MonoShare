import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHandleResponse } from "../useHandleResponse";
import type { ToastType } from "../../interfaces/toast.interface";
import { signin } from "../../api/auth.api";

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
