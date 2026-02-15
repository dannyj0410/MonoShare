import { useQueryClient, useMutation } from "@tanstack/react-query";
import { register } from "../../lib/auth";
import { useError } from "../useError";
import { isApiError } from "../../interfaces/error.interface";

export const useRegister = () => {
  const { showError } = useError();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      // redirect, toast, set auth state, etc
      // queryClient.invalidateQueries({ queryKey: ["user"] }); //invalidates and refresh user, basically recalling useUser hook
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
