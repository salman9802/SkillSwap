import express from "express";
import { MonitoringService } from "../services/monitoring.service";
import { AdminLog, Prisma, SystemMetric } from "../../generated/prisma";

export const responseMonitoring = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const startTime = process.hrtime.bigint();

  res.on("finish", () => {
    MonitoringService.recordResponseLog({
      method: req.method,
      route: req.route?.path || req.originalUrl || req.path || "/unknown",
      statusCode: res.statusCode,
      responseTimeMs: Number(
        (process.hrtime.bigint() - startTime) / BigInt(1e9)
      ),
      userAgent: req.get("user-agent"),
      //   ip: req.headers["x-forwarded-for"] || req.ips,
      ip: req.ips,
    });
  });

  next();
};

export const adminMonitoring =
  (
    log: Partial<Omit<Prisma.AdminLogCreateManyInput, "type">> &
      Pick<Prisma.AdminLogCreateManyInput, "type"> // Combines partial of type other than required and only required type
  ) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const admin = req.admin;

    res.on("finish", () => {
      MonitoringService.recordAdminLog({
        ...{ adminId: admin?.id || null, type: "unknown" },
        route: req.route?.path || req.originalUrl || req.path || "/unknown",
        ...log,
      });
    });

    next();
  };
