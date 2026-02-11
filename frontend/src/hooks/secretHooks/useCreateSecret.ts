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

//useCreateSecret = (setErrorMessage) is passed showError from component and can set its state just like any other function and show an error message in the component
// which will clear after a timer using a useEffect and dependency on the message
