import assert from "node:assert";

import express from "express";

import { AppErrorCodes, AppErrorCodeType } from "../constants/error";
import { StatusCodeType } from "../constants/http";
import { ENV } from "../constants/env";

/** Custom app error */
export class AppError extends Error {
  httpStatusCode: StatusCodeType;
  appErrorCode?: AppErrorCodeType;

  constructor(
    httpStatusCode: StatusCodeType,
    message?: string,
    appErrorCode?: AppErrorCodeType
  ) {
    super(message || "Server Error");
    this.httpStatusCode = httpStatusCode;
    this.appErrorCode = appErrorCode;
  }
}

type AsyncController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void | Promise<void>;

export const errorCatch =
  (asyncController: AsyncController) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await asyncController(req, res, next);
    } catch (error) {
      next(error);
    }
  };

/** Asserts an condition & throws AppError if falsy */
export const appAssert = (
  condition: any,
  httpStatusCode: StatusCodeType,
  message?: string,
  appErrorCode: AppErrorCodeType = AppErrorCodes.APP_ERROR
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export const prettifyError = (error: string) =>
  ENV.NODE_ENV !== "production"
    ? error
        ?.replace(/(\r\n|\n|\r)+/gm, ":::")
        .split(":::")
        .filter((l) => l.length)
    : undefined;
