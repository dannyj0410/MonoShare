import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], null);
    },
    onSuccess: () => {
      queryClient.clear();
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });
};
