import { privateApi } from "@src/api/client";
import type { LogData, LogResponse } from "./types";

export async function fetchLogs(page: number): Promise<LogData> {
  const res = await privateApi.get<LogResponse>("user-logs", {
    params: {
      page,
    },
  });
  let logs: LogData["logs"] = res.data.logs.map((log) => ({
    ...log,
    timestamp: new Date(log.timestamp),
  }));
  return { logs, total: res.data.total };
}
