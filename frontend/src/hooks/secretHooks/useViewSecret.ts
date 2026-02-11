import { useQuery } from "@tanstack/react-query";
import { viewSecret } from "../../lib/secret";

export const useViewSecret = (id: string) => {
  return useQuery({
    queryKey: ["secret"],
    queryFn: ({ signal }) => viewSecret(id, signal),
    gcTime: 0, // Erases from cache
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
