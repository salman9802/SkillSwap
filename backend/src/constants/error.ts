/**
 * @typedef {Object} AppErrorCodes
 * @property {'AppError'} APP_ERROR - General application error.
 * @property {'ServerError'} SERVER_ERROR - Server-related error.
 * @property {'RefreshTokenExpired'} REFRESH_TOKEN_EXPIRED - Error indicating that the refresh token has expired.
 * @property {'AccessTokenExpired'} ACCESS_TOKEN_EXPIRED - Error indicating that the access token has expired.
 */

/**
 * Constant object containing the app error codes.
 * @type {AppErrorCodes}
 */

export const AppErrorCodes = {
  APP_ERROR: "AppError",
  SERVER_ERROR: "ServerError",
  REFRESH_TOKEN_EXPIRED: "RefreshTokenExpired",
  ACCESS_TOKEN_EXPIRED: "AccessTokenExpired",
} as const;

export type AppErrorCodeType =
  (typeof AppErrorCodes)[keyof typeof AppErrorCodes];
