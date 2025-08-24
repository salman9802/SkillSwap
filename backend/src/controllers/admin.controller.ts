import express from "express";
import { createAdminPayloadSchema } from "../schemas/admin.schema";
import adminService from "../services/admin.service";
import { STATUS_CODES } from "../constants/http";
import { sanitizeAdmin } from "../lib/sanitize";
import { appAssert } from "../lib/error";

export class AdminController {
  static async createAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // validate paylaod
    const payload = createAdminPayloadSchema.parse(req.body);

    // invoke service to create admin
    const createdAdmin = await adminService.createAccount(payload);

    res.status(STATUS_CODES.CREATED).json({
      admin: sanitizeAdmin(createdAdmin),
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

  static async overrideUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { userId } = req.params;

    const result = await adminService.overrideUserPassword(userId);

    res.status(STATUS_CODES.OK).json({
      result,
    });
  }
}
