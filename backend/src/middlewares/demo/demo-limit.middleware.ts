import express from "express";
import { appAssert } from "../../lib/error";
import prisma from "../../db/client";
import { STATUS_CODES } from "../../constants/http";

// resource limits
const DEMO_LIMIT = 10;
const USER_ACCOUNT_LIMIT = 100;

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
    createdSessionCount <= DEMO_LIMIT,
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
    createdRequestCount <= DEMO_LIMIT,
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

  appAssert(
    createdUserAccountCount <= USER_ACCOUNT_LIMIT,
    STATUS_CODES.TOO_MANY_REQUEST,
    "Demo limit reached! Cannot create account. Please contact developer."
  );

  next();
};
