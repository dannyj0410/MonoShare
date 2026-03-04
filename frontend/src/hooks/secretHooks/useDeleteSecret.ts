import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSecret } from "../../lib/secret";
import { useError } from "../useError";
import { isApiError } from "../../interfaces/error.interface";
import useReturnPage from "../useReturnPage";

export const useDeleteSecret = (navBack: boolean = false) => {
  const { showError } = useError();
  const queryClient = useQueryClient();

  console.log(navBack);
  const returnPage = useReturnPage(undefined, navBack);

  return useMutation({
    mutationFn: (id: string) => deleteSecret(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["secret", id] });
      queryClient.invalidateQueries({ queryKey: ["mysecrets"] });
      returnPage();
    },
    onError: (error) => {
      let message = "Registration Error";
      let statusCode: number | undefined;

      if (isApiError(error)) {
        message = error.response?.data?.message || message;
        statusCode = error.response?.status;
        if (statusCode === 404) {
          message = "You are not the owner of this secret!";
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      showError(message, { redirect: false, duration: 5000 });
      console.log("Error detected:", { message, statusCode });
    },
  });
};
