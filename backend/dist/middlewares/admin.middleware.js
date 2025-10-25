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
exports.requireRole = exports.requireRefreshToken = exports.requireAuth = void 0;
const error_1 = require("../lib/error");
const http_1 = require("../constants/http");
const admin_service_1 = __importDefault(require("../services/admin.service"));
const client_1 = __importDefault(require("../db/client"));
const sanitize_1 = require("../lib/sanitize");
const error_2 = require("../constants/error");
const admin_1 = require("../constants/admin");
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    (0, error_1.appAssert)(accessToken, http_1.STATUS_CODES.UNAUTHORIZED, "Invalid token");
    const accessPayload = admin_service_1.default.validateAccessToken(accessToken);
    (0, error_1.appAssert)(accessPayload !== false, http_1.STATUS_CODES.UNAUTHORIZED, "Access token expired", error_2.AppErrorCodes.ACCESS_TOKEN_EXPIRED);
    (0, error_1.appAssert)(accessPayload !== null, http_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Session does not exists", error_2.AppErrorCodes.SERVER_ERROR);
    const admin = yield client_1.default.admin.findFirst({
        where: {
            id: accessPayload.aid,
        },
    });
    (0, error_1.appAssert)(admin, http_1.STATUS_CODES.UNAUTHORIZED, "Unauthorized access");
    if (admin === null || admin === void 0 ? void 0 : admin.deactivated)
        req.metatdata.deactivatedAccount = true;
    (0, error_1.appAssert)(!(admin === null || admin === void 0 ? void 0 : admin.deactivated), http_1.STATUS_CODES.FORBIDDEN, "This account is not active. Please contact administrator.");
    req.admin = (0, sanitize_1.sanitizeAdmin)(admin);
    next();
});
exports.requireAuth = requireAuth;
const requireRefreshToken = (req, res, next) => {
    const refreshToken = req.signedCookies[admin_1.ADMIN.REFRESH_TOKEN_COOKIE];
    (0, error_1.appAssert)(refreshToken, http_1.STATUS_CODES.UNAUTHORIZED, "Token not found");
    const refreshTokenPayload = admin_service_1.default.validateRefreshToken(refreshToken);
    (0, error_1.appAssert)(refreshTokenPayload !== false, http_1.STATUS_CODES.UNAUTHORIZED, "Refresh token expired", error_2.AppErrorCodes.REFRESH_TOKEN_EXPIRED);
    (0, error_1.appAssert)(refreshTokenPayload !== null, http_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong", error_2.AppErrorCodes.SERVER_ERROR);
    next();
};
exports.requireRefreshToken = requireRefreshToken;
const requireRole = (roles) => (req, res, next) => {
    const admin = req.admin;
    (0, error_1.appAssert)(roles.includes(admin.role), http_1.STATUS_CODES.FORBIDDEN, "Unauthorized");
    next();
};
exports.requireRole = requireRole;
