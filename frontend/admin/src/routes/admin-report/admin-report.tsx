import React from "react";

import {
  Download,
  ReportTypeFilter,
  ReportTable,
  type ReportType,
} from "@src/features/admin-report";

const routeReport: Record<string, number> = {
  "/api/admin": 30,
  "/api/auth": 50000,
};
const typeReport: Record<string, number> = {
  "admin.signup": 30,
  "admin.auth": 50000,
};

const AdminReport = () => {
  const [reportType, setReportType] = React.useState<ReportType>("by_route");

  return (
    <div className="flex flex-col gap-6 p-6 py-12 md:gap-8 lg:mx-auto lg:w-3/4 lg:gap-12">
      <div className="mr-6 ml-auto flex items-center gap-6">
        <Download
          reportType={reportType}
          reportData={reportType === "by_route" ? routeReport : typeReport}
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
        reportData={reportType === "by_route" ? routeReport : typeReport}
      />
    </div>
  );
};

export default AdminReport;
