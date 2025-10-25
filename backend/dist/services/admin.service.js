"use strict";
// Arrow functions to ensure access to 'this'
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../db/client"));
const sanitize_1 = require("../lib/sanitize");
const env_1 = require("../constants/env");
const admin_1 = require("../constants/admin");
class AdminService {
    constructor() {
        this.createAccount = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.admin.create({
                data,
            });
        });
        this.validateAccessToken = (accessToken) => {
            try {
                const accessPayload = jsonwebtoken_1.default.verify(accessToken, admin_1.ADMIN.ACCESS_TOKEN_SECRET);
                return accessPayload;
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError)
                    return false;
                else
                    return null;
            }
        };
        this.getAdmins = () => __awaiter(this, void 0, void 0, function* () {
            return (yield client_1.default.admin.findMany())
                .map((admin) => (0, sanitize_1.sanitizeAdmin)(admin))
                .filter((admin) => admin.role !== "SUPERADMIN");
        });
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            return (yield client_1.default.user.findMany()).map((user) => (0, sanitize_1.sanitizeUser)(user));
        });
        this.deactivateAccount = (adminId) => __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.admin.update({
                where: {
                    id: adminId,
                    NOT: {
                        role: "SUPERADMIN",
                    },
                },
                data: {
                    deactivated: true,
                },
                select: {
                    id: true,
                },
            });
        });
        this.reactivateAccount = (adminId) => __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.admin.update({
                where: {
                    id: adminId,
                    NOT: {
                        role: "SUPERADMIN",
                    },
                },
                data: {
                    deactivated: false,
                },
                select: {
                    id: true,
                },
            });
        });
        this.deleteAccount = (adminId) => __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.admin.update({
                where: { id: adminId },
                data: {
                    deleted: true,
                },
                select: {
                    id: true,
                },
            });
        });
        this.overrideAdminPassword = (adminId_1, ...args_1) => __awaiter(this, [adminId_1, ...args_1], void 0, function* (adminId, password = "password@1") {
            return yield client_1.default.admin.update({
                where: { id: adminId },
                data: {
                    password: password,
                },
                select: {
                    id: true,
                },
            });
        });
        this.overrideUserPassword = (userId_1, ...args_1) => __awaiter(this, [userId_1, ...args_1], void 0, function* (userId, password = "password@1") {
            return yield client_1.default.user.update({
                where: { id: userId },
                data: {
                    password: password,
                },
                select: {
                    id: true,
                },
            });
        });
        this.createOrUpdateSession = (adminId) => __awaiter(this, void 0, void 0, function* () {
            const existingSession = yield client_1.default.adminSession.findFirst({
                where: {
                    adminId,
                },
            });
            let session;
            if (existingSession === null) {
                // create new session
                session = yield client_1.default.adminSession.create({
                    data: {
                        adminId,
                        expiresAt: new Date(Date.now() + admin_1.ADMIN.REFRESH_TOKEN_INTERVAL),
                    },
                });
            }
            else {
                // upate existing session
                session = yield client_1.default.adminSession.update({
                    where: {
                        id: existingSession.id,
                    },
                    data: {
                        expiresAt: new Date(Date.now() + admin_1.ADMIN.REFRESH_TOKEN_INTERVAL),
                    },
                });
            }
            return session;
        });
        this.deleteSession = (adminId) => __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.adminSession.delete({
                where: {
                    adminId,
                },
            });
        });
        this.createAccessToken = (session) => {
            const accessToken = jsonwebtoken_1.default.sign({
                id: session.id,
                aid: session.adminId,
            }, admin_1.ADMIN.ACCESS_TOKEN_SECRET, {
                expiresIn: admin_1.ADMIN.ACCESS_TOKEN_INTERVAL / 1000,
            });
            return accessToken;
        };
        this.createAccessAndRefreshToken = (session) => {
            const refreshToken = jsonwebtoken_1.default.sign({
                id: session.id,
            }, admin_1.ADMIN.REFRESH_TOKEN_SECRET, {
                expiresIn: admin_1.ADMIN.REFRESH_TOKEN_INTERVAL / 1000,
            });
            const accessToken = this.createAccessToken(session);
            return { accessToken, refreshToken };
        };
        this.defaultCookieOptions = () => ({
            // The reason for selecting `lax` is because `none` requires https
            // but `lax` does require 'same-site' requests (different from 'same-origin')
            //    same-origin = same protocol + domain + port
            //    same-site = same domain, even if different ports
            // sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
            sameSite: env_1.ENV.NODE_ENV !== "production" ? "lax" : "none",
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === "production",
            signed: true,
        });
        this.setAuthCookies = (res, refreshToken) => {
            admin_1.ADMIN.COOKIE_PATHS.map((path) => {
                res.cookie(admin_1.ADMIN.REFRESH_TOKEN_COOKIE, refreshToken, Object.assign(Object.assign({}, this.defaultCookieOptions()), { path: path, expires: new Date(Date.now() + admin_1.ADMIN.REFRESH_TOKEN_INTERVAL) }));
            });
            return res;
        };
        this.unsetAuthCookies = (res) => {
            admin_1.ADMIN.COOKIE_PATHS.map((path) => {
                res.clearCookie(admin_1.ADMIN.REFRESH_TOKEN_COOKIE, Object.assign(Object.assign({}, this.defaultCookieOptions()), { path: path, expires: new Date(Date.now() + admin_1.ADMIN.REFRESH_TOKEN_INTERVAL) }));
            });
            return res;
        };
        this.validateRefreshToken = (refreshToken) => {
            try {
                const refreshPayload = jsonwebtoken_1.default.verify(refreshToken, admin_1.ADMIN.REFRESH_TOKEN_SECRET);
                return refreshPayload;
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError)
                    return false;
                else
                    return null;
            }
        };
        this.getLogs = (req) => __awaiter(this, void 0, void 0, function* () {
            const [logs, total] = yield Promise.all([
                client_1.default.adminLog.findMany({
                    skip: req.pagination.skip,
                    take: req.pagination.limit,
                    orderBy: {
                        timestamp: "desc",
                    },
                    select: {
                        id: true,
                        type: true,
                        route: true,
                        metadata: true,
                        timestamp: true,
                        adminId: true,
                        admin: {
                            select: {
                                name: true,
                            },
                        },
                    },
                }),
                client_1.default.adminLog.count({
                    skip: req.pagination.skip,
                    take: req.pagination.limit,
                }),
            ]);
            return { logs, total };
        });
        this.getUserLogs = (req) => __awaiter(this, void 0, void 0, function* () {
            const [logs, total] = yield Promise.all([
                client_1.default.userLog.findMany({
                    skip: req.pagination.skip,
                    take: req.pagination.limit,
                    orderBy: {
                        timestamp: "desc",
                    },
                    select: {
                        id: true,
                        type: true,
                        route: true,
                        metadata: true,
                        timestamp: true,
                        userId: true,
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                }),
                client_1.default.userLog.count({
                    skip: req.pagination.skip,
                    take: req.pagination.limit,
                }),
            ]);
            return { logs, total };
        });
        this.getLogsInCSV = (query) => __awaiter(this, void 0, void 0, function* () {
            const adminLogs = yield client_1.default.adminLog.findMany({
                where: {
                    AND: [
                        { timestamp: { gte: query.startDate } },
                        { timestamp: { lte: query.endDate } },
                    ],
                },
            });
            if (adminLogs.length === 0)
                return "";
            const header = Object.keys(adminLogs[0]).join(",") + "\n";
            const rows = adminLogs
                .map((log) => Object.values(log).join(","))
                .join("\n");
            return header + rows;
        });
        this.getLogsInJSON = (query) => __awaiter(this, void 0, void 0, function* () {
            const adminLogs = yield client_1.default.adminLog.findMany({
                where: {
                    AND: [
                        { timestamp: { gte: query.startDate } },
                        { timestamp: { lte: query.endDate } },
                    ],
                },
            });
            return adminLogs;
        });
        this.getUserLogsInCSV = (query) => __awaiter(this, void 0, void 0, function* () {
            const userLogs = yield client_1.default.userLog.findMany({
                where: {
                    AND: [
                        { timestamp: { gte: query.startDate } },
                        { timestamp: { lte: query.endDate } },
                    ],
                },
            });
            if (userLogs.length === 0)
                return "";
            const header = Object.keys(userLogs[0]).join(",") + "\n";
            const rows = userLogs.map((log) => Object.values(log).join(",")).join("\n");
            return header + rows;
        });
        this.getUserLogsInJSON = (query) => __awaiter(this, void 0, void 0, function* () {
            const userLogs = yield client_1.default.userLog.findMany({
                where: {
                    AND: [
                        { timestamp: { gte: query.startDate } },
                        { timestamp: { lte: query.endDate } },
                    ],
                },
            });
            return userLogs;
        });
        this.logReport = () => __awaiter(this, void 0, void 0, function* () {
            const typeLogs = {};
            (yield client_1.default.adminLog.groupBy({
                by: ["type"],
                _count: {
                    // _all: true,
                    type: true,
                },
                orderBy: {
                    _count: {
                        type: "desc",
                    },
                },
            })).forEach((o) => {
                typeLogs[o.type] = o._count.type;
            });
            // timeline of events
            // Get logs grouped by hour (or convert date string to your granularity)
            // const timeline = await prisma.adminLog.groupBy({
            //   by: ["timestamp"],
            //   _count: { _all: true },
            //   orderBy: { timestamp: "asc" },
            // });
            // Use JS/TS code to group by hour or day as needed
            // Fetch only login and auth events, sorted by time
            // const authLogs = await prisma.adminLog.findMany({
            //   where: {
            //     OR: [{ type: "admin.auth" }, { type: "admin.login" }],
            //   },
            //   orderBy: { timestamp: "desc" },
            // });
            const routeLogs = {};
            (yield client_1.default.adminLog.groupBy({
                by: ["route"],
                _count: {
                    // _all: true,
                    route: true,
                },
                orderBy: {
                    _count: {
                        route: "desc",
                    },
                },
            })).forEach((o) => {
                routeLogs[o.route] = o._count.route;
            });
            // Output: [{ route: '/logs', _count: { _all: 16 } }, ...]
            /*
            // Find time windows with > N log entries (example: per minute)
            const burstWindows = await prisma.log.groupBy({
              by: [{ timestamp: true }], // Group by minute if desired
              _count: { _all: true },
              having: { _count: { _all: { gt: 10 } } }, // N = 10 as threshold
              orderBy: { timestamp: 'asc' }
            });
            */
            return {
                typeLogs,
                // authLogs,
                routeLogs,
            };
        });
        this.userLogReport = () => __awaiter(this, void 0, void 0, function* () {
            const typeLogs = {};
            (yield client_1.default.userLog.groupBy({
                by: ["type"],
                _count: {
                    // _all: true,
                    type: true,
                },
                orderBy: {
                    _count: {
                        type: "desc",
                    },
                },
            })).forEach((o) => {
                typeLogs[o.type] = o._count.type;
            });
            const routeLogs = {};
            (yield client_1.default.userLog.groupBy({
                by: ["route"],
                _count: {
                    // _all: true,
                    route: true,
                },
                orderBy: {
                    _count: {
                        route: "desc",
                    },
                },
            })).forEach((o) => {
                routeLogs[o.route] = o._count.route;
            });
            return {
                typeLogs,
                routeLogs,
            };
        });
    }
}
exports.default = new AdminService();
