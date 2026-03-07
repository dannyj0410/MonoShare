import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSecret } from "../../lib/secret";
import { type ToastType } from "../../interfaces/toast.interface";
import { useHandleResponse } from "../useHandleResponse";

export const useCreateSecret = () => {
  const handleResponse = useHandleResponse();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSecret,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mysecrets"] });
      const toastType: ToastType = "success";
      handleResponse(toastType, "Secret Created", null);
    },

    onError: (error) => {
      const toastType: ToastType = "error";
      handleResponse(toastType, "Secret Creation Failed", error);
    },
  });
};
