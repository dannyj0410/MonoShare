import { useMutation } from "@tanstack/react-query";
import { useHandleResponse } from "../useHandleResponse";
import { forgotPassword } from "../../api/auth.api";

export const useForgotPassword = () => {
  const handleResponse = useHandleResponse();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () =>
      handleResponse(
        "success",
        "A reset link has been sent to the email address provided",
        null,
        5000,
      ),
    onError: (error) =>
      handleResponse("error", "Something went wrong. Please try again.", error),
  });
};
