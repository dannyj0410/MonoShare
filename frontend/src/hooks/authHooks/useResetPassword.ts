import { useMutation } from "@tanstack/react-query";
import { useHandleResponse } from "../useHandleResponse";
import { resetPassword } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const handleResponse = useHandleResponse();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      handleResponse(
        "success",
        "Password reset successfully! Please sign in.",
        null,
        5000,
      );
      navigate("/sign-in");
    },
    onError: (error) =>
      handleResponse("error", "Failed to reset password", error),
  });
};
