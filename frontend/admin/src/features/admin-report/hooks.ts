import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@src/api/queryKeys";
import { fetchReport } from "./services";

export function useReport() {
  return useQuery({
    queryKey: queryKeys.fetchAdminReport(),
    queryFn: fetchReport,
  });
}
