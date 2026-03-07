import { useQuery } from "@tanstack/react-query";
import { getSecretMetadata } from "../../lib/secret";
import { useToast } from "../useToast";
import { useEffect } from "react";
import { type ToastType } from "../../interfaces/toast.interface";
import { useHandleResponse } from "../useHandleResponse";

export const useSecretMetadata = (id: string, hasHash: boolean) => {
  const handleResponse = useHandleResponse();
  const { showToast } = useToast();

  const query = useQuery({
    queryKey: ["secret-metadata", id],
    queryFn: () => getSecretMetadata(id, hasHash),
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
      const toastType: ToastType = "error";
      handleResponse(
        toastType,
        "Failed to load metadata",
        query.error,
        5000,
        true,
      );
    }
  }, [query.isError, query.error, showToast, handleResponse]);

  return query;
};
