import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/auth";
import { useHandleResponse } from "../useHandleResponse";

export const useLogout = () => {
  const handleResponse = useHandleResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onMutate: async () => {
      queryClient.setQueryData(["user"], null);
    },
    onSuccess: () => {
      queryClient.clear();
      queryClient.removeQueries({ queryKey: ["user"] });
      handleResponse("info", "Logged Out", null);
    },
  });
};
