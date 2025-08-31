// Arrow functions to ensure access to 'this'

import express from "express";
import jwt from "jsonwebtoken";

import prisma from "../db/client";
import { SafeAdmin, sanitizeAdmin } from "../lib/sanitize";
import {
  LogQueryParams,
  CreateAdminPayload,
  ExportLogSchema,
} from "../schemas/admin.schema";
import {
  AdminAccessTokenJwtPayload,
  AdminRefreshTokenJwtPayload,
} from "../types/express/admin";
import { ENV } from "../constants/env";
import { appAssert } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import { AppErrorCodes } from "../constants/error";
import { ADMIN } from "../constants/admin";
import { AdminSession } from "../../generated/prisma";

class AdminService {
  createAccount = async (data: CreateAdminPayload) => {
    return await prisma.admin.create({
      data,
    });
  };

  validateAccessToken = (accessToken: string) => {
    try {
      const accessPayload = jwt.verify(
        accessToken,
        ADMIN.ACCESS_TOKEN_SECRET
      ) as AdminAccessTokenJwtPayload;
      return accessPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) return false;
      else return null;
    }
  };

  getAdmins = async (): Promise<SafeAdmin[]> => {
    return (await prisma.admin.findMany())
      .map((admin) => sanitizeAdmin(admin))
      .filter((admin) => admin.role !== "SUPERADMIN");
  };

  deactivateAccount = async (adminId: string) => {
    return await prisma.admin.update({
      where: {
        id: adminId,
        NOT: {
          role: "SUPERADMIN",
        },
      },
      data: {
        deactivated: true,
      },
      select: {
        id: true,
      },
    });
  };

  reactivateAccount = async (adminId: string) => {
    return await prisma.admin.update({
      where: {
        id: adminId,
        NOT: {
          role: "SUPERADMIN",
        },
      },
      data: {
        deactivated: false,
      },
      select: {
        id: true,
      },
    });
  };

  deleteAccount = async (adminId: string) => {
    return await prisma.admin.update({
      where: { id: adminId },
      data: {
        deleted: true,
      },
      select: {
        id: true,
      },
    });
  };

  overrideUserPassword = async (userId: string, password = "password@1") => {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: password,
      },
      select: {
        id: true,
      },
    });
  };

  createOrUpdateSession = async (adminId: string) => {
    const existingSession = await prisma.adminSession.findFirst({
      where: {
        adminId,
      },
    });

    let session;
    if (existingSession === null) {
      // create new session
      session = await prisma.adminSession.create({
        data: {
          adminId,
          expiresAt: new Date(Date.now() + ADMIN.REFRESH_TOKEN_INTERVAL),
        },
      });
    } else {
      // upate existing session
      session = await prisma.adminSession.update({
        where: {
          id: existingSession.id,
        },
        data: {
          expiresAt: new Date(Date.now() + ADMIN.REFRESH_TOKEN_INTERVAL),
        },
      });
    }
    return session;
  };

  deleteSession = async (adminId: string) => {
    return await prisma.adminSession.delete({
      where: {
        adminId,
      },
    });
  };

  createAccessToken = (session: AdminSession) => {
    const accessToken = jwt.sign(
      {
        id: session.id,
        aid: session.adminId,
      },
      ADMIN.ACCESS_TOKEN_SECRET,
      {
        expiresIn: ADMIN.ACCESS_TOKEN_INTERVAL / 1000,
      }
    );
    return accessToken;
  };

  createAccessAndRefreshToken = (session: AdminSession) => {
    const refreshToken = jwt.sign(
      {
        id: session.id,
      },
      ADMIN.REFRESH_TOKEN_SECRET,
      {
        expiresIn: ADMIN.REFRESH_TOKEN_INTERVAL / 1000,
      }
    );

    const accessToken = this.createAccessToken(session);

    return { accessToken, refreshToken };
  };

  defaultCookieOptions: () => express.CookieOptions = () => ({
    // The reason for selecting `lax` is because `none` requires https
    // but `lax` does require 'same-site' requests (different from 'same-origin')
    //    same-origin = same protocol + domain + port
    //    same-site = same domain, even if different ports
    // sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
    sameSite: "none",
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    signed: true,
  });

  setAuthCookies = (res: express.Response, refreshToken: string) =>
    res.cookie(ADMIN.REFRESH_TOKEN_COOKIE, refreshToken, {
      ...this.defaultCookieOptions(),
      path: ADMIN.COOKIE_PATH,
      expires: new Date(Date.now() + ADMIN.REFRESH_TOKEN_INTERVAL),
    });

  unsetAuthCookies = (res: express.Response) =>
    res.clearCookie(ADMIN.REFRESH_TOKEN_COOKIE, {
      ...this.defaultCookieOptions(),
      path: ADMIN.COOKIE_PATH,
      expires: new Date(Date.now() + ADMIN.REFRESH_TOKEN_INTERVAL),
    });

  validateRefreshToken = (refreshToken: string) => {
    try {
      const refreshPayload = jwt.verify(
        refreshToken,
        ADMIN.REFRESH_TOKEN_SECRET
      ) as AdminRefreshTokenJwtPayload;
      return refreshPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) return false;
      else return null;
    }
  };

  getLogs = async (params: LogQueryParams) => {
    return await prisma.adminLog.findMany({
      skip: params.offset,
      take: params.limit,
    });
  };

  getUserLogs = async (params: LogQueryParams) => {
    return await prisma.userLog.findMany({
      skip: params.offset,
      take: params.limit,
    });
  };

  getLogsInCSV = async (query: ExportLogSchema["query"]) => {
    const adminLogs = await prisma.adminLog.findMany({
      where: {
        AND: [
          { timestamp: { gte: query.startDate } },
          { timestamp: { lte: query.endDate } },
        ],
      },
    });

    if (adminLogs.length === 0) return "";

    const header = Object.keys(adminLogs[0]).join(",") + "\n";
    const rows = adminLogs
      .map((log) => Object.values(log).join(","))
      .join("\n");

    return header + rows;
  };

  getLogsInJSON = async (query: ExportLogSchema["query"]) => {
    const adminLogs = await prisma.adminLog.findMany({
      where: {
        AND: [
          { timestamp: { gte: query.startDate } },
          { timestamp: { lte: query.endDate } },
        ],
      },
    });

    return adminLogs;
  };

  getUserLogsInCSV = async (query: ExportLogSchema["query"]) => {
    const userLogs = await prisma.userLog.findMany({
      where: {
        AND: [
          { timestamp: { gte: query.startDate } },
          { timestamp: { lte: query.endDate } },
        ],
      },
    });

    if (userLogs.length === 0) return "";

    const header = Object.keys(userLogs[0]).join(",") + "\n";
    const rows = userLogs.map((log) => Object.values(log).join(",")).join("\n");

    return header + rows;
  };

  getUserLogsInJSON = async (query: ExportLogSchema["query"]) => {
    const userLogs = await prisma.userLog.findMany({
      where: {
        AND: [
          { timestamp: { gte: query.startDate } },
          { timestamp: { lte: query.endDate } },
        ],
      },
    });

    return userLogs;
  };

  logReport = async () => {
    const typeLogs: Record<string, number> = {};
    (
      await prisma.adminLog.groupBy({
        by: ["type"],
        _count: {
          // _all: true,
          type: true,
        },
        orderBy: {
          _count: {
            type: "desc",
          },
        },
      })
    ).forEach((o) => {
      typeLogs[o.type] = o._count.type;
    });

    // timeline of events
    // Get logs grouped by hour (or convert date string to your granularity)
    // const timeline = await prisma.adminLog.groupBy({
    //   by: ["timestamp"],
    //   _count: { _all: true },
    //   orderBy: { timestamp: "asc" },
    // });
    // Use JS/TS code to group by hour or day as needed

    // Fetch only login and auth events, sorted by time
    // const authLogs = await prisma.adminLog.findMany({
    //   where: {
    //     OR: [{ type: "admin.auth" }, { type: "admin.login" }],
    //   },
    //   orderBy: { timestamp: "desc" },
    // });

    const routeLogs: Record<string, number> = {};
    (
      await prisma.adminLog.groupBy({
        by: ["route"],
        _count: {
          // _all: true,
          route: true,
        },
        orderBy: {
          _count: {
            route: "desc",
          },
        },
      })
    ).forEach((o) => {
      routeLogs[o.route] = o._count.route;
    });
    // Output: [{ route: '/logs', _count: { _all: 16 } }, ...]

    /*
    // Find time windows with > N log entries (example: per minute)
    const burstWindows = await prisma.log.groupBy({
      by: [{ timestamp: true }], // Group by minute if desired
      _count: { _all: true },
      having: { _count: { _all: { gt: 10 } } }, // N = 10 as threshold
      orderBy: { timestamp: 'asc' }
    });
    */

    return {
      typeLogs,
      // authLogs,
      routeLogs,
    };
  };

  userLogReport = async () => {
    const typeLogs: Record<string, number> = {};
    (
      await prisma.userLog.groupBy({
        by: ["type"],
        _count: {
          // _all: true,
          type: true,
        },
        orderBy: {
          _count: {
            type: "desc",
          },
        },
      })
    ).forEach((o) => {
      typeLogs[o.type] = o._count.type;
    });

    const routeLogs: Record<string, number> = {};
    (
      await prisma.userLog.groupBy({
        by: ["route"],
        _count: {
          // _all: true,
          route: true,
        },
        orderBy: {
          _count: {
            route: "desc",
          },
        },
      })
    ).forEach((o) => {
      routeLogs[o.route] = o._count.route;
    });

    return {
      typeLogs,
      routeLogs,
    };
  };
}

export default new AdminService();
