import React from "react";

import {
  Download,
  ReportTypeFilter,
  ReportTable,
  type ReportType,
  useReport,
} from "@src/features/admin-report";
import { GlobalLoader } from "@src/components/feedback/GlobalLoader";

const AdminReport = () => {
  const [reportType, setReportType] = React.useState<ReportType>("by_route");

  const { data: report, isError, isLoading } = useReport();

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <GlobalLoader />
      </div>
    );

  if (isError || !report) throw new Error("Couldn't load report");

  return (
    <div className="flex flex-col gap-6 p-6 py-12 md:gap-8 lg:mx-auto lg:w-3/4 lg:gap-12">
      <div className="mr-6 ml-auto flex items-center gap-6">
        <Download
          reportType={reportType}
          reportData={
            reportType === "by_route" ? report.routeLogs : report.typeLogs
          }
        />
        <ReportTypeFilter
          reportType={reportType}
          onChange={(reportType: ReportType) => {
            setReportType(reportType);
          }}
        />
      </div>

      <ReportTable
        reportType={reportType}
        reportData={
          reportType === "by_route" ? report.routeLogs : report.typeLogs
        }
      />
    </div>
  );
};

export default AdminReport;
