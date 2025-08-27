import os from "os";

import { AdminLog, Prisma } from "../../generated/prisma";

import prisma from "../db/client";
import { BatchQueue } from "../lib/queue";

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
    return {
      cpuUsage: os.loadavg()[0], // 1-min avg
      memoryUsage: process.memoryUsage().rss / 1024 / 1024,
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
