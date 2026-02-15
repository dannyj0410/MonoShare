import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createSecret } from "../../lib/secret";
import { useNavigate } from "react-router-dom";

export const useCreateSecret = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSecret,

    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["mysecrets"] });
      navigate(`/details/${data.id}`);
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : "Something went wrong";
      alert(message);
    },
  });
};
