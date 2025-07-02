import rateLimit from "express-rate-limit";

// Auth - Login
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth - Register
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: "Too many registration attempts. Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Read
export const readRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP. Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Create
export const createLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minute
  max: 20,
  message: "Too many attempts. Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Search (expensive)
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: "Too many search requests. Wait a moment.",
  standardHeaders: true,
  legacyHeaders: false,
});
