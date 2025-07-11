import express from "express";

import { errorCatch } from "../lib/error";
import * as UserController from "../controllers/user.controller";
import { userHasAccess } from "../middlewares/auth.middleware";
import { upload } from "../lib/multer";
import {
  demoLimitForSkillswapRequest,
  demoLimitForSkillswapSession,
  demoLimitForUserAccount,
} from "../middlewares/demo/demo-limit.middleware";
import {
  createLimiter,
  loginLimiter,
  readRateLimiter,
  registerLimiter,
} from "../middlewares/rate-limilt";
import { requiredCoins } from "../middlewares/user.middleware";
import { NEW_REQUEST_FEE } from "../constants/user";

const userRouter = express.Router();

// Prefix: /api/user
userRouter.post(
  "/session",
  loginLimiter,
  errorCatch(UserController.newUserSession)
); // Creates new refresh & access token (login)
userRouter.get("/session/access", errorCatch(UserController.newAccessToken)); // Creates new access token (refresh)

userRouter.delete(
  "/session",
  errorCatch(userHasAccess),
  errorCatch(UserController.deleteUserSession)
); // (logout)

// user account routes
userRouter
  .route("/account")
  .post(
    registerLimiter,
    errorCatch(demoLimitForUserAccount),
    errorCatch(UserController.createUserAccount)
  ) // Creates new user account (registeration)
  .get(errorCatch(userHasAccess), errorCatch(UserController.userAccountDetails)) // get user account details
  .put(errorCatch(userHasAccess), errorCatch(UserController.updateUser)); // update user

userRouter.put(
  "/upload-picture",
  errorCatch(userHasAccess),
  errorCatch(upload.single("picture")),
  errorCatch(UserController.updateUserPicture)
); // update user picture

userRouter.get(
  "/dashboard",
  readRateLimiter,
  errorCatch(userHasAccess),
  errorCatch(UserController.dashboard)
);

userRouter.post(
  "/new-request",
  createLimiter,
  errorCatch(userHasAccess),
  errorCatch(demoLimitForSkillswapRequest),
  errorCatch(requiredCoins(NEW_REQUEST_FEE)),
  errorCatch(UserController.createNewRequest)
);

userRouter.get(
  "/marketplace",
  readRateLimiter,
  errorCatch(userHasAccess),
  errorCatch(UserController.marketplace)
);

userRouter.get(
  "/request/:id",
  readRateLimiter,
  errorCatch(userHasAccess),
  errorCatch(UserController.request)
);

userRouter.post(
  "/ss-session",
  createLimiter,
  errorCatch(userHasAccess),
  errorCatch(demoLimitForSkillswapSession),
  errorCatch(UserController.newSkillSwapSession)
);

userRouter.get(
  "/ss-session",
  readRateLimiter,
  errorCatch(userHasAccess),
  errorCatch(UserController.skillswapSessions)
);

userRouter.get(
  "/ss-session/:id",
  readRateLimiter,
  errorCatch(userHasAccess),
  errorCatch(UserController.skillswapSession)
);

userRouter.put(
  "/ss-session/:id",
  errorCatch(userHasAccess),
  errorCatch(UserController.updateSkillswapSession)
);

userRouter.put(
  "/ss-session/:id/reject",
  errorCatch(userHasAccess),
  errorCatch(UserController.rejectSkillswapSession)
);

userRouter.post(
  "/ss-session/:id/review",
  createLimiter,
  errorCatch(userHasAccess),
  errorCatch(UserController.reviewSkillswapSession)
);

userRouter.get(
  "/ss-session/:id/chat",
  errorCatch(userHasAccess),
  errorCatch(UserController.skillswapSessionChat)
);

export default userRouter;
