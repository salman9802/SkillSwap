import { Socket } from "socket.io";

import { appAssert } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import * as UserService from "../services/user.service";
import { AccessTokenJwtPayload } from "../types/express/auth";
import prisma from "../db/client";
import { sanitizeUser } from "../lib/sanitize";
import { User } from "../../generated/prisma";

export const socketAuthMiddleware = async (socket: Socket, next: any) => {
  try {
    const accessToken = socket.handshake.auth.accessToken;
    appAssert(accessToken, STATUS_CODES.UNAUTHORIZED, "Invalid token");

    const accessPayload = UserService.validateAccessToken(
      accessToken
    ) as AccessTokenJwtPayload;

    const user = await prisma.user.findFirst({
      where: {
        id: accessPayload.uid,
      },
    });
    appAssert(user, STATUS_CODES.UNAUTHORIZED, "Unauthorized access");

    socket.user = sanitizeUser(user as User);
    next();
  } catch (error) {}
};
