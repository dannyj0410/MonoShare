import { useMutation } from "@tanstack/react-query";
import { deleteSecret } from "../../lib/secret";

export const useDeleteSecret = () => {
  return useMutation({
    mutationFn: deleteSecret,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
