export type ReportData = Record<string, number>;

export type ReportType = "by_route" | "by_type";

export type ReportResponse = {
  typeLogs: Record<string, number>;
  routeLogs: Record<string, number>;
};
