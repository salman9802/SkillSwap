import express from "express";

import {
  dashboardQueryParamsSchema,
  existingUserSchema,
  marketplaceParamsSchema,
  newRequestSchema,
  newSkillSwapSessionSchema,
  newUserSchema,
  paginationSchema,
  SkillswapSessionReview,
  skillswapSessionReviewSchema,
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
      skip: parsed.offset,
      // take: parsed.limit,
      take: 8,
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
          id: true,
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
      where: {
        OR: [
          {
            skillswapRequest: {
              accepterId: user.id,
            },
          },
          {
            skillswapRequest: {
              requesterId: user.id,
            },
          },
        ],
      },
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
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.skillSwapSession.count({
      where: {
        OR: [
          {
            skillswapRequest: {
              accepterId: user.id,
            },
          },
          {
            skillswapRequest: {
              requesterId: user.id,
            },
          },
        ],
      },
    }),
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
  const user = req.user!;

  const { id } = req.params;

  const session = await prisma.skillSwapSession.findFirst({
    where: {
      id,
    },
    select: {
      status: true,
      offeredSkill: true,
      schedule: {
        select: {
          date: true,
        },
      },
      review: {
        select: {
          reviewerId: true,
        },
      },
      skillswapRequest: {
        select: {
          requesterId: true,
          accepterId: true,
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
    session: {
      ...session,
      isRequester: session?.skillswapRequest.requesterId === user.id,
      // hasReviewed: session?.review
      //   ? session?.review[0]?.reviewerId === user.id
      //   : false,
      hasReviewed:
        session?.review.filter((r) => r.reviewerId === user.id).length !== 0,
      // ? session?.review[0]?.reviewerId === user.id
      // : false,
    },
  });
};

export const updateSkillswapSession = async (
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

export const rejectSkillswapSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user!;

  const { id } = req.params;

  // user must either be a requester or accepter
  const session = await prisma.skillSwapSession.findFirst({
    where: {
      id,
    },
    select: {
      skillswapRequest: {
        select: {
          requesterId: true,
          accepterId: true,
        },
      },
    },
  });
  appAssert(session !== null, STATUS_CODES.BAD_REQUEST, "No session");

  appAssert(
    session?.skillswapRequest.requesterId === user.id ||
      session?.skillswapRequest.accepterId === user.id,
    STATUS_CODES.FORBIDDEN
  );

  // update session
  await prisma.skillSwapSession.update({
    where: {
      id,
    },
    data: {
      status: "CANCELLED",
    },
  });

  res.status(STATUS_CODES.OK).send();
};

export const reviewSkillswapSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // skillswapSessionId
  const { id } = req.params;
  // reviewerId
  const user = req.user!;

  // verify if user is part of session and have not reviewed yet
  const session = await prisma.skillSwapSession.findFirst({
    where: {
      id,
    },
    select: {
      review: {
        select: {
          reviewerId: true,
        },
      },
      skillswapRequest: {
        select: {
          requesterId: true,
          accepterId: true,
        },
      },
    },
  });
  appAssert(
    user.id === session?.skillswapRequest.accepterId ||
      user.id === session?.skillswapRequest.requesterId,
    STATUS_CODES.FORBIDDEN
  );
  appAssert(
    session?.review.filter((r) => r.reviewerId === user.id).length === 0,
    STATUS_CODES.CONFLICT,
    "Can only review once"
  );

  const parsed: SkillswapSessionReview = skillswapSessionReviewSchema.parse({
    ...req.body,
  });

  await UserService.createSkillswapSessionReview({
    review: parsed,
    sessionId: id,
    reviewerId: user.id,
  });

  res.status(STATUS_CODES.OK).send();
};

export const skillswapSessionChat = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // sessionId
  const { id } = req.params;

  const messages = await prisma.skillSwapSessionChatMessage.findMany({
    where: {
      skillswapSessionId: id,
    },
    select: {
      content: true,
      senderId: true,
    },
  });

  res.status(STATUS_CODES.OK).json({
    messages,
  });
};

export const dashboard = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user!;

  const { timePeriod } = dashboardQueryParamsSchema.parse(req.query);

  // total sessions completed
  const totalSessionsCompleted = await prisma.skillSwapSession.count({
    where: {
      AND: [
        { status: "CLOSED" },
        {
          OR: [
            {
              skillswapRequest: {
                requesterId: user.id,
              },
            },
            {
              skillswapRequest: {
                accepterId: user.id,
              },
            },
          ],
        },
      ],
    },
  });

  // total requests created
  const totalRequestsCreated = await prisma.skillSwapRequest.count({
    where: {
      requesterId: user.id,
    },
  });

  // total requests closed
  const totalRequestsCompleted = await prisma.skillSwapRequest.count({
    where: {
      AND: [
        {
          closed: true,
        },
        {
          OR: [
            {
              requesterId: user.id,
            },
            {
              accepterId: user.id,
            },
          ],
        },
      ],
    },
  });

  // total sessions cancelled
  const totalSessionsCancelled = await prisma.skillSwapSession.count({
    where: {
      AND: [
        { status: "CANCELLED" },
        {
          OR: [
            {
              skillswapRequest: {
                requesterId: user.id,
              },
            },
            {
              skillswapRequest: {
                accepterId: user.id,
              },
            },
          ],
        },
      ],
    },
  });

  // total chat messages created
  const totalChatMessagesCreated =
    await prisma.skillSwapSessionChatMessage.count({
      where: {
        senderId: user.id,
      },
    });

  // TODO: sessions completed (graph)
  /* 
  Last week - date=YYYY-mm-dd (start date)
  Last month - (some kind of number)
  Last 3 month - (some kind of number) (start month)
   */
  // let date;
  // date = new Date();
  // date.setUTCSeconds(date.getUTCSeconds() - 60 * 60 * 24 * 7);

  // const lastWeek = date.toISOString().split("T")[0];

  // date = new Date();
  // date.setUTCMonth(date.getUTCMonth() - 1);
  // const lastMonth = date.getMonth();

  // const rangeStart = new Date();

  const rangeEnd = new Date();
  const rangeStart = new Date(
    Date.UTC(
      rangeEnd.getUTCFullYear(),
      rangeEnd.getUTCMonth(),
      rangeEnd.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  switch (timePeriod) {
    case "last_week":
      rangeStart.setUTCDate(rangeStart.getUTCDate() - 7);
      break;
    case "last_month":
      rangeStart.setUTCMonth(rangeStart.getUTCMonth() - 1);
      break;
    case "last_3_months":
      rangeStart.setUTCMonth(rangeStart.getUTCMonth() - 3);
      break;
    default:
      res.status(STATUS_CODES.BAD_REQUEST);
      break;
  }

  // set time 00:00:00:0000
  rangeStart.setUTCHours(0, 0, 0, 0);

  // const result = await prisma.$runCommandRaw({
  //   aggregate: "skillswap_sessions",
  //   // pipeline: [],
  //   pipeline: [
  //   {
  //     $match: {
  //       createdAt: {
  //         $gte: new Date(rangeStart.toISOString()),
  //       },
  //       status: "CLOSED",
  //     },
  //     // $match: {
  //     //   $expr: {
  //     //     $gte: ["$createdAt", rangeStart], // rangeStart is a Date object
  //     //   },
  //     //   status: "active",
  //     // },
  //   },
  //   {
  //     $group: {
  //       _id: {
  //         $dateToString: {
  //           format: "%Y-%m-%d",
  //           date: "$createdAt",
  //         },
  //       },
  //       count: { $sum: 1 },
  //     },
  //   },
  //   // { $group: { _id: "$createdAt", count: { $sum: 1 } } },
  //   { $sort: { _id: 1 } },
  //   {
  //     $project: {
  //       _id: 0,
  //       date: "$_id",
  //       count: 1,
  //     },
  //   },
  // ],
  //   cursor: {}, // required when using runCommandRaw for aggregation
  // });
  // as {
  //   cursor: {
  //     firstBatch: any;
  //     // firstBatch: {
  //     //   date: string;
  //     //   count: number;
  //     // };
  //   };
  // };
  // const sessionsClosedInRange = result;
  // const sessionsClosedInRange = result.cursor?.firstBatch;

  // 1. Fetch all matching sessions
  const sessions = await prisma.skillSwapSession.findMany({
    where: {
      createdAt: { gte: rangeStart },
      status: "CLOSED",
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // 2. Group by date (ignoring time)
  const countsByDate: Record<string, number> = {};

  for (const session of sessions) {
    // const day = formatISO(startOfDay(session.createdAt), { representation: 'date' });
    const day = session.createdAt.toISOString().split("T")[0];
    countsByDate[day] = (countsByDate[day] || 0) + 1;
  }

  // 3. Convert to desired format
  // const sessionsClosedInRange = Object.entries(countsByDate)
  //   .map(([date, count]) => ({ date, count }))
  //   .sort((a, b) => a.date.localeCompare(b.date));

  res.status(STATUS_CODES.OK).json({
    totalSessionsCompleted,
    totalRequestsCreated,
    totalRequestsCompleted,
    totalSessionsCancelled,
    totalChatMessagesCreated,
    sessionsClosedInRange: countsByDate,
    rangeStart,
    rangeEnd,
    //   test: await prisma.skillSwapSession.findMany({
    //     where: {
    //       createdAt: { gte: rangeStart },
    //       status: "CLOSED", // or use a variable
    //     },
    //     // take: 1,
    //   }),
  });
};
