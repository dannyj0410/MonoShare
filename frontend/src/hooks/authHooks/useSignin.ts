import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../lib/auth";
import { isApiError } from "../../interfaces/error.interface";
import { useError } from "../useError";

export const useSignin = () => {
  const { showError } = useError();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
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
