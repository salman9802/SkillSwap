import os from "os";

import { AdminLog, Prisma } from "../../generated/prisma";

import prisma from "../db/client";
import { BatchQueue } from "../lib/queue";
import { CpuCondition, CPU_CONDITION } from "@shared-types/system-metrics";

export class MonitoringService {
  static RES_BUFFER_SIZE = 100;
  static RES_FLUSH_INTERVAL = 10000; // 10s
  static ADMIN_BUFFER_SIZE = 100;
  static ADMIN_FLUSH_INTERVAL = 10000; // 10s
  static USER_BUFFER_SIZE = 100;
  static USER_FLUSH_INTERVAL = 10000; // 10s

  static responseLogBatchQueue = new BatchQueue(
    async (logs: Prisma.ResponseLogCreateManyInput[]) => {
      await prisma.responseLog.createMany({ data: logs });
    },
    this.RES_BUFFER_SIZE,
    this.RES_FLUSH_INTERVAL
  );
  static adminLogBatchQueue = new BatchQueue(
    async (logs: Prisma.AdminLogCreateManyInput[]) => {
      await prisma.adminLog.createMany({ data: logs });
    },
    this.ADMIN_BUFFER_SIZE,
    this.ADMIN_FLUSH_INTERVAL
  );
  static userLogBatchQueue = new BatchQueue(
    async (logs: Prisma.UserLogCreateManyInput[]) => {
      await prisma.userLog.createMany({ data: logs });
    },
    this.USER_BUFFER_SIZE,
    this.USER_FLUSH_INTERVAL
  );

  //   static SYSTEM_METRIC_INTERVAL = 10000; // 10s
  //   static systemMetricIntervalId: NodeJS.Timeout;

  static async recordResponseLog(
    responseLog: Prisma.ResponseLogCreateManyInput
  ) {
    this.responseLogBatchQueue.push(responseLog);
  }

  static recordAdminLog(adminLog: Prisma.AdminLogCreateManyInput) {
    this.adminLogBatchQueue.push(adminLog);
  }

  static recordUserLog(userLog: Prisma.UserLogCreateManyInput) {
    this.userLogBatchQueue.push(userLog);
  }

  static getSystemMetrics() {
    const load = os.loadavg()[0]; // 1-min avg
    const cores = os.cpus().length; // number of cores
    let cpuCondition: CpuCondition = "CRITICAL";

    if (load < cores * 0.5) cpuCondition = "IDLE"; // CPU mostly idle
    else if (load < cores)
      cpuCondition = "MODERATE"; // CPU active but not overloaded
    else if (load >= cores)
      cpuCondition = "HIGH"; // CPU fully used or overloaded
    else if (load >= cores * 1.5) cpuCondition = "CRITICAL"; // CPU heavily overloaded

    return {
      // cpuUsage: os.loadavg()[0], // 1-min avg
      cpuCondition: CPU_CONDITION[cpuCondition],
      cpuLoadPercent: (load / cores) * 100,
      memoryUsage: process.memoryUsage().rss / 1024 / 1024, // in MB
      totalMemory: os.totalmem() / 1024 / 1024, // in MB
      uptime: Math.floor(process.uptime()),
      timestamp: new Date(),
    };
  }

  //   private static async recordSystemMetrics() {
  //     await prisma.systemMetric.create({
  //       data: {
  //         cpuUsage: os.loadavg()[0], // 1-min avg
  //         memoryUsage: process.memoryUsage().rss / 1024 / 1024,
  //         uptime: Math.floor(process.uptime()),
  //         timestamp: new Date(),
  //       },
  //     });
  //   }

  //   static startSystemMetricRecording() {
  //     this.systemMetricIntervalId = setInterval(
  //       this.recordSystemMetrics,
  //       this.SYSTEM_METRIC_INTERVAL
  //     );
  //   }

  //   static stopSystemMetricRecording() {
  //     clearInterval(this.systemMetricIntervalId);
  //   }
}
