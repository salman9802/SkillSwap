import express from "express";

import { existingUserSchema, newUserSchema } from "../lib/schemas";
import { STATUS_CODES } from "../constants/http";
import * as UserService from "../services/user.service";
import { appAssert } from "../lib/error";
import { User, UserSession } from "../generated/prisma";
import { setAuthCookies } from "../lib/cookie";
import { ENV } from "../constants/env";
import { AppErrorCodes } from "../constants/error";
import { SafeUser } from "../types/express/auth";

export const createUserAccount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const parsedUser = newUserSchema.parse({ ...req.body });

  const user = await UserService.createUser(parsedUser);
  const userSession = await UserService.createUserSession(user.id);

  const { accessToken, refreshToken } =
    UserService.createAccessAndRefreshTokens(userSession);

  setAuthCookies({ res, refreshToken }).status(STATUS_CODES.CREATED).json({
    msg: "User created",
    user,
    session: userSession,
    accessToken,
  });
};

export const newUserSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const parsedUser = existingUserSchema.parse({ ...req.body });

  const existingUser = await UserService.validateUser(parsedUser);
  appAssert(
    existingUser !== null,
    STATUS_CODES.NOT_FOUND,
    "User doesn't exist"
  );

  appAssert(
    existingUser !== false,
    STATUS_CODES.BAD_REQUEST,
    "Invalid credentials"
  );

  const userSession = await UserService.createUserSession(
    (existingUser as SafeUser).id
  );

  const { accessToken, refreshToken } =
    UserService.createAccessAndRefreshTokens(userSession);

  setAuthCookies({ res, refreshToken }).status(STATUS_CODES.OK).json({
    msg: "Valid user",
    user: existingUser,
    session: userSession,
    accessToken,
  });
};

export const newAccessToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const refreshToken = req.signedCookies[ENV.REFRESH_TOKEN_COOKIE];

  appAssert(refreshToken, STATUS_CODES.UNAUTHORIZED, "Token not found");

  const userSession = await UserService.validateSession(refreshToken);

  appAssert(
    userSession !== null && userSession !== false,
    STATUS_CODES.UNAUTHORIZED,
    "Session expired or does not exists"
  );
  // appAssert(
  //   userSession !== false,
  //   STATUS_CODES.UNAUTHORIZED,
  //   "Session expired or does not exists"
  // );

  const accessToken = UserService.createAccessToken(userSession as UserSession);

  res.status(STATUS_CODES.OK).json({
    accessToken,
  });
};

export const userAccountDetails = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user } = req;
  appAssert(user, STATUS_CODES.UNAUTHORIZED, "Unauthorized access");

  res.status(STATUS_CODES.OK).json({
    user,
  });
};

export const deleteUserSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user } = req;

  await UserService.deleteUserSession(user?.id);

  res.status(STATUS_CODES.OK).end();
};
