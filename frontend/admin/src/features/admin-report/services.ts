import { privateApi } from "@src/api/client";
import type { ReportResponse } from "./types";

export async function fetchReport(): Promise<ReportResponse> {
  const res = await privateApi.get("logs/report");
  return res.data;
}
