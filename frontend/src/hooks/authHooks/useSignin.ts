import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../lib/auth";

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
    },
  });
};
