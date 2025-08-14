import express from "express";

import { ENV } from "../constants/env";

const defaultCookieOptions: () => express.CookieOptions = () => ({
  // The reason for selecting `lax` is because `none` requires https
  // but `lax` does require 'same-site' requests (different from 'same-origin')
  //    same-origin = same protocol + domain + port
  //    same-site = same domain, even if different ports
  // sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
  sameSite: "none",
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  signed: true,
});

export const setAuthCookies = ({
  res,
  //   accessToken,
  refreshToken,
}: {
  res: express.Response;
  //   accessToken: string;
  refreshToken: string;
}) =>
  // .cookie(ENV.ACCESS_TOKEN_COOKIE as string, accessToken, {
  //     ...defaultCookieOptions,
  //     expires: new Date(Date.now() + (ENV.ACCESS_TOKEN_INTERVAL as number))
  // })
  res.cookie(ENV.REFRESH_TOKEN_COOKIE as string, refreshToken, {
    ...defaultCookieOptions(),
    path: "/api/user/session/access",
    expires: new Date(Date.now() + ENV.REFRESH_TOKEN_INTERVAL),
  });

export const unsetAuthCookies = (res: express.Response) =>
  res.clearCookie(ENV.REFRESH_TOKEN_COOKIE, {
    ...defaultCookieOptions(),
    path: "/api/user/session/access",
    // expires: new Date(Date.now()),
  });
