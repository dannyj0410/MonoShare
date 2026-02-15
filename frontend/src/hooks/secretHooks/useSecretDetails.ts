import { useQuery } from "@tanstack/react-query";
import { getSecretDetails } from "../../lib/secret";
import { useError } from "../useError";
import { useEffect } from "react";
import { isApiError } from "../../interfaces/error.interface";

export const useSecretDetails = (id: string) => {
  const { showError } = useError();

  //return useQuery<Secret, Error>
  const query = useQuery({
    queryKey: ["secret", id],
    queryFn: () => getSecretDetails(id),
    enabled: !!id,
    gcTime: 60_000,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    throwOnError: false,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      const error = query.error;

      let message = "Failed to load secret details";
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
  }, [query.isError, query.error, showError]);

  return query;
};
