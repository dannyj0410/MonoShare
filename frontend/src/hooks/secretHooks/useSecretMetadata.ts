import { useQuery } from "@tanstack/react-query";
import { getSecretMetadata } from "../../lib/secret";
import { useError } from "../useError";
import { useEffect } from "react";
import { isApiError } from "../../interfaces/error.interface";

export const useSecretMetadata = (id: string) => {
  const { showError } = useError();

  const query = useQuery({
    queryKey: ["secret-metadata", id],
    queryFn: () => getSecretMetadata(id),
    gcTime: 0,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    throwOnError: false,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      const error = query.error;

      let message = "Failed to load metadata";
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
