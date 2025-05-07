import assert from "node:assert";

import express from "express";

import { AppErrorCodes, AppErrorCodeType } from "../constants/error";
import { StatusCodeType } from "../constants/http";

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
) => Promise<any>;

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
