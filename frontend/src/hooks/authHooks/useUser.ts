import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../lib/auth";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false, // 401 ≠ retry
    staleTime: 5 * 60_000, // optional
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
