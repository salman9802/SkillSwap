"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (defaultLimit = 10, maxLimit = 100) => (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(maxLimit, Math.max(1, parseInt(req.query.limit) || defaultLimit));
    req.pagination = {
        page,
        limit,
        skip: (page - 1) * limit,
    };
    next();
};
exports.pagination = pagination;
