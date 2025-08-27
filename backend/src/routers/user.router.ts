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
import { userMonitoring } from "../middlewares/monitoring.middleware";

const userRouter = express.Router();

// Prefix: /api/user
userRouter.post(
  "/session",
  loginLimiter,
  userMonitoring({
    type: "user.login",
  }),
  errorCatch(UserController.newUserSession)
); // Creates new refresh & access token (login)
userRouter.get(
  "/session/access",
  userMonitoring({
    type: "user.new-access-token",
  }),
  errorCatch(UserController.newAccessToken)
); // Creates new access token (refresh)

userRouter.delete(
  "/session",
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.logout",
  }),
  errorCatch(UserController.deleteUserSession)
); // (logout)

// user account routes
userRouter
  .route("/account")
  .post(
    registerLimiter,
    errorCatch(demoLimitForUserAccount),
    userMonitoring({
      type: "user.signup",
    }),
    errorCatch(UserController.createUserAccount)
  ) // Creates new user account (registeration)
  .get(
    errorCatch(userHasAccess),
    userMonitoring({
      type: "user.account-details",
    }),
    errorCatch(UserController.userAccountDetails)
  ) // get user account details
  .put(errorCatch(userHasAccess), errorCatch(UserController.updateUser)); // update user

userRouter.put(
  "/upload-picture",
  errorCatch(userHasAccess),
  errorCatch(upload.single("picture")),
  userMonitoring({
    type: "user.update-pic",
  }),
  errorCatch(UserController.updateUserPicture)
); // update user picture

userRouter.get(
  "/dashboard",
  readRateLimiter,
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.dashboard",
  }),
  errorCatch(UserController.dashboard)
);

userRouter.post(
  "/new-request",
  createLimiter,
  errorCatch(userHasAccess),
  errorCatch(demoLimitForSkillswapRequest),
  errorCatch(requiredCoins(NEW_REQUEST_FEE)),
  userMonitoring({
    type: "user.new-skillswap-request",
  }),
  errorCatch(UserController.createNewRequest)
);

userRouter.get(
  "/marketplace",
  readRateLimiter,
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.marketplace",
  }),
  errorCatch(UserController.marketplace)
);

userRouter.get(
  "/request/:id",
  readRateLimiter,
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.skillswap-request",
  }),
  errorCatch(UserController.request)
);

userRouter.post(
  "/ss-session",
  createLimiter,
  errorCatch(userHasAccess),
  errorCatch(demoLimitForSkillswapSession),
  userMonitoring({
    type: "user.new-skillswap-session",
  }),
  errorCatch(UserController.newSkillSwapSession)
);

userRouter.get(
  "/ss-session",
  readRateLimiter,
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.skillswap-sessions",
  }),
  errorCatch(UserController.skillswapSessions)
);

userRouter.get(
  "/ss-session/:id",
  readRateLimiter,
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.skillswap-session",
  }),
  errorCatch(UserController.skillswapSession)
);

userRouter.put(
  "/ss-session/:id",
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.skillswap-session-update",
  }),
  errorCatch(UserController.updateSkillswapSession)
);

userRouter.put(
  "/ss-session/:id/reject",
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.skillswap-session-reject",
  }),
  errorCatch(UserController.rejectSkillswapSession)
);

userRouter.post(
  "/ss-session/:id/review",
  createLimiter,
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.skillswap-session-review",
  }),
  errorCatch(UserController.reviewSkillswapSession)
);

userRouter.get(
  "/ss-session/:id/chat",
  errorCatch(userHasAccess),
  userMonitoring({
    type: "user.skillswap-session-chat",
  }),
  errorCatch(UserController.skillswapSessionChat)
);

export default userRouter;
