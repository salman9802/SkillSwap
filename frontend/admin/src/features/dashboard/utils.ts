import type { CpuConditionLabel } from "./types";

export function formatUptime(uptime: number) {
  const minutes = Math.floor(uptime / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days.toString().padStart(2, "0")}:${(hours % 24).toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}:${(uptime % 60).toString().padStart(2, "0")}`;
}

export function styleCpuStatCard(
  cpuConditionLabel: CpuConditionLabel | undefined,
) {
  if (cpuConditionLabel === "Idle / Low Load") return "text-green-500";
  else if (cpuConditionLabel === "Moderate Load") return "text-yellow-500";
  else if (cpuConditionLabel === "High Load") return "text-orange-500";
  else if (cpuConditionLabel === "Critical Load") return "text-red-500";
  else return "text-gray-500";
}

export function styleMemoryStatCard(mem: number) {
  if (mem === 0) return "text-gray-500";
  else if (mem < 25) return "text-green-500";
  else if (mem < 50) return "text-yellow-500";
  else if (mem < 75) return "text-orange-500";
  else if (mem < 100) return "text-red-500";
}

export function styleCpuPieChart(
  cpuConditionLabel: CpuConditionLabel | undefined,
) {
  if (cpuConditionLabel === "Idle / Low Load") return "#22c55e";
  else if (cpuConditionLabel === "Moderate Load") return "#eab308";
  else if (cpuConditionLabel === "High Load") return "#f97316";
  else if (cpuConditionLabel === "Critical Load") return "#ef4444";
  else return "#6b7280";
}

export function styleMemoryPieChart(mem: number) {
  if (mem === 0) return "#6b7280";
  else if (mem < 25) return "#22c55e";
  else if (mem < 50) return "#eab308";
  else if (mem < 75) return "#f97316";
  return "#ef4444";
}
