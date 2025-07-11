import express from "express";
import { appAssert } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import prisma from "../db/client";

export const requiredCoins =
  (coins: number) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const user = req.user;

    appAssert(
      user !== undefined,
      STATUS_CODES.SERVICE_UNAVAILABLE,
      "Incompatible order of middlewares"
    );

    appAssert(
      user!.coins >= coins,
      STATUS_CODES.FORBIDDEN,
      "Not enough coins."
    );

    await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        coins: user!.coins - coins,
      },
    });

    next();
  };
