import { useQuery } from "@tanstack/react-query";
import { getMySecrets } from "../../lib/secret";
import { useToast } from "../useToast";
import { useEffect } from "react";
import { type ToastType } from "../../interfaces/toast.interface";
import { useHandleResponse } from "../useHandleResponse";

export const useMySecrets = () => {
  const handleResponse = useHandleResponse();
  const { showToast } = useToast();
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
      const toastType: ToastType = "error";
      handleResponse(toastType, "Error loading secrets", query.error, 5000);
    }
  }, [query.isError, query.error, showToast, handleResponse]);

  return query;
};
