import React from "react";

import {
  ResourceCharts,
  StatsCards,
  TimeSeriesChart,
} from "@src/features/dashboard";

// import StatCards from "@src/features/dashboard/components/StatCards";
// import ResourceCharts from "@src/features/dashboard/components/ResourceCharts";
// import TimeSeriesChart from "@src/features/dashboard/components/TimeSeriesChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-3 md:gap-6 lg:gap-12">
      <StatsCards />
      <ResourceCharts />
      <TimeSeriesChart />
    </div>
  );
};

export default Dashboard;
