import express from "express";

import { errorCatch } from "../lib/error";
import * as UserController from "../controllers/user.controller";
import { userHasAccess } from "../middlewares/auth.middleware";

const userRouter = express.Router();

// Prefix: /api/user
userRouter.post("/", errorCatch(UserController.createUserAccount)); // Creates new user account (registeration)
userRouter.post("/session", errorCatch(UserController.newUserSession)); // Creates new refresh & access token (login)
userRouter.post("/session/access", errorCatch(UserController.newAccessToken)); // Creates new access token (refresh)

userRouter.get(
  "/",
  errorCatch(userHasAccess),
  errorCatch(UserController.userAccountDetails)
); // get user account details

userRouter.delete(
  "/session",
  errorCatch(userHasAccess),
  errorCatch(UserController.deleteUserSession)
); // (logout)

// userRouter.route("/").get(UserController.);

export default userRouter;
