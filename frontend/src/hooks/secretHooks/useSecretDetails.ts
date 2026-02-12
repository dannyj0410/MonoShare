import { useQuery } from "@tanstack/react-query";
import { getSecretDetails } from "../../lib/secret";

export const useSecretDetails = (id: string) => {
  //return useQuery<Secret, Error>
  return useQuery({
    queryKey: ["secret", id],
    queryFn: () => getSecretDetails(id),
    enabled: !!id,
    gcTime: 60_000, // Erases from cache
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });
};
