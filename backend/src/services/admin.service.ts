// Arrow functions to ensure access to 'this'

import express from "express";
import jwt from "jsonwebtoken";

import prisma from "../db/client";
import { SafeAdmin, sanitizeAdmin } from "../lib/sanitize";
import {
  AdminLogQueryParams,
  CreateAdminPayload,
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
      where: { id: adminId },
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
      where: { id: adminId },
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

  getLogs = async (params: AdminLogQueryParams) => {
    return await prisma.adminLog.findMany({
      skip: params.offset,
      take: params.limit,
    });
  };
}

export default new AdminService();
