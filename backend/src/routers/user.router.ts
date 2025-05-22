import express from "express";

import { errorCatch } from "../lib/error";
import * as UserController from "../controllers/user.controller";
import { userHasAccess } from "../middlewares/auth.middleware";
import { upload } from "../lib/multer";

const userRouter = express.Router();

// Prefix: /api/user
userRouter.post("/session", errorCatch(UserController.newUserSession)); // Creates new refresh & access token (login)
userRouter.post("/session/access", errorCatch(UserController.newAccessToken)); // Creates new access token (refresh)

userRouter.delete(
  "/session",
  errorCatch(userHasAccess),
  errorCatch(UserController.deleteUserSession)
); // (logout)

// user account routes
userRouter
  .route("/account")
  .post(errorCatch(UserController.createUserAccount)) // Creates new user account (registeration)
  .get(errorCatch(userHasAccess), errorCatch(UserController.userAccountDetails)) // get user account details
  .put(errorCatch(userHasAccess), errorCatch(UserController.updateUser)); // update user

userRouter.put(
  "/upload-picture",
  errorCatch(userHasAccess),
  errorCatch(upload.single("picture")),
  errorCatch(UserController.updateUserPicture)
); // update user picture

userRouter.post(
  "/new-request",
  errorCatch(userHasAccess),
  errorCatch(UserController.createNewRequest)
);

userRouter.get(
  "/marketplace",
  errorCatch(userHasAccess),
  errorCatch(UserController.marketplace)
);

userRouter.get(
  "/request/:id",
  errorCatch(userHasAccess),
  errorCatch(UserController.request)
);

userRouter.post(
  "/ss-session",
  errorCatch(userHasAccess),
  errorCatch(UserController.newSkillSwapSession)
);

userRouter.get(
  "/ss-session",
  errorCatch(userHasAccess),
  errorCatch(UserController.skillSwapSessions)
);

userRouter.get(
  "/ss-session/:id",
  errorCatch(userHasAccess),
  errorCatch(UserController.skillSwapSession)
);

userRouter.put(
  "/ss-session/:id",
  errorCatch(userHasAccess),
  errorCatch(UserController.updateSkillSwapSession)
);

export default userRouter;
