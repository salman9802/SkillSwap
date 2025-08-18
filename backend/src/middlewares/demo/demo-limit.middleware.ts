import express from "express";
import { appAssert } from "../../lib/error";
import prisma from "../../db/client";
import { STATUS_CODES } from "../../constants/http";
import { ServerConfig } from "../../config/config";

export const demoLimitForSkillswapSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user!;

  const createdSessionCount = await prisma.skillSwapSession.count({
    where: {
      skillswapRequest: {
        OR: [
          {
            requesterId: user.id,
          },
          {
            accepterId: user.id,
          },
        ],
      },
    },
  });

  appAssert(
    createdSessionCount <= ServerConfig.getConfig().DEMO_LIMIT,
    STATUS_CODES.TOO_MANY_REQUEST,
    "You've reached the demo limit."
  );

  next();
};

export const demoLimitForSkillswapRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user!;

  const createdRequestCount = await prisma.skillSwapRequest.count({
    where: {
      requesterId: user.id,
    },
  });

  appAssert(
    createdRequestCount <= ServerConfig.getConfig().DEMO_LIMIT,
    STATUS_CODES.TOO_MANY_REQUEST,
    "You've reached the demo limit."
  );

  next();
};

export const demoLimitForUserAccount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const createdUserAccountCount = await prisma.user.count({});

  // console.log("*".repeat(50));
  // console.log("createdUserAccountCount", createdUserAccountCount);
  // console.log(
  //   "getConfig().USER_ACCOUNT_LIMIT",
  //   getConfig().USER_ACCOUNT_LIMIT
  // );
  console.log("*".repeat(50));
  console.log(
    `${createdUserAccountCount} <= ${
      ServerConfig.getConfig().USER_ACCOUNT_LIMIT
    } :`,
    createdUserAccountCount <= ServerConfig.getConfig().USER_ACCOUNT_LIMIT
  );
  console.log("*".repeat(50));
  const condition =
    createdUserAccountCount <= ServerConfig.getConfig().USER_ACCOUNT_LIMIT;
  console.log("createdUserAccountCount", createdUserAccountCount);
  console.log(
    "ServerConfig.getConfig().USER_ACCOUNT_LIMIT",
    ServerConfig.getConfig().USER_ACCOUNT_LIMIT
  );
  appAssert(
    condition,
    STATUS_CODES.TOO_MANY_REQUEST,
    "Demo limit reached! Cannot create account. Please contact developer."
  );

  next();
};
