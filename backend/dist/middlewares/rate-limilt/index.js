"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLimiter = exports.createLimiter = exports.readRateLimiter = exports.registerLimiter = exports.loginLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Auth - Login
exports.loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: "Too many login attempts, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
// Auth - Register
exports.registerLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: "Too many registration attempts. Try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
// Read
exports.readRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this IP. Try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
// Create
exports.createLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 5 minute
    max: 20,
    message: "Too many attempts. Try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
// Search (expensive)
exports.searchLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 20,
    message: "Too many search requests. Wait a moment.",
    standardHeaders: true,
    legacyHeaders: false,
});
