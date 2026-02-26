import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/auth";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onMutate: async () => {
      queryClient.setQueryData(["user"], null);
    },
    onSuccess: () => {
      queryClient.clear();
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });
};
