import jwt from "jsonwebtoken";

import { ENV } from "../constants/env";
import prisma from "../db/client";
import { User, UserSession } from "../generated/prisma";
import { comparePassword } from "../lib/bcrypt";
import { ExistingUser, NewUser } from "../lib/schemas";
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
