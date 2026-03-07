import { useQuery } from "@tanstack/react-query";
import { viewSecret } from "../../lib/secret";
import { useLocation } from "react-router-dom";
import { useToast } from "../useToast";
import { useEffect, useRef } from "react";
import { type ToastType } from "../../interfaces/toast.interface";
import { useHandleResponse } from "../useHandleResponse";

export const useViewSecret = (
  id: string,
  password: string | null,
  options = {},
) => {
  const handleResponse = useHandleResponse();
  const { showToast } = useToast();
  const hasToasted = useRef(false);
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
    if (query.isSuccess && !hasToasted.current) {
      const toastType: ToastType = "info";
      hasToasted.current = true;
      handleResponse(
        toastType,
        "Secret has now been viewed and erased",
        null,
        5000,
      );
    }

    if (query.isError && query.error) {
      const toastType: ToastType = "error";
      handleResponse(
        toastType,
        "Error viewing secret",
        query.error,
        5000,
        true,
      );
    }
  }, [query.isError, query.error, showToast, query.isSuccess, handleResponse]);

  return query;
};
