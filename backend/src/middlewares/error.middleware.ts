import express from "express";

import { STATUS_CODES } from "../constants/http";
import { ENV } from "../constants/env";
import { AppErrorCodes } from "../constants/error";
import z from "zod";
import { AppError, prettifyError } from "../lib/error";
import { Prisma } from "../generated/prisma";

export const errorMiddleware: express.ErrorRequestHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // replace any form of line break (or more than one space) to make an array for better readability from stack
  const errorStack =
    ENV.NODE_ENV !== "production"
      ? error.stack
          ?.replace(/(\r\n|\n|\r|\s{2,}|\t{1,})+/gm, ":::")
          .split(":::")
      : undefined;

  // TODO: handle prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Errors that Prisma can anticipate and provide codes for
    switch (error.code) {
      case "P2002": // Unique constraint failed
        res.status(409).json({
          message: "A record with this value already exists.",
          // message: `${error.meta?.target} already exists`,
          field: (error.meta?.target as string[])?.[0],
          stack: prettifyError(error.message),
        });
        return;

      case "P2025": // Record not found
        res.status(404).json({
          message: "Record not found.",
          stack: prettifyError(error.message),
        });
        return;

      case "P2003": // Foreign key constraint failed
        res.status(400).json({
          message:
            "Invalid reference to another resource (foreign key constraint).",
          stack: prettifyError(error.message),
        });
        return;

      default:
        res.status(500).json({
          message: "A database error occurred.",
          code: error.code,
          stack: prettifyError(error.message),
        });
        return;
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    // Invalid data passed to Prisma
    res.status(400).json({
      stack: prettifyError(error.message),
      message: "Validation error — invalid input for database operation.",
      details: error.message,
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).json({
      stack: prettifyError(error.message),
      message: "Could not connect to the database.",
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    res.status(500).json({
      stack: prettifyError(error.message),
      message: "Unexpected database panic. Check the logs.",
    });
    return;
  }

  // handle ZodError
  if (error instanceof z.ZodError) {
    const issues = error.issues.map((issue) => ({
      path: issue.path.join(", "),
      message: issue.message,
    }));

    res.status(STATUS_CODES.BAD_REQUEST).json({
      message: issues
        .map((i) => ({ [i.path]: i.message }))
        .reduce((prev, current) => ({ ...current, ...prev }), {}),
      issues: ENV.NODE_ENV !== "production" ? issues : undefined,
      stack: errorStack,
    });
    return;
  }

  // handle app errors
  if (error instanceof AppError) {
    switch (error.appErrorCode) {
      case AppErrorCodes.REFRESH_TOKEN_EXPIRED:
        res.status(STATUS_CODES.UNAUTHORIZED).json({
          message: error.message || "Something went wrong",
          code: AppErrorCodes.REFRESH_TOKEN_EXPIRED,
          stack: errorStack,
        });
        return;
      case AppErrorCodes.ACCESS_TOKEN_EXPIRED:
        res.status(STATUS_CODES.UNAUTHORIZED).json({
          message: error.message || "Something went wrong",
          code: AppErrorCodes.ACCESS_TOKEN_EXPIRED,
          stack: errorStack,
        });
        return;

      case AppErrorCodes.APP_ERROR:
        // General application error.
        res.status(error.httpStatusCode).json({
          message: error.message || "Something went wrong",
          code: AppErrorCodes.APP_ERROR,
          stack: errorStack,
        });
        return;

      default:
        // Server-related error.
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong",
          code: AppErrorCodes.SERVER_ERROR,
          stack: errorStack,
        });
        return;
    }
  }

  // Server-related error. (default)
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    code: AppErrorCodes.SERVER_ERROR,
    stack: errorStack,
  });
};
