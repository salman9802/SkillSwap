"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetAuthCookies = exports.setAuthCookies = void 0;
const env_1 = require("../constants/env");
const defaultCookieOptions = () => ({
    // The reason for selecting `lax` is because `none` requires https
    // but `lax` does require 'same-site' requests (different from 'same-origin')
    //    same-origin = same protocol + domain + port
    //    same-site = same domain, even if different ports
    // sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
    sameSite: "none",
    httpOnly: true,
    secure: env_1.ENV.NODE_ENV === "production",
    signed: true,
});
const setAuthCookies = ({ res, 
//   accessToken,
refreshToken, }) => 
// .cookie(ENV.ACCESS_TOKEN_COOKIE as string, accessToken, {
//     ...defaultCookieOptions,
//     expires: new Date(Date.now() + (ENV.ACCESS_TOKEN_INTERVAL as number))
// })
res.cookie(env_1.ENV.REFRESH_TOKEN_COOKIE, refreshToken, Object.assign(Object.assign({}, defaultCookieOptions()), { path: "/api/user/session/access", expires: new Date(Date.now() + env_1.ENV.REFRESH_TOKEN_INTERVAL) }));
exports.setAuthCookies = setAuthCookies;
const unsetAuthCookies = (res) => res.clearCookie(env_1.ENV.REFRESH_TOKEN_COOKIE, Object.assign(Object.assign({}, defaultCookieOptions()), { path: "/api/user/session/access" }));
exports.unsetAuthCookies = unsetAuthCookies;
