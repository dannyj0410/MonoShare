import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSecret } from "../../lib/secret";
import { isApiError } from "../../interfaces/error.interface";
import { useError } from "../useError";

export const useCreateSecret = () => {
  const { showError } = useError();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSecret,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mysecrets"] });
    },

    onError: (error) => {
      let message = "Registration Error";
      let statusCode: number | undefined;

      if (isApiError(error)) {
        message = error.response?.data?.message || message;
        statusCode = error.response?.status;
      } else if (error instanceof Error) {
        message = error.message;
      }

      showError(message, { redirect: false, duration: 5000 });
      console.log("Error detected:", { message, statusCode });
    },
  });
};
