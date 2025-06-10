import express from "express";

import {
  existingUserSchema,
  marketplaceParamsSchema,
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
import { setAuthCookies, unsetAuthCookies } from "../lib/cookie";
import { ENV } from "../constants/env";
import { AppErrorCodes } from "../constants/error";
import prisma from "../db/client";
import { SafeUser, sanitizeUser } from "../lib/sanitize";

export const createUserAccount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const parsedUser = newUserSchema.parse({ ...req.body });

  // check for existing user
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ name: parsedUser.name }, { email: parsedUser.email }],
    },
  });

  if (existingUser !== null) {
    appAssert(
      existingUser.name !== parsedUser.name,
      STATUS_CODES.CONFLICT,
      "Name already exists"
    );
    appAssert(
      existingUser.email !== parsedUser.email,
      STATUS_CODES.CONFLICT,
      "Email already exists"
    );
  }

  const user = await UserService.createUser(parsedUser);
  const userSession = await UserService.createUserSession(user.id);

  const { accessToken, refreshToken } =
    UserService.createAccessAndRefreshTokens(userSession);

  setAuthCookies({ res, refreshToken }).status(STATUS_CODES.CREATED).json({
    user,
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
    user: existingUser,
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

  const user = await prisma.user.findFirst({
    where: {
      id: (userSession as UserSession).userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
    },
  });

  res.status(STATUS_CODES.OK).json({
    accessToken,
    user,
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

  unsetAuthCookies(res).status(STATUS_CODES.OK).end();
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
    message: "Update successful",
    user: sanitizeUser(user),
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
    message: "File upload success",
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
    message: "Request created successfully",
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
  const filters = req.query;
  const parsed = marketplaceParamsSchema.parse({
    ...filters,
    // limit: req.query.limit,
    // offset: req.query.offset,
  });

  // TODO
  // const where = {
  //   availability: parsed.availability
  //     ? {
  //         some: parsed.availability,
  //       }
  //     : undefined,
  //   requestedSkill: parsed.offeredSkill
  //     ? {
  //         in: parsed.offeredSkill, // w.r.t. current user
  //       }
  //     : undefined,
  //   requester: parsed.requestedSkill.length
  //     ? {
  //         offeredSkills: {
  //           hasSome: parsed.requestedSkill, // w.r.t. current user
  //         },
  //       }
  //     : undefined,
  // };

  // const where = {
  //   // availability: parsed.availability
  //   availability: parsed.date
  //     ? {
  //         some: parsed.date,
  //       }
  //     : undefined,

  //   // requestedSkill: parsed.offeredSkill
  //   //   ? {
  //   //       in: parsed.offeredSkill, // w.r.t. current user
  //   //     }
  //   //   : undefined,
  //   // requester: parsed.requestedSkill.length
  //   //   ? {
  //   //       offeredSkills: {
  //   //         hasSome: parsed.requestedSkill, // w.r.t. current user
  //   //       },
  //   //     }
  //   //   : undefined,
  // };

  const where = {
    closed: false,
    availability: parsed.date
      ? {
          some: { date: new Date(parsed.date) },
        }
      : undefined,

    requester: {
      offeredSkills: parsed.offeredSkills
        ? {
            hasEvery: parsed.offeredSkills.split(","),
          }
        : undefined,
    },

    requestedSkill: parsed.requestedSkill,
  };

  // fetch from db
  const [requests, totalCount] = await Promise.all([
    prisma.skillSwapRequest.findMany({
      // skip: parsed.offset,
      // take: parsed.limit,
      where,
      select: {
        id: true,
        requester: {
          select: {
            name: true,
            offeredSkills: true,
          },
        },
        requestedSkill: true,
        createdAt: true,
        availability: true,
      },
    }),
    prisma.skillSwapRequest.count({ where }),
    // prisma.skillSwapRequest.count({}),
  ]);

  const offeredSkillQueryMatchedRequests =
    parsed.offeredSkillQuery === undefined
      ? requests
      : requests.filter((r) =>
          r.requester.offeredSkills.includes(parsed.offeredSkillQuery as string)
        );

  res.status(STATUS_CODES.OK).json({
    requests: offeredSkillQueryMatchedRequests,
    totalCount:
      parsed.offeredSkillQuery === undefined
        ? totalCount
        : offeredSkillQueryMatchedRequests.length,
  });
};

export const request = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user!;

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
      availability: {
        select: {
          id: true,
          date: true,
        },
      },
      requester: {
        select: {
          name: true,
          offeredSkills: true,
          asReviewee: {
            select: {
              rating: true,
            },
          },
          picture: true,
        },
      },
      closed: true,
    },
  });

  appAssert(request !== null, STATUS_CODES.NOT_FOUND);
  appAssert(!request!.closed, STATUS_CODES.CONFLICT, "Request closed");

  const reviewScore = request?.requester.asReviewee.reduce(
    (previousValue, review) => previousValue + review.rating,
    0
  );

  res.status(STATUS_CODES.OK).json({
    request,
    reviewScore:
      reviewScore !== 0
        ? reviewScore! / request!.requester.asReviewee.length
        : undefined,
    canProvideSkill: user.offeredSkills.includes(request!.requestedSkill),
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

export const skillswapSessions = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user!;

  const parsed = paginationSchema.parse({ ...req.query });

  const [sessions, totalCount] = await Promise.all([
    prisma.skillSwapSession.findMany({
      skip: parsed.offset,
      take: parsed.limit,
      select: {
        id: true,
        createdAt: true,
        status: true,
        offeredSkill: true,
        schedule: true,
        skillswapRequest: {
          select: {
            requestedSkill: true,
            requesterId: true,
          },
        },
      },
    }),
    prisma.skillSwapSession.count(),
  ]);

  res.status(STATUS_CODES.OK).json({
    sessions: sessions.map((session) => ({
      ...session,
      schedule: session.schedule.date,
      isRequester: session.skillswapRequest.requesterId === user.id,
      skillswapRequest: {
        ...session.skillswapRequest,
        requesterId: undefined,
      },
    })),
    totalCount,
  });
};

export const skillswapSession = async (
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
      skillswapRequest: {
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

export const updateSkillSwapSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;

  const session = await UserService.updateSkillSwapSessionStatus({
    sessionId: id,
    userId: req.user!.id,
  });

  appAssert(
    session,
    STATUS_CODES.CONFLICT,
    "Session is closed",
    AppErrorCodes.SESSION_CLOSED
  );

  res.status(STATUS_CODES.OK).json({
    message: "Session updated successfully",
    session,
  });
};
