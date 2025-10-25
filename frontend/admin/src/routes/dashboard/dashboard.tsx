import React from "react";

import {
  ResourceCharts,
  StatsCards,
  TimeSeriesChart,
  type SystemMetric,
} from "@src/features/dashboard";

// import StatCards from "@src/features/dashboard/components/StatCards";
// import ResourceCharts from "@src/features/dashboard/components/ResourceCharts";
// import TimeSeriesChart from "@src/features/dashboard/components/TimeSeriesChart";

const Dashboard = () => {
  const [metric, setMetric] = React.useState<SystemMetric>();

  React.useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_ADMIN_API_URL}/api/admin/system-metrics`,
      { withCredentials: true },
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      data.timestamp = new Date(data.timestamp);
      // console.log("Event Source Data: ", data);
      setMetric(data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    // cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 md:gap-6 lg:gap-12">
      <StatsCards metric={metric} />
      <ResourceCharts metric={metric} />
      <TimeSeriesChart metric={metric} />
    </div>
  );
};

export default Dashboard;
