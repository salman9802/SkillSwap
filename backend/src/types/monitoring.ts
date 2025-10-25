export const CPU_CONDITION = {
  IDLE: "Idle / Low Load",
  MODERATE: "Moderate Load",
  HIGH: "High Load",
  CRITICAL: "Critical Load",
} as const;

export type CpuCondition = keyof typeof CPU_CONDITION;
export type CpuConditionLabel = (typeof CPU_CONDITION)[CpuCondition];
