"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = __importDefault(require("zod"));
const error_1 = require("../lib/error");
const http_1 = require("../constants/http");
const validateRequest = (schema) => (req, res, next) => {
    try {
        const parsedReq = schema.parse({
            headers: req.headers,
            params: req.params,
            query: req.query,
            body: req.body,
        });
        //   if (parsedReq.headers)
        //     req.headers = { ...req.headers, ...parsedReq.headers };
        //   if (parsedReq.params) req.params = { ...req.params, ...parsedReq.params };
        //   if (parsedReq.query) req.query = { ...req.query, ...parsedReq.query };
        //   if (parsedReq.body) req.body = { ...req.body, ...parsedReq.body };
        //   if (parsedReq.headers) Object.assign(req.headers, parsedReq.headers);
        //   if (parsedReq.params) Object.assign(req.params, parsedReq.params);
        //   if (parsedReq.query) Object.assign(req.query, parsedReq.query);
        //   if (parsedReq.body) Object.assign(req.body, parsedReq.body);
        req.validated = parsedReq;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            next(new error_1.AppError(http_1.STATUS_CODES.BAD_REQUEST, "Invalid request"));
        }
        else {
            console.log(error);
            next(new error_1.AppError(http_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong"));
        }
    }
};
exports.validateRequest = validateRequest;
