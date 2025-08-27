import express from "express";
import { AdminController } from "../controllers/admin.controller";
import { requireAuth, requireRole } from "../middlewares/admin.middleware";
import { errorCatch } from "../lib/error";
import { adminMonitoring } from "../middlewares/monitoring.middleware";

const adminRouter = express.Router();

adminRouter.post(
  "/",
  errorCatch(requireAuth),
  errorCatch(requireRole(["SUPERADMIN"])),
  adminMonitoring({
    type: "admin.signup",
  }),
  errorCatch(AdminController.createAccount)
);
adminRouter.get(
  "/",
  errorCatch(requireAuth),
  adminMonitoring({
    type: "admin.fetchAll",
  }),
  errorCatch(AdminController.getAdmins)
);
adminRouter.put(
  "/deactivate/:adminId",
  errorCatch(requireAuth),
  adminMonitoring({
    type: "admin.fetchOne",
  }),
  errorCatch(AdminController.deactivateAccount)
);
adminRouter.put(
  "/reactivate/:adminId",
  errorCatch(requireAuth),
  adminMonitoring({
    type: "admin.reactivate",
  }),
  errorCatch(AdminController.reactivateAccount)
);
adminRouter.delete(
  "/:adminId",
  errorCatch(requireAuth),
  errorCatch(requireRole(["SUPERADMIN"])),
  adminMonitoring({
    type: "admin.delete",
  }),
  errorCatch(AdminController.deleteAccount)
);
adminRouter.put(
  "/override-password/:userId",
  errorCatch(requireAuth),
  errorCatch(requireRole(["SUPERADMIN"])),
  adminMonitoring({
    type: "admin.override-password",
  }),
  errorCatch(AdminController.overrideUserPassword)
);
adminRouter.post(
  "/auth/login",
  adminMonitoring({
    type: "admin.login",
  }),
  errorCatch(AdminController.login)
);
adminRouter.get(
  "/auth",
  errorCatch(requireAuth),
  adminMonitoring({
    type: "admin.auth",
  }),
  errorCatch(AdminController.getAuth)
);
adminRouter.delete(
  "/auth/logout",
  errorCatch(requireAuth),
  adminMonitoring({
    type: "admin.logout",
  }),
  errorCatch(AdminController.logout)
);
adminRouter.get(
  "/system-metrics",
  errorCatch(requireAuth),
  adminMonitoring({
    type: "admin.system-metrics",
  }),
  errorCatch(AdminController.streamSystemMetrics)
);
adminRouter.get(
  "/logs",
  errorCatch(requireAuth),
  errorCatch(requireRole(["SUPERADMIN"])),
  adminMonitoring({
    type: "admin.logs",
  }),
  errorCatch(AdminController.getLogs)
);

export default adminRouter;
