import jwt from "jsonwebtoken";
import moment from "moment-timezone";

import { ENV } from "../constants/env";
import prisma from "../db/client";
import { SkillSwapRequest, User, UserSession } from "../generated/prisma";
import { comparePassword } from "../lib/bcrypt";
import {
  ExistingUser,
  NewRequest,
  NewSkillSwapSession,
  NewUser,
  UpdateUser,
} from "../lib/schemas";
import {
  AccessTokenJwtPayload,
  RefreshTokenJwtPayload,
  SafeUser,
} from "../types/express/auth";
import { appAssert } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import { AppErrorCodes } from "../constants/error";

export const createUser = async (newUser: NewUser) => {
  const user = await prisma.user.create({
    data: newUser,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return user;
};

/** create new session or update existing one */
export const createUserSession = async (userId: string) => {
  const existingUserSession = await prisma.userSession.findFirst({
    where: {
      userId,
    },
  });

  if (existingUserSession === null) {
    // create new session

    const userSession = await prisma.userSession.create({
      data: {
        userId,
        expiresAt: new Date(Date.now() + ENV.REFRESH_TOKEN_INTERVAL),
      },
    });
    return userSession;
  } else {
    // update existing one

    const userSession = await prisma.userSession.update({
      data: {
        userId,
        expiresAt: new Date(Date.now() + ENV.REFRESH_TOKEN_INTERVAL),
      },
      where: {
        userId,
      },
    });
    return userSession;
  }
};

/** Check if user is an existing user with valid credentials */
export const validateUser = async (user: ExistingUser) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (existingUser === null) return null;

  const hasValidPassword = await comparePassword(
    user.password,
    existingUser.password
  );
  if (hasValidPassword) return sanitizeUser(existingUser);
  else return false;
};

/** Creates an access token from session */
export const createAccessToken = (userSession: UserSession) => {
  // ⚠️ expiresIn is duration in seconds, NOT a Unix timestamp!
  // 15 minutes from now = 900 seconds

  const accessToken = jwt.sign(
    { id: userSession.id, uid: userSession.userId },
    ENV.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: ENV.ACCESS_TOKEN_INTERVAL / 1000,
    }
  );
  return accessToken;
};

/** Creates an access & refresh tokens from session */
export const createAccessAndRefreshTokens = (userSession: UserSession) => {
  // ⚠️ expiresIn is duration in seconds, NOT a Unix timestamp!
  // 15 minutes from now = 900 seconds

  const refreshToken = jwt.sign(
    {
      id: userSession.id,
    },
    ENV.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: ENV.REFRESH_TOKEN_INTERVAL / 1000,
    }
  );
  return { refreshToken, accessToken: createAccessToken(userSession) };
};

/** Validates if a session is valid & deletes expired session */
export const validateSession = async (refreshToken: any) => {
  const refreshPayload = validateRefreshToken(
    refreshToken
  ) as RefreshTokenJwtPayload;

  const userSession = await prisma.userSession.findFirst({
    where: {
      id: refreshPayload?.id,
    },
  });

  if (userSession === null) return null;

  if (Date.now() < userSession.expiresAt.getTime()) {
    // if not expired

    await prisma.userSession.update({
      data: {
        expiresAt: new Date(Date.now() + ENV.REFRESH_TOKEN_INTERVAL),
      },
      where: {
        id: refreshPayload.id,
      },
    });

    return userSession;
  } else {
    // if expired

    await prisma.userSession.delete({
      where: {
        id: refreshPayload.id,
      },
    });

    return false;
  }
};

/** Returns refresh token if valid or throws App error if expired */
export const validateRefreshToken = (refreshToken: any) => {
  try {
    const refreshPayload = jwt.verify(
      refreshToken,
      ENV.REFRESH_TOKEN_SECRET as string
    ) as RefreshTokenJwtPayload;
    return refreshPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      appAssert(
        false,
        STATUS_CODES.UNAUTHORIZED,
        "Refresh token expired",
        AppErrorCodes.REFRESH_TOKEN_EXPIRED
      );
    else
      appAssert(
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        AppErrorCodes.SERVER_ERROR
      );
  }
};

/** Returns access token if valid or throws App error if expired */
export const validateAccessToken = (accessToken: any) => {
  try {
    const accessPayload = jwt.verify(
      accessToken,
      ENV.ACCESS_TOKEN_SECRET as string
    ) as AccessTokenJwtPayload;
    return accessPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      appAssert(
        false,
        STATUS_CODES.UNAUTHORIZED,
        "Access token expired",
        AppErrorCodes.ACCESS_TOKEN_EXPIRED
      );
    else
      appAssert(
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        AppErrorCodes.SERVER_ERROR
      );
  }
};

