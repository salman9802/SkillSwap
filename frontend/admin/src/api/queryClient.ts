import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  //     defaultOptions: {
  //     queries: {
  //       staleTime: 1000 * 60 * 5,      // 5 min
  //       cacheTime: 1000 * 60 * 30,     // 30 min
  //       refetchOnWindowFocus: true,
  //       refetchOnReconnect: true,
  //       retry: 1,
  //     },
  //   },
});
