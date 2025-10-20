import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@src/api/queryKeys";
import { fetchLogs } from "./services";

export function useLogs(page: number) {
  return useQuery({
    queryKey: queryKeys.fetchUserLogs(page),
    queryFn: () => fetchLogs(page),
  });
}
