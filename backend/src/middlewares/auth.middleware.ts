import express from "express";

import { appAssert } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import * as UserService from "../services/user.service";
import prisma from "../db/client";
import { AccessTokenJwtPayload } from "../types/express/auth";
import { AppErrorCodes } from "../constants/error";
import { User, UserSession } from "../generated/prisma";
import { sanitizeUser } from "../lib/sanitize";

export const userHasAccess = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  appAssert(accessToken, STATUS_CODES.UNAUTHORIZED, "Invalid token");

  const accessPayload = UserService.validateAccessToken(
    accessToken
  ) as AccessTokenJwtPayload;

  // // validate user session
  // const userSession = await prisma.userSession.findFirst({
  //   where: {
  //     id: accessPayload.id,
  //   },
  // });

  // appAssert(
  //   userSession !== null,
  //   STATUS_CODES.UNAUTHORIZED,
  //   "Invalid session",
  //   AppErrorCodes.APP_ERROR
  // );
  // appAssert(
  //   Date.now() < (userSession as UserSession).expiresAt.getTime(),
  //   STATUS_CODES.UNAUTHORIZED,
  //   "Session expired",
  //   AppErrorCodes.REFRESH_TOKEN_EXPIRED
  // );

  // validate user
  const user = await prisma.user.findFirst({
    where: {
      id: accessPayload.uid,
    },
  });
  appAssert(user, STATUS_CODES.UNAUTHORIZED, "Unauthorized access");

  req.user = sanitizeUser(user as User);
  next();
};
