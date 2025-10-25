"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const http_1 = require("../constants/http");
const env_1 = require("../constants/env");
const error_1 = require("../constants/error");
const zod_1 = __importDefault(require("zod"));
const error_2 = require("../lib/error");
const prisma_1 = require("../../generated/prisma");
const errorMiddleware = (error, req, res, next) => {
    var _a, _b, _c;
    // replace any form of line break (or more than one space) to make an array for better readability from stack
    const errorStack = env_1.ENV.NODE_ENV !== "production"
        ? (_a = error.stack) === null || _a === void 0 ? void 0 : _a.replace(/(\r\n|\n|\r|\s{2,}|\t{1,})+/gm, ":::").split(":::")
        : undefined;
    // TODO: handle prisma errors
    if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
        // Errors that Prisma can anticipate and provide codes for
        switch (error.code) {
            case "P2002": // Unique constraint failed
                res.status(409).json({
                    message: "A record with this value already exists.",
                    // message: `${error.meta?.target} already exists`,
                    field: (_c = (_b = error.meta) === null || _b === void 0 ? void 0 : _b.target) === null || _c === void 0 ? void 0 : _c[0],
                    stack: (0, error_2.prettifyError)(error.message),
                });
                return;
            case "P2025": // Record not found
                res.status(404).json({
                    message: "Record not found.",
                    stack: (0, error_2.prettifyError)(error.message),
                });
                return;
            case "P2003": // Foreign key constraint failed
                res.status(400).json({
                    message: "Invalid reference to another resource (foreign key constraint).",
                    stack: (0, error_2.prettifyError)(error.message),
                });
                return;
            default:
                res.status(500).json({
                    message: "A database error occurred.",
                    code: error.code,
                    stack: (0, error_2.prettifyError)(error.message),
                });
                return;
        }
    }
    if (error instanceof prisma_1.Prisma.PrismaClientValidationError) {
        // Invalid data passed to Prisma
        res.status(400).json({
            stack: (0, error_2.prettifyError)(error.message),
            message: "Validation error — invalid input for database operation.",
            details: error.message,
        });
        return;
    }
    if (error instanceof prisma_1.Prisma.PrismaClientInitializationError) {
        res.status(500).json({
            stack: (0, error_2.prettifyError)(error.message),
            message: "Could not connect to the database.",
        });
        return;
    }
    if (error instanceof prisma_1.Prisma.PrismaClientRustPanicError) {
        res.status(500).json({
            stack: (0, error_2.prettifyError)(error.message),
            message: "Unexpected database panic. Check the logs.",
        });
        return;
    }
    // handle ZodError
    if (error instanceof zod_1.default.ZodError) {
        const issues = error.issues.map((issue) => ({
            path: issue.path.join(", "),
            message: issue.message,
        }));
        res.status(http_1.STATUS_CODES.BAD_REQUEST).json({
            message: issues
                .map((i) => ({ [i.path]: i.message }))
                .reduce((prev, current) => (Object.assign(Object.assign({}, current), prev)), {}),
            issues: env_1.ENV.NODE_ENV !== "production" ? issues : undefined,
            stack: errorStack,
        });
        return;
    }
    // handle app errors
    if (error instanceof error_2.AppError) {
        switch (error.appErrorCode) {
            case error_1.AppErrorCodes.REFRESH_TOKEN_EXPIRED:
                res.status(http_1.STATUS_CODES.UNAUTHORIZED).json({
                    message: error.message || "Something went wrong",
                    code: error_1.AppErrorCodes.REFRESH_TOKEN_EXPIRED,
                    stack: errorStack,
                });
                return;
            case error_1.AppErrorCodes.ACCESS_TOKEN_EXPIRED:
                res.status(http_1.STATUS_CODES.UNAUTHORIZED).json({
                    message: error.message || "Something went wrong",
                    code: error_1.AppErrorCodes.ACCESS_TOKEN_EXPIRED,
                    stack: errorStack,
                });
                return;
            case error_1.AppErrorCodes.APP_ERROR:
                // General application error.
                res.status(error.httpStatusCode).json({
                    message: error.message || "Something went wrong",
                    code: error_1.AppErrorCodes.APP_ERROR,
                    stack: errorStack,
                });
                return;
            default:
                // Server-related error. (default)
                res.status(http_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
                    message: error.message || "Something went wrong",
                    code: error_1.AppErrorCodes.SERVER_ERROR,
                    stack: errorStack,
                });
                return;
        }
    }
    // Server-related error. (default)
    res.status(http_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Something went wrong",
        code: error_1.AppErrorCodes.SERVER_ERROR,
        stack: errorStack,
    });
};
exports.errorMiddleware = errorMiddleware;
