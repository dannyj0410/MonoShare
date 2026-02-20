import { useQuery } from "@tanstack/react-query";
import { viewSecret } from "../../lib/secret";
import { useLocation } from "react-router-dom";

// signal is to abort if user navigates away before the secret is fetched
export const useViewSecret = (id: string) => {
  const location = useLocation();
  const urlHash = location.hash;
  return useQuery({
    queryKey: ["secret", id, urlHash],
    queryFn: ({ signal }) => viewSecret(id, signal),
    gcTime: 0,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};

// if (isError) {
//   if (error instanceof Error && error.name === 'AbortError') {
//     console.log("Fetch cancelled by user navigation.");
//     return null; // Render nothing, as the component is likely unmounting anyway
//   }

//   return <ErrorMessage message={error.message} />;
// }
