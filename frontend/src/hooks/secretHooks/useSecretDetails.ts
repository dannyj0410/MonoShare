import { useQuery } from "@tanstack/react-query";
import { getSecretDetails } from "../../lib/secret";
import { useToast } from "../useToast";
import { useEffect } from "react";
import { type ToastType } from "../../interfaces/toast.interface";
import { useHandleResponse } from "../useHandleResponse";

export const useSecretDetails = (id: string, options = {}) => {
  const handleResponse = useHandleResponse();
  const { showToast } = useToast();

  const query = useQuery({
    queryKey: ["secret", id],
    queryFn: () => getSecretDetails(id),
    ...options,
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
      const toastType: ToastType = "error";
      handleResponse(
        toastType,
        "Failed to load secret details",
        query.error,
        5000,
        true,
      );
    }
  }, [query.isError, query.error, showToast, handleResponse]);

  return query;
};
