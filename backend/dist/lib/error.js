"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettifyError = exports.appAssert = exports.errorCatch = exports.AppError = void 0;
const error_1 = require("../constants/error");
const env_1 = require("../constants/env");
/** Custom app error */
class AppError extends Error {
    constructor(httpStatusCode, message, appErrorCode) {
        super(message || "Server Error");
        this.httpStatusCode = httpStatusCode;
        this.appErrorCode = appErrorCode;
    }
}
exports.AppError = AppError;
const errorCatch = (asyncController) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield asyncController(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.errorCatch = errorCatch;
/** Asserts an condition & throws AppError if falsy */
const appAssert = (condition, httpStatusCode, message, appErrorCode = error_1.AppErrorCodes.APP_ERROR
// ) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));
) => {
    if (!condition) {
        throw new AppError(httpStatusCode, message, appErrorCode);
    }
};
exports.appAssert = appAssert;
const prettifyError = (error) => env_1.ENV.NODE_ENV !== "production"
    ? error === null || error === void 0 ? void 0 : error.replace(/(\r\n|\n|\r)+/gm, ":::").split(":::").filter((l) => l.length)
    : undefined;
exports.prettifyError = prettifyError;
