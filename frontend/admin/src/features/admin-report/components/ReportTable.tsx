import type { ReportData, ReportType } from "../types";

type ReportTableProps = {
  reportType: ReportType;
  reportData: ReportData;
};

export const ReportTable = ({ reportType, reportData }: ReportTableProps) => {
  return (
    <table
      id="report-table"
      className="border-collapse border border-gray-300 text-gray-600"
    >
      <thead className="bg-gray-200 font-semibold">
        <tr className="text-left">
          <th className="border border-gray-300 p-3">
            {reportType === "by_route" ? "Route" : "Type"}
          </th>
          <th className="border border-gray-300 p-3">Count</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(reportData).map((k, i) => (
          <tr key={i}>
            <td className="border border-gray-300 p-3">
              <code>{k}</code>
            </td>
            <td className="border border-gray-300 p-3 font-medium">
              {/* TODO: format (50,000) */}
              {reportData[k]}
            </td>
          </tr>
        ))}

        {/* <tr>
          <td className="border border-gray-300 p-3">
            <code>/api/admin</code>
          </td>
          <td className="border border-gray-300 p-3 font-medium">30</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-3">
            <code>/api/auth</code>
          </td>
          <td className="border border-gray-300 p-3 font-medium">50,000</td>
        </tr> */}
      </tbody>
    </table>
  );
};
