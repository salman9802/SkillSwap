"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const error_1 = require("../lib/error");
const monitoring_middleware_1 = require("../middlewares/monitoring.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const admin_schema_1 = require("../schemas/admin.schema");
const pagination_middleware_1 = require("../middlewares/pagination.middleware");
const adminRouter = express_1.default.Router();
adminRouter.post("/", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, error_1.errorCatch)((0, admin_middleware_1.requireRole)(["SUPERADMIN"])), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.signup",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.createAccount));
adminRouter.get("/", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.fetchAll",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.getAdmins));
adminRouter.get("/users", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.fetchAllUsers",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.getUsers));
adminRouter.put("/deactivate/:adminId", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.deactivate",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.deactivateAccount));
adminRouter.put("/activate/:adminId", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.activate",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.reactivateAccount));
adminRouter.delete("/:adminId", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, error_1.errorCatch)((0, admin_middleware_1.requireRole)(["SUPERADMIN"])), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.delete",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.deleteAccount));
adminRouter.put("/override-admin-password/:adminId", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, error_1.errorCatch)((0, admin_middleware_1.requireRole)(["SUPERADMIN"])), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.override-admin-password",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.overrideAdminPassword));
adminRouter.put("/override-password/:userId", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, error_1.errorCatch)((0, admin_middleware_1.requireRole)(["SUPERADMIN"])), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.override-password",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.overrideUserPassword));
adminRouter.post("/auth/login", (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.login",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.login));
adminRouter.get("/auth", (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.auth",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.getAuth));
adminRouter.delete("/auth/logout", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.logout",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.logout));
adminRouter.get("/system-metrics", (0, error_1.errorCatch)(admin_middleware_1.requireRefreshToken), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.system-metrics",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.streamSystemMetrics));
adminRouter.get("/logs", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, error_1.errorCatch)((0, admin_middleware_1.requireRole)(["SUPERADMIN"])), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.logs",
}), (0, pagination_middleware_1.pagination)(), (0, error_1.errorCatch)(admin_controller_1.AdminController.getLogs));
adminRouter.get("/user-logs", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.user-logs",
}), (0, pagination_middleware_1.pagination)(), (0, error_1.errorCatch)(admin_controller_1.AdminController.getUserLogs));
adminRouter.get("/logs/export", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, error_1.errorCatch)((0, admin_middleware_1.requireRole)(["SUPERADMIN"])), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.export-logs",
}), (0, validator_middleware_1.validateRequest)(admin_schema_1.exportLogSchema), (0, error_1.errorCatch)(admin_controller_1.AdminController.exportLogs));
adminRouter.get("/user-logs/export", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.export-user-logs",
}), (0, validator_middleware_1.validateRequest)(admin_schema_1.exportLogSchema), (0, error_1.errorCatch)(admin_controller_1.AdminController.exportUserLogs));
adminRouter.get("/logs/report", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, error_1.errorCatch)((0, admin_middleware_1.requireRole)(["SUPERADMIN"])), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.log-report",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.logReport));
adminRouter.get("/user-logs/report", (0, error_1.errorCatch)(admin_middleware_1.requireAuth), (0, monitoring_middleware_1.adminMonitoring)({
    type: "admin.user-log-report",
}), (0, error_1.errorCatch)(admin_controller_1.AdminController.userLogReport));
exports.default = adminRouter;
