import { useQuery } from "@tanstack/react-query";
import { viewSecret } from "../../lib/secret";
import { useLocation } from "react-router-dom";
import { useError } from "../useError";
import { useEffect } from "react";
import { isApiError } from "../../interfaces/error.interface";

// signal is to abort if user navigates away before the secret is fetched
export const useViewSecret = (
  id: string,
  password: string | null,
  options = {},
) => {
  const { showError } = useError();
  const location = useLocation();
  const urlHash = location.hash;
  const query = useQuery({
    queryKey: ["secret", id, urlHash],
    queryFn: ({ signal }) => viewSecret(id, password, signal),
    ...options,
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

      let message = "Failed to load secret";
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
