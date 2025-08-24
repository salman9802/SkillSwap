import express from "express";
import { AdminController } from "../controllers/admin.controller";
import { requireAuth, requireRole } from "../middlewares/admin.middleware";

const adminRouter = express.Router();

adminRouter.post(
  "/",
  requireAuth,
  requireRole(["SUPERADMIN"]),
  AdminController.createAccount
);
adminRouter.get("/", requireAuth, AdminController.getAdmins);
adminRouter.put(
  "/deactivate/:adminId",
  requireAuth,
  AdminController.deactivateAccount
);
adminRouter.put(
  "/reactivate/:adminId",
  requireAuth,
  AdminController.reactivateAccount
);
adminRouter.delete(
  "/:adminId",
  requireAuth,
  requireRole(["SUPERADMIN"]),
  AdminController.deleteAccount
);
adminRouter.put(
  "/override-password/:userId",
  requireAuth,
  requireRole(["SUPERADMIN"]),
  AdminController.overrideUserPassword
);

export default adminRouter;
