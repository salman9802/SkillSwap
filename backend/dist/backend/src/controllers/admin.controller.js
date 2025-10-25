"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_schema_1 = require("../schemas/admin.schema");
const admin_service_1 = __importDefault(require("../services/admin.service"));
const http_1 = require("../constants/http");
const sanitize_1 = require("../lib/sanitize");
const error_1 = require("../lib/error");
const admin_1 = require("../constants/admin");
const error_2 = require("../constants/error");
const client_1 = __importDefault(require("../db/client"));
const monitoring_service_1 = require("../services/monitoring.service");
const bcrypt_1 = require("../lib/bcrypt");
class AdminController {
    static createAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = admin_schema_1.createAdminPayloadSchema.parse(Object.assign({}, req.body));
            const createdAdmin = yield admin_service_1.default.createAccount(payload);
            const session = yield admin_service_1.default.createOrUpdateSession(createdAdmin.id);
            const { accessToken, refreshToken } = admin_service_1.default.createAccessAndRefreshToken(session);
            admin_service_1.default
                .setAuthCookies(res, refreshToken)
                .status(http_1.STATUS_CODES.CREATED)
                .json({
                admin: (0, sanitize_1.sanitizeAdmin)(createdAdmin),
                accessToken,
            });
        });
    }
    static getAdmins(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield admin_service_1.default.getAdmins();
            res.status(http_1.STATUS_CODES.OK).json({
                admins,
            });
        });
    }
    static getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield admin_service_1.default.getUsers();
            res.status(http_1.STATUS_CODES.OK).json({
                users,
            });
        });
    }
    static deactivateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { adminId } = req.params;
            const result = yield admin_service_1.default.deactivateAccount(adminId);
            res.status(http_1.STATUS_CODES.OK).json({
                result,
            });
        });
    }
    static reactivateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { adminId } = req.params;
            const result = yield admin_service_1.default.reactivateAccount(adminId);
            res.status(http_1.STATUS_CODES.OK).json({
                result,
            });
        });
    }
    static deleteAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { adminId } = req.params;
            const admin = req.admin;
            (0, error_1.appAssert)(admin.id !== adminId, http_1.STATUS_CODES.CONFLICT);
            const result = yield admin_service_1.default.deleteAccount(adminId);
            res.status(http_1.STATUS_CODES.OK).json({
                result,
            });
        });
    }
    static overrideAdminPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { adminId } = req.params;
            const result = yield admin_service_1.default.overrideAdminPassword(adminId, req.body.newPassword);
            res.status(http_1.STATUS_CODES.OK).json({
                result,
            });
        });
    }
    static overrideUserPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const result = yield admin_service_1.default.overrideUserPassword(userId, req.body.newPassword);
            res.status(http_1.STATUS_CODES.OK).json({
                result,
            });
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = admin_schema_1.adminLoginPayloadSchema.parse(Object.assign({}, req.body));
            // find admin
            const admin = yield client_1.default.admin.findFirst({
                where: {
                    name: payload.name,
                },
                select: {
                    id: true,
                    name: true,
                    role: true,
                    password: true,
                },
            });
            (0, error_1.appAssert)(admin !== null, http_1.STATUS_CODES.BAD_REQUEST, "Invalid credentials");
            const hasValidPassword = yield (0, bcrypt_1.comparePassword)(payload.password, admin.password);
            (0, error_1.appAssert)(hasValidPassword, http_1.STATUS_CODES.UNAUTHORIZED, "Invalid credentials");
            // create session
            const session = yield admin_service_1.default.createOrUpdateSession(admin.id);
            // create tokens
            const { accessToken, refreshToken } = admin_service_1.default.createAccessAndRefreshToken(session);
            // set tokens as cookie
            admin_service_1.default
                .setAuthCookies(res, refreshToken)
                .status(http_1.STATUS_CODES.CREATED)
                .json({
                accessToken,
                adminId: admin.id,
                name: admin.name,
                isSuperAdmin: admin.role === "SUPERADMIN",
            });
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = req.admin;
            yield admin_service_1.default.deleteSession(admin.id);
            admin_service_1.default.unsetAuthCookies(res).status(http_1.STATUS_CODES.OK).end();
        });
    }
    static getAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.signedCookies[admin_1.ADMIN.REFRESH_TOKEN_COOKIE];
            (0, error_1.appAssert)(refreshToken, http_1.STATUS_CODES.UNAUTHORIZED, "Token not found");
            const refreshTokenPayload = admin_service_1.default.validateRefreshToken(refreshToken);
            (0, error_1.appAssert)(refreshTokenPayload !== false, http_1.STATUS_CODES.UNAUTHORIZED, "Refresh token expired", error_2.AppErrorCodes.REFRESH_TOKEN_EXPIRED);
            (0, error_1.appAssert)(refreshTokenPayload !== null, http_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong", error_2.AppErrorCodes.SERVER_ERROR);
            const session = yield client_1.default.adminSession.findFirst({
                where: {
                    id: refreshToken.id,
                },
            });
            (0, error_1.appAssert)(session !== null, http_1.STATUS_CODES.UNAUTHORIZED);
            const admin = yield client_1.default.admin.findFirst({
                where: {
                    id: session.adminId,
                },
                select: {
                    id: true,
                    name: true,
                    role: true,
                },
            });
            const accessToken = admin_service_1.default.createAccessToken(session);
            admin_service_1.default
                .setAuthCookies(res, refreshToken)
                .status(http_1.STATUS_CODES.CREATED)
                .json({
                accessToken,
                adminId: admin.id,
                name: admin.name,
                isSuperAdmin: admin.role === "SUPERADMIN",
            });
        });
    }
    static streamSystemMetrics(req, res, next) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        const interval = setInterval(() => {
            res.write(`data: ${JSON.stringify(monitoring_service_1.MonitoringService.getSystemMetrics())}\n\n`);
        }, 1000); // send every 1s
        req.on("close", () => clearInterval(interval));
    }
    static getLogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const params = logQueryParams.parse(req.params);
            const result = yield admin_service_1.default.getLogs(req);
            res.status(http_1.STATUS_CODES.OK).json(result);
        });
    }
    static getUserLogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const params = logQueryParams.parse(req.params);
            const result = yield admin_service_1.default.getUserLogs(req);
            res.status(http_1.STATUS_CODES.OK).json(result);
        });
    }
    static exportLogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = (_a = req.validated) === null || _a === void 0 ? void 0 : _a.query;
            let logs;
            if (query.format === "CSV") {
                logs = yield admin_service_1.default.getLogsInCSV(query);
                res.setHeader("Content-Type", "text/csv");
                res.setHeader("Content-Disposition", `attachment; filename="export.csv"`);
            }
            else {
                logs = yield admin_service_1.default.getLogsInJSON(query);
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Content-Disposition", `attachment; filename="export.json"`);
            }
            res.status(http_1.STATUS_CODES.OK).send(logs);
        });
    }
    static exportUserLogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = (_a = req.validated) === null || _a === void 0 ? void 0 : _a.query;
            let logs;
            if (query.format === "CSV") {
                logs = yield admin_service_1.default.getUserLogsInCSV(query);
                res.setHeader("Content-Type", "text/csv");
                res.setHeader("Content-Disposition", `attachment; filename="export.csv"`);
            }
            else {
                logs = yield admin_service_1.default.getUserLogsInJSON(query);
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Content-Disposition", `attachment; filename="export.json"`);
            }
            res.status(http_1.STATUS_CODES.OK).send(logs);
        });
    }
    static logReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield admin_service_1.default.logReport();
            res.status(http_1.STATUS_CODES.OK).json(result);
        });
    }
    static userLogReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield admin_service_1.default.userLogReport();
            res.status(http_1.STATUS_CODES.OK).json(result);
        });
    }
}
exports.AdminController = AdminController;
