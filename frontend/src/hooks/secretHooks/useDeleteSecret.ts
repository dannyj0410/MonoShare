import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSecret } from "../../lib/secret";
import { useNavigate } from "react-router-dom";

export const useDeleteSecret = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteSecret(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secret", id] });
      queryClient.invalidateQueries({ queryKey: ["mysecrets"] });
      navigate(-1);
    },
  });
};
