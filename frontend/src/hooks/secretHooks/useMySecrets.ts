import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMySecrets } from "../../lib/secret";
import { useError } from "../useError";
import { useEffect } from "react";
import { isApiError } from "../../interfaces/error.interface";

export const useMySecrets = () => {
  const queryClient = useQueryClient();
  const { showError } = useError();
  const query = useQuery({
    queryKey: ["mysecrets"],
    queryFn: getMySecrets,
    retry: false,
    staleTime: 0,
    gcTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      const error = query.error;
      let message = "Failed to load my secrets";
      let statusCode: number | undefined;

      if (isApiError(error)) {
        message = error.response?.data?.message || message;
        statusCode = error.response?.status;
      } else if (error instanceof Error) {
        message = error.message;
      }

      console.log("Error detected:", { message, statusCode });

      if (statusCode === 404 || statusCode === 401 || statusCode === 500) {
        showError(message, { redirect: true, duration: 5000 });
      } else {
        showError(message, { redirect: true, duration: 4000 });
      }
    }
  }, [query.isError, query.error, showError, queryClient]);

  return query;
};
