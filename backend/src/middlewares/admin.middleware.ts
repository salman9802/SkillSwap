import express from "express";

import { Admin, AdminRole } from "../../generated/prisma";
import { appAssert } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import adminService from "../services/admin.service";
import { AdminAccessTokenJwtPayload } from "../types/express/admin";
import prisma from "../db/client";
import { sanitizeAdmin } from "../lib/sanitize";

export const requireAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  appAssert(accessToken, STATUS_CODES.UNAUTHORIZED, "Invalid token");

  const accessPayload = adminService.validateAccessToken(
    accessToken!
  ) as AdminAccessTokenJwtPayload;
  const admin = await prisma.admin.findFirst({
    where: {
      id: accessPayload.aid,
    },
  });
  appAssert(admin, STATUS_CODES.UNAUTHORIZED, "Unauthorized access");

  req.admin = sanitizeAdmin(admin!);
  next();
};

export const requireRole =
  (roles: AdminRole[]) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const admin = req.admin!;

    appAssert(roles.includes(admin.role), STATUS_CODES.FORBIDDEN);

    next();
  };
