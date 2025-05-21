import express from "express";

import {
  existingUserSchema,
  marketplaceFilterSchema,
  newRequestSchema,
  newSkillSwapSessionSchema,
  newUserSchema,
  paginationSchema,
  updateUserSchema,
} from "../lib/schemas";
import { STATUS_CODES } from "../constants/http";
import * as UserService from "../services/user.service";
import { appAssert } from "../lib/error";
import { User, UserSession } from "../generated/prisma";
import { setAuthCookies } from "../lib/cookie";
import { ENV } from "../constants/env";
import { AppErrorCodes } from "../constants/error";
import { SafeUser } from "../types/express/auth";
import prisma from "../db/client";

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

export const updateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userData = req.body;

  const parsedData = updateUserSchema.parse(userData);

  const user = await UserService.updateUserDetails(req.user?.id, parsedData);

  res.status(STATUS_CODES.OK).json({
    msg: "Update successful",
    user: UserService.sanitizeUser(user),
  });
};

export const updateUserPicture = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  appAssert(req.file, STATUS_CODES.BAD_REQUEST, "No file format");

  // update user
  await UserService.updateUserDetails(req.user?.id, {
    picture: `/uploads/${req.file?.filename}`,
  });

  res.status(STATUS_CODES.OK).json({
    msg: "File upload success",
    file: {
      filename: req.file?.filename,
      path: `/uploads/${req.file?.filename}`,
    },
  });
};

export const createNewRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const newRequest = req.body;

  // check for user's timezone
  appAssert(
    req.user?.timezone,
    STATUS_CODES.BAD_REQUEST,
    "You do not have a timezone. Cannot create request"
  );

  //  validate input data
  const parsedRequest = newRequestSchema.parse({
    ...newRequest,
    timezone: req.user?.timezone,
  });

  // create new request
  const request = await UserService.newRequest(req.user!, parsedRequest);

  res.status(STATUS_CODES.OK).json({
    msg: "Request created successfully",
    request,
  });
};

export const marketplace = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // const limit = isNaN(parseInt((req.query.limit as string | undefined) || ""))
  //   ? parseInt(req.query.limit as string)
  //   : 10; // Default limit

  // const limit = req.query.limit ? parseInt(req.query.limit as string) : 0; // Default offset
  // const offset = req.query.offset ? parseInt(req.query.offset as string) : 0; // Default offset

  // const limit = req.query.limit ? Number(req.query.limit) : 10;
  // const offset = Number(req.query.limit ?? 0);
  // console.log(typeof req.query.limit);
  // console.log(req.query.limit);
  // console.log(!!req.query.limit);
  // console.log(limit, offset);

  // validate filter options
  const filters = req.body;
  const parsed = marketplaceFilterSchema.parse({
    ...filters,
    limit: req.query.limit,
    offset: req.query.offset,
  });

  const where = {
    availability: parsed.availability
      ? {
          some: parsed.availability,
        }
      : undefined,
    requestedSkill: parsed.offeredSkill
      ? {
          in: parsed.offeredSkill, // w.r.t. current user
        }
      : undefined,
    requester: parsed.requestedSkill.length
      ? {
          offeredSkills: {
            hasSome: parsed.requestedSkill, // w.r.t. current user
          },
        }
      : undefined,
  };

  // fetch from db
  const [requests, totalCount] = await Promise.all([
    prisma.skillSwapRequest.findMany({
      skip: parsed.offset,
      take: parsed.limit,
      where,
    }),
    prisma.skillSwapRequest.count({ where }),
  ]);

  res.status(STATUS_CODES.OK).json({
    requests,
    totalCount,
  });
};

export const request = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;
  appAssert(id, STATUS_CODES.NOT_FOUND);

  const request = await prisma.skillSwapRequest.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      requestedSkill: true,
      createdAt: true,
      availability: true,
      requester: {
        select: {
          name: true,
          offeredSkills: true,
        },
      },
    },
  });

  res.status(STATUS_CODES.OK).json({
    request,
  });
};

export const newSkillSwapSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accepter = req.user!;

  const parsed = newSkillSwapSessionSchema.parse({ ...req.body });

  // close request
  const result = await UserService.acceptAndCloseRequest(
    accepter.id,
    parsed.requestId
  );
  appAssert(
    result,
    STATUS_CODES.CONFLICT,
    "Request closed. Session already present"
  );

  // new entry in db
  const session = await UserService.createSkillSwapSession(parsed);

  res.status(STATUS_CODES.OK).json({
    session,
  });
};

export const skillSwapSessions = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const parsed = paginationSchema.parse({ ...req.body });

  const [sessions, totalCount] = await Promise.all([
    prisma.skillSwapSession.findMany({
      skip: parsed.offset,
      take: parsed.limit,
    }),
    prisma.skillSwapSession.count(),
  ]);

  res.status(STATUS_CODES.OK).json({
    sessions,
    totalCount,
  });
};

export const skillSwapSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;

  const session = await prisma.skillSwapSession.findFirst({
    where: {
      id,
    },
    select: {
      status: true,
      schedule: true,
      offeredSkill: true,
      skillSwapRequest: {
        select: {
          requestedSkill: true,
          requester: {
            select: {
              name: true,
              picture: true,
            },
          },
          accepter: {
            select: {
              name: true,
              picture: true,
            },
          },
        },
      },
    },
  });

  res.status(STATUS_CODES.OK).json({
    session,
  });
};
