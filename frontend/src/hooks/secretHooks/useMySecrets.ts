import { useQuery } from "@tanstack/react-query";
import { getMySecrets } from "../../lib/secret";

export const useMySecrets = () => {
  return useQuery({
    queryKey: ["mysecrets"],
    queryFn: getMySecrets,
    retry: false, // 401 ≠ retry
    staleTime: 5 * 60_000, // optional
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });
};
