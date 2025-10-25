import React from "react";
import type { SystemMetric } from "../types";
import { formatUptime, styleCpuStatCard, styleMemoryStatCard } from "../utils";

type StatsCardsProps = {
  metric: SystemMetric | undefined;
};

export const StatsCards = ({ metric }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-1.5 p-3 md:gap-3 md:p-6 xl:grid-cols-4">
      <div className="flex flex-col items-center justify-center gap-1 border border-gray-200 py-6 text-gray-600 shadow-md">
        <h1 className="">Uptime</h1>
        {/* <p className="text-lg font-semibold">23:12:43:10</p> */}
        <div className="w-full text-center text-lg font-semibold">
          {metric ? (
            formatUptime(metric.uptime)
          ) : (
            <p className="mx-auto h-lh w-[10ch] animate-pulse rounded-md bg-gray-300"></p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 border border-gray-200 py-6 text-gray-600 shadow-md">
        <h1 className="">Server Time</h1>
        {/* <p className="text-center text-lg font-semibold">
          28 Sept 2025, <br /> 09:01
        </p> */}
        <div className="text-center text-lg font-semibold">
          {metric ? (
            metric.timestamp.toLocaleString()
          ) : (
            <p className="mx-auto h-lh w-[10ch] animate-pulse rounded-md bg-gray-300"></p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 border border-gray-200 py-6 text-gray-600 shadow-md">
        <h1 className="">CPU usage</h1>
        {/* <p className="text-lg font-semibold text-green-500">12%</p> */}
        <div
          className={`text-lg font-semibold ${styleCpuStatCard(metric?.cpuCondition)}`}
        >
          {metric ? (
            metric.cpuLoadPercent
          ) : (
            <p className="mx-auto h-lh w-[10ch] animate-pulse rounded-md bg-gray-300"></p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 border border-gray-200 py-6 text-gray-600 shadow-md">
        <h1 className="">Memory Usage</h1>
        {/* <p className="text-lg font-semibold text-yellow-500">3.6/4 GB</p> */}
        <div
          className={`text-lg font-semibold ${styleMemoryStatCard(metric ? metric.memoryUsage / metric.totalMemory : 0)}`}
        >
          {metric ? (
            `${metric.memoryUsage.toFixed(2)}/${metric.totalMemory.toFixed(2)} MB`
          ) : (
            <p className="mx-auto h-lh w-[10ch] animate-pulse rounded-md bg-gray-300"></p>
          )}
        </div>
      </div>
    </div>
  );
};
