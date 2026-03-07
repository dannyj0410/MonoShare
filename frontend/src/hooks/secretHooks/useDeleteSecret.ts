import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSecret } from "../../lib/secret";
import { type ToastType } from "../../interfaces/toast.interface";
import useReturnPage from "../useReturnPage";
import { useHandleResponse } from "../useHandleResponse";

export const useDeleteSecret = (navBack: boolean = false) => {
  const handleResponse = useHandleResponse();
  const queryClient = useQueryClient();

  const returnPage = useReturnPage(navBack);

  return useMutation({
    mutationFn: (id: string) => deleteSecret(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["secret", id] });
      queryClient.invalidateQueries({ queryKey: ["mysecrets"] });
      const toastType: ToastType = "success";
      handleResponse(toastType, "Secret deleted", null, 4000);
      returnPage();
    },
    onError: (error) => {
      const toastType: ToastType = "error";
      handleResponse(toastType, "Failed to delete secret", error, 5000);
    },
  });
};
