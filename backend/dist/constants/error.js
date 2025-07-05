"use strict";
/**
 * @typedef {Object} AppErrorCodes
 * @property {'AppError'} APP_ERROR - General application error.
 * @property {'ServerError'} SERVER_ERROR - Server-related error.
 * @property {'RefreshTokenExpired'} REFRESH_TOKEN_EXPIRED - Error indicating that the refresh token has expired.
 * @property {'AccessTokenExpired'} ACCESS_TOKEN_EXPIRED - Error indicating that the access token has expired.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorCodes = void 0;
/**
 * Constant object containing the app error codes.
 * @type {AppErrorCodes}
 */
exports.AppErrorCodes = {
    APP_ERROR: "AppError",
    SERVER_ERROR: "ServerError",
    REFRESH_TOKEN_EXPIRED: "RefreshTokenExpired",
    ACCESS_TOKEN_EXPIRED: "AccessTokenExpired",
    SESSION_CLOSED: "SessionClosed",
    SESSION_REJECTED: "SessionRejected",
};
