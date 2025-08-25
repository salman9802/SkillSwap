import express from "express";
import { AdminController } from "../controllers/admin.controller";
import { requireAuth, requireRole } from "../middlewares/admin.middleware";
import { errorCatch } from "../lib/error";

const adminRouter = express.Router();

adminRouter.post(
  "/",
  // errorCatch(requireAuth),
  // errorCatch(requireRole(["SUPERADMIN"])),
  errorCatch(AdminController.createAccount)
);
adminRouter.get(
  "/",
  errorCatch(requireAuth),
  errorCatch(AdminController.getAdmins)
);
adminRouter.put(
  "/deactivate/:adminId",
  errorCatch(requireAuth),
  errorCatch(AdminController.deactivateAccount)
);
adminRouter.put(
  "/reactivate/:adminId",
  errorCatch(requireAuth),
  errorCatch(AdminController.reactivateAccount)
);
adminRouter.delete(
  "/:adminId",
  errorCatch(requireAuth),
  errorCatch(requireRole(["SUPERADMIN"])),
  errorCatch(AdminController.deleteAccount)
);
adminRouter.put(
  "/override-password/:userId",
  errorCatch(requireAuth),
  errorCatch(requireRole(["SUPERADMIN"])),
  errorCatch(AdminController.overrideUserPassword)
);
adminRouter.post("/auth/login", errorCatch(AdminController.login));
adminRouter.get(
  "/auth",
  errorCatch(requireAuth),
  errorCatch(AdminController.getAuth)
);
adminRouter.delete(
  "/auth/logout",
  errorCatch(requireAuth),
  errorCatch(AdminController.logout)
);

export default adminRouter;
