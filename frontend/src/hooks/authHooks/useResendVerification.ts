import { useMutation } from "@tanstack/react-query";
import { useHandleResponse } from "../useHandleResponse";
import { resendEmailVerification } from "../../api/auth.api";

export const useResendVerification = () => {
  const handleResponse = useHandleResponse();
  return useMutation({
    mutationFn: resendEmailVerification,
    onSuccess: () =>
      handleResponse(
        "success",
        "Verification email sent. Please check your inbox.",
        null,
        10000,
      ),
    onError: (error) => {
      handleResponse("error", "Failed to resend email", error);
    },
  });
};
