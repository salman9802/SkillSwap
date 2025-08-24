// Arrow functions to ensure access to 'this'

import jwt from "jsonwebtoken";

import prisma from "../db/client";
import { SafeAdmin, sanitizeAdmin } from "../lib/sanitize";
import { CreateAdminPayload } from "../schemas/admin.schema";
import { AdminAccessTokenJwtPayload } from "../types/express/admin";
import { ENV } from "../constants/env";
import { appAssert } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import { AppErrorCodes } from "../constants/error";

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
        ENV.ACCESS_TOKEN_SECRET
      ) as AdminAccessTokenJwtPayload;
      return accessPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError)
        appAssert(
          false,
          STATUS_CODES.UNAUTHORIZED,
          "Access token expired",
          AppErrorCodes.ACCESS_TOKEN_EXPIRED
        );
      else
        appAssert(
          false,
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "Something went wrong",
          AppErrorCodes.SERVER_ERROR
        );
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
}

export default new AdminService();
