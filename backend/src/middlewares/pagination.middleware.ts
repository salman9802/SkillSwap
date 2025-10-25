import express from "express";

export const pagination =
  (defaultLimit = 10, maxLimit = 100) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(
      maxLimit,
      Math.max(1, parseInt(req.query.limit as string) || defaultLimit)
    );
    req.pagination = {
      page,
      limit,
      skip: (page - 1) * limit,
    };
    next();
  };
