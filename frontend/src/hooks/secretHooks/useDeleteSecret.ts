import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSecret } from "../../lib/secret";
import { useNavigate } from "react-router-dom";
import { useError } from "../useError";
import { isApiError } from "../../interfaces/error.interface";

export const useDeleteSecret = (id: string, navBack?: boolean) => {
  const { showError } = useError();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteSecret(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secret", id] });
      queryClient.invalidateQueries({ queryKey: ["mysecrets"] });
      if (navBack) navigate(-1);
    },
    onError: (error) => {
      let message = "Registration Error";
      let statusCode: number | undefined;

      if (isApiError(error)) {
        message = error.response?.data?.message || message;
        statusCode = error.response?.status;
        if (statusCode === 404) {
          message = "You are not the owner of this secret!";
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      showError(message, { redirect: false, duration: 5000 });
      console.log("Error detected:", { message, statusCode });
    },
  });
};
