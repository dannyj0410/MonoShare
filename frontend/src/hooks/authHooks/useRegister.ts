import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { register } from "../../lib/auth";

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      // redirect, toast, set auth state, etc
      // queryClient.invalidateQueries({ queryKey: ["user"] }); //invalidates and refresh user, basically recalling useUser hook
      queryClient.setQueryData(["user"], data.user);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        // console.error(error.response?.data?.message);
        // setFormError(message ?? "Something went wrong");
      } else {
        console.error("Unexpected error");
      }
    },
  });
};
