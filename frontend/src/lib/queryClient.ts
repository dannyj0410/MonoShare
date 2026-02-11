import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,

      // 3. Handle global error logic (optional)
      throwOnError: true,
    },
  },
});
