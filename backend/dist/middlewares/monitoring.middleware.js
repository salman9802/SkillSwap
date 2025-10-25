"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMonitoring = exports.adminMonitoring = exports.responseMonitoring = void 0;
const monitoring_service_1 = require("../services/monitoring.service");
const responseMonitoring = (req, res, next) => {
    const startTime = process.hrtime.bigint();
    res.on("finish", () => {
        var _a;
        monitoring_service_1.MonitoringService.recordResponseLog({
            method: req.method,
            route: ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || req.originalUrl || req.path || "/unknown",
            statusCode: res.statusCode,
            responseTimeMs: Number((process.hrtime.bigint() - startTime) / BigInt(1e9)),
            userAgent: req.get("user-agent"),
            //   ip: req.headers["x-forwarded-for"] || req.ips,
            ip: req.ips,
        });
    });
    next();
};
exports.responseMonitoring = responseMonitoring;
const adminMonitoring = (log // Combines partial of type other than required and only required type
) => (req, res, next) => {
    const admin = req.admin;
    res.on("finish", () => {
        var _a;
        monitoring_service_1.MonitoringService.recordAdminLog(Object.assign(Object.assign({ adminId: (admin === null || admin === void 0 ? void 0 : admin.id) || null, type: "unknown" }, { route: ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || req.originalUrl || req.path || "/unknown", metadata: req.metatdata }), log));
    });
    next();
};
exports.adminMonitoring = adminMonitoring;
const userMonitoring = (log // Combines partial of type other than required and only required type
) => (req, res, next) => {
    const user = req.user;
    res.on("finish", () => {
        var _a;
        monitoring_service_1.MonitoringService.recordUserLog(Object.assign(Object.assign({ userId: (user === null || user === void 0 ? void 0 : user.id) || null, type: "unknown" }, { route: ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || req.originalUrl || req.path || "/unknown" }), log));
    });
    next();
};
exports.userMonitoring = userMonitoring;