/** Converts `User` into `SafeUser` by removing sensitive info */
export const sanitizeUser = (user: User): SafeUser => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const deleteUserSession = async (userId: string | undefined) => {
  if (userId === undefined) return;
  await prisma.userSession.deleteMany({
    where: {
      userId: userId,
    },
  });
};

export const updateUserDetails = async (
  userId: string | undefined,
  userData: UpdateUser
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: userData,
  });
};

export const newRequest = async (user: SafeUser, request: NewRequest) => {
  return await prisma.skillSwapRequest.create({
    data: {
      requesterTimezone: user.timezone!,
      requesterId: user.id,
      requestedSkill: request.requestedSkill,
      availability: { create: request.availability },
    },
  });
};

export const acceptAndCloseRequest = async (
  accepterId: string,
  requestId: string
) => {
  const request = await prisma.skillSwapRequest.findFirst({
    where: {
      id: requestId,
    },
  });
  if (request?.closed) return false;

  return await prisma.skillSwapRequest.update({
    data: {
      closed: true,
      closedAt: new Date(),
      accepterId,
    },
    where: {
      id: requestId,
    },
  });
};

export const createSkillSwapSession = async (
  newSkillSwapSession: NewSkillSwapSession
) => {
  return await prisma.skillSwapSession.create({
    data: {
      offeredSkill: newSkillSwapSession.offeredSkill,
      scheduleId: newSkillSwapSession.scheduleId,
      skillSwapRequestId: newSkillSwapSession.requestId,
    },
  });
};

export const updateSkillSwapSessionStatus = async ({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string;
}) => {
  // TODO
  const session = await prisma.skillSwapSession.findFirst({
    where: {
      id: sessionId,
    },
    select: {
      status: true,
      schedule: true,
      review: true,
      skillSwapRequest: {
        select: {
          requesterId: true,
          accepterId: true,
          requesterTimezone: true,
        },
      },
    },
  });
  appAssert(session !== null, STATUS_CODES.BAD_REQUEST, "Session not found");
  appAssert(
    session?.status !== "CANCELLED",
    STATUS_CODES.FORBIDDEN,
    "Sesssion was rejected",
    AppErrorCodes.SESSION_REJECTED
  );
  // appAssert(
  //   session?.status !== "CLOSED",
  //   STATUS_CODES.FORBIDDEN,
  //   "Sesssion already closed",
  //   AppErrorCodes.SESSION_CLOSED
  // );

  switch (session?.status) {
    case "OPEN":
      // OPEN -> ACCEPTED
      appAssert(
        userId === session.skillSwapRequest.accepterId,
        STATUS_CODES.FORBIDDEN,
        "Accepter hasn't confirmed the session."
      );

      return await prisma.skillSwapSession.update({
        data: {
          status: "ACCEPTED",
        },
        where: {
          id: sessionId,
        },
      });

    case "ACCEPTED":
      // ACCEPTED -> SCHEDULED
      appAssert(
        userId === session.skillSwapRequest.requesterId,
        STATUS_CODES.FORBIDDEN,
        "Requester hasn't confirmed the session."
      );

      return await prisma.skillSwapSession.update({
        data: {
          status: "SCHEDULED",
        },
        where: {
          id: sessionId,
        },
      });

    case "SCHEDULED":
      // SCHEDULED -> FINISHED
      appAssert(
        userId === session.skillSwapRequest.accepterId ||
          userId === session.skillSwapRequest.requesterId,
        STATUS_CODES.FORBIDDEN
      );

      const date = moment.tz(
        `${session.schedule.date} ${session.schedule.endTime}`,
        session.skillSwapRequest.requesterTimezone
      );

      // const [hour, minute] = session.schedule.endTime.split(":").map(Number);
      // session.schedule.date.setHours(hour, minute)
      if (date.valueOf() < Date.now()) {
        // schedule has passed
        return await prisma.skillSwapSession.update({
          data: {
            status: "FINISHED",
          },
          where: {
            id: sessionId,
          },
        });
      } else {
        appAssert(
          false,
          STATUS_CODES.CONFLICT,
          "Session has yet to take place"
        );
      }

      break;

    case "FINISHED":
      // TODO: If both have reviewed then FINISHED -> CLOSED
      appAssert(
        session.review !== null,
        STATUS_CODES.CONFLICT,
        "Session can only be closed after both users have rated each other."
      );

      return await prisma.skillSwapSession.update({
        data: {
          status: "CLOSED",
        },
        where: {
          id: sessionId,
        },
      });

    default:
      return false;
  }
};
