import { useQuery } from "@tanstack/react-query";
import { getSecretDetails } from "../../lib/secret";

export const useSecretDetails = (id: string) => {
  //return useQuery<Secret, Error>
  return useQuery({
    queryKey: ["secret", id],
    queryFn: () => getSecretDetails(id),
  });
};
