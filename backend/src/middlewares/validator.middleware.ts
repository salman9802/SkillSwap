import express from "express";
import z from "zod";
import { AppError } from "../lib/error";
import { STATUS_CODES } from "../constants/http";

export const validateRequest =
  (schema: z.AnyZodObject) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new AppError(STATUS_CODES.BAD_REQUEST, "Invalid request"));
      } else {
        console.log(error);
        next(
          new AppError(
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Something went wrong"
          )
        );
      }
    }
  };
