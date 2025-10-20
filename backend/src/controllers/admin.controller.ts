import express from "express";

import {
  adminLoginPayloadSchema,
  logQueryParams,
  createAdminPayloadSchema,
  ExportLogSchema,
} from "../schemas/admin.schema";
import adminService from "../services/admin.service";
import { STATUS_CODES } from "../constants/http";
import { sanitizeAdmin } from "../lib/sanitize";
import { appAssert } from "../lib/error";
import { ADMIN } from "../constants/admin";
import { AppErrorCodes } from "../constants/error";
import prisma from "../db/client";
import { RefreshTokenJwtPayload } from "../types/express/auth";
import { MonitoringService } from "../services/monitoring.service";
import { comparePassword, hashPassword } from "../lib/bcrypt";

export class AdminController {
  static async createAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const payload = createAdminPayloadSchema.parse({ ...req.body });

    const createdAdmin = await adminService.createAccount(payload);
    const session = await adminService.createOrUpdateSession(createdAdmin.id);

    const { accessToken, refreshToken } =
      adminService.createAccessAndRefreshToken(session);

    adminService
      .setAuthCookies(res, refreshToken)
      .status(STATUS_CODES.CREATED)
      .json({
        admin: sanitizeAdmin(createdAdmin),
        accessToken,
      });
  }

  static async getAdmins(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const admins = await adminService.getAdmins();
    res.status(STATUS_CODES.OK).json({
      admins,
    });
  }

  static async getUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const users = await adminService.getUsers();
    res.status(STATUS_CODES.OK).json({
      users,
    });
  }

  static async deactivateAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { adminId } = req.params;

    const result = await adminService.deactivateAccount(adminId);

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }

  static async reactivateAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { adminId } = req.params;

    const result = await adminService.reactivateAccount(adminId);

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }

  static async deleteAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { adminId } = req.params;
    const admin = req.admin!;

    appAssert(admin.id !== adminId, STATUS_CODES.CONFLICT);

    const result = await adminService.deleteAccount(adminId);

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }

  static async overrideAdminPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { adminId } = req.params;

    const result = await adminService.overrideAdminPassword(
      adminId,
      req.body.newPassword
    );

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }

  static async overrideUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { userId } = req.params;

    const result = await adminService.overrideUserPassword(
      userId,
      req.body.newPassword
    );

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }

  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const payload = adminLoginPayloadSchema.parse({ ...req.body });

    // find admin
    const admin = await prisma.admin.findFirst({
      where: {
        name: payload.name,
      },
      select: {
        id: true,
        name: true,
        role: true,
        password: true,
      },
    });
    appAssert(admin !== null, STATUS_CODES.BAD_REQUEST, "Invalid credentials");

    const hasValidPassword = await comparePassword(
      payload.password,
      admin!.password
    );
    appAssert(
      hasValidPassword,
      STATUS_CODES.UNAUTHORIZED,
      "Invalid credentials"
    );

    // create session
    const session = await adminService.createOrUpdateSession(admin!.id);

    // create tokens
    const { accessToken, refreshToken } =
      adminService.createAccessAndRefreshToken(session);

    // set tokens as cookie
    adminService
      .setAuthCookies(res, refreshToken)
      .status(STATUS_CODES.CREATED)
      .json({
        accessToken,
        adminId: admin!.id,
        name: admin!.name,
        isSuperAdmin: admin!.role === "SUPERADMIN",
      });
  }

  static async logout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const admin = req.admin!;

    await adminService.deleteSession(admin.id);

    adminService.unsetAuthCookies(res).status(STATUS_CODES.OK).end();
  }

  static async getAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const refreshToken = req.signedCookies[ADMIN.REFRESH_TOKEN_COOKIE];
    appAssert(refreshToken, STATUS_CODES.UNAUTHORIZED, "Token not found");

    const refreshTokenPayload = adminService.validateRefreshToken(refreshToken);
    appAssert(
      refreshTokenPayload !== false,
      STATUS_CODES.UNAUTHORIZED,
      "Refresh token expired",
      AppErrorCodes.REFRESH_TOKEN_EXPIRED
    );
    appAssert(
      refreshTokenPayload !== null,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Something went wrong",
      AppErrorCodes.SERVER_ERROR
    );

    const session = await prisma.adminSession.findFirst({
      where: {
        id: (refreshToken as RefreshTokenJwtPayload).id,
      },
    });
    appAssert(session !== null, STATUS_CODES.UNAUTHORIZED);

    const admin = await prisma.admin.findFirst({
      where: {
        id: session!.adminId,
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    const accessToken = adminService.createAccessToken(session!);

    adminService
      .setAuthCookies(res, refreshToken)
      .status(STATUS_CODES.CREATED)
      .json({
        accessToken,
        adminId: admin!.id,
        name: admin!.name,
        isSuperAdmin: admin!.role === "SUPERADMIN",
      });
  }

  static streamSystemMetrics(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const interval = setInterval(() => {
      res.write(
        `data: ${JSON.stringify(MonitoringService.getSystemMetrics())}\n\n`
      );
    }, 1000); // send every 1s

    req.on("close", () => clearInterval(interval));
  }

  static async getLogs(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // const params = logQueryParams.parse(req.params);

    const result = await adminService.getLogs(req);

    res.status(STATUS_CODES.OK).json(result);
  }

  static async getUserLogs(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // const params = logQueryParams.parse(req.params);

    const result = await adminService.getUserLogs(req);

    res.status(STATUS_CODES.OK).json(result);
  }

  static async exportLogs(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const query = req.validated?.query as ExportLogSchema["query"];

    let logs;
    if (query.format === "CSV") {
      logs = await adminService.getLogsInCSV(query);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="export.csv"`);
    } else {
      logs = await adminService.getLogsInJSON(query);
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="export.json"`
      );
    }

    res.status(STATUS_CODES.OK).send(logs);
  }

  static async exportUserLogs(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const query = req.validated?.query as ExportLogSchema["query"];

    let logs;
    if (query.format === "CSV") {
      logs = await adminService.getUserLogsInCSV(query);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="export.csv"`);
    } else {
      logs = await adminService.getUserLogsInJSON(query);
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="export.json"`
      );
    }

    res.status(STATUS_CODES.OK).send(logs);
  }

  static async logReport(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const result = await adminService.logReport();

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }

  static async userLogReport(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const result = await adminService.userLogReport();

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }
}
