import { useQueryClient, useMutation } from "@tanstack/react-query";
import { register } from "../../lib/auth";
import { type ToastType } from "../../interfaces/toast.interface";
import { useHandleResponse } from "../useHandleResponse";

export const useRegister = () => {
  const handleResponse = useHandleResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      const toastType: ToastType = "success";
      handleResponse(toastType, "Account Created Successfully", null, 5000);
    },

    onError: (error) => {
      const toastType: ToastType = "error";
      handleResponse(toastType, "Failed to register", error, 5000);
    },
  });
};
