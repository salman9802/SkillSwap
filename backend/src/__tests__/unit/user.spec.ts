import assert from "assert";

import express from "express";

import prisma from "../../db/client";
import { existingUserSchema, newUserSchema } from "../../lib/schemas";
import {
  createUserAccount,
  deleteUserSession,
  newUserSession,
} from "../../controllers/user.controller";
import * as errorModule from "../../lib/error";
import * as UserService from "../../services/user.service";
import { setAuthCookies, unsetAuthCookies } from "../../lib/cookie";
import { STATUS_CODES } from "../../constants/http";
import { SafeUser } from "../../lib/sanitize";

/** Mock `ENV` with test env vars */
jest.mock("../../constants/env.ts", () => ({
  NODE_ENV: "test",
  DATABASE_URL: "",
  PORT: "80",
  ACCESS_TOKEN_SECRET:
    "67fd5165ebf6a8440fd53276e9afd1b9e3541b22c2e1eb064f15e6f12b81a5aa",
  REFRESH_TOKEN_SECRET:
    "3dc4c2fac44907123509d2991f3989557824fd481b6891d1631bb5ee289ee337",
  COOKIE_SECRET:
    "9300d259669b8de4fb3f8b3ef41ccbdd10a046f31f28385e74df87e48d6179b5",
  STANDALONE: false,
}));

// these are const objects, that's why no spying
jest.mock("../../lib/schemas.ts", () => ({
  newUserSchema: {
    parse: jest.fn(),
  },
  existingUserSchema: {
    parse: jest.fn(),
  },
}));
jest.mock("../../db/client.ts", () => ({
  user: {
    findFirst: jest.fn(),
  },
}));
jest.mock("../../services/user.service");
jest.mock("../../lib/cookie");
// no need to mock whole module (import as namespace, then spy for controlled mocking)
// jest.mock("../../lib/error.ts", () => ({
//   appAssert: jest.fn(),
// }));

let req: express.Request, res: express.Response, next: express.NextFunction;

describe("User registration", () => {
  const stubUser = { name: "test", email: "test", password: "test" };
  beforeEach(() => {
    // (newUserSchema.parse as jest.Mock).mockImplementation(() => null)
    req = { body: {} } as unknown as express.Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as express.Response;
    next = jest.fn();
  });

  it("should return errors when user with name or email exists", async () => {
    (newUserSchema.parse as jest.Mock).mockImplementationOnce(() => stubUser);
    (prisma.user.findFirst as jest.Mock).mockImplementationOnce(() => ({
      ...stubUser,
      email: stubUser.email + "test",
    }));
    jest.spyOn(errorModule, "appAssert").mockImplementationOnce(() => {
      throw new Error("test");
    });

    await errorModule.errorCatch(createUserAccount)(req, res, next);

    expect(prisma.user.findFirst).toHaveBeenCalled();
    expect(errorModule.appAssert).toThrow();
  });

  it("should create user account", async () => {
    req.body = stubUser;
    const stubUserSession = {
      id: "2",
      userId: "2",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };
    const stubTokens = { accessToken: "access", refreshToken: "refresh" };
    const createdUserStub = { ...stubUser, id: "1" };

    (newUserSchema.parse as jest.Mock).mockImplementationOnce(() => stubUser);
    (prisma.user.findFirst as jest.Mock).mockReturnValueOnce(
      Promise.resolve(null)
    );
    jest
      .spyOn(UserService, "createUser")
      .mockReturnValueOnce(Promise.resolve(createdUserStub));
    jest
      .spyOn(UserService, "createUserSession")
      .mockReturnValueOnce(Promise.resolve(stubUserSession));
    jest
      .spyOn(UserService, "createAccessAndRefreshTokens")
      .mockReturnValueOnce(stubTokens);
    (setAuthCookies as jest.Mock).mockReturnValueOnce(res);

    await errorModule.errorCatch(createUserAccount)(req, res, next);

    expect(UserService.createUser).toHaveBeenCalled();
    expect(UserService.createUser).toHaveBeenCalledWith(stubUser);
    expect(UserService.createUserSession).toHaveBeenCalled();
    expect(UserService.createUserSession).toHaveBeenCalledWith("1");
    expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalled();
    expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalledWith(
      stubUserSession
    );
    expect(setAuthCookies).toHaveBeenCalled();
    expect(setAuthCookies).toHaveBeenCalledWith({
      res,
      refreshToken: stubTokens.refreshToken,
    });
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.CREATED);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      user: createdUserStub,
      accessToken: stubTokens.accessToken,
    });
  });
});

describe("User login", () => {
  const userStub = { email: "test", password: "test" };

  /** mock new req, res, next for each test */
  beforeEach(() => {
    req = { body: {} } as unknown as express.Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as express.Response;
    next = jest.fn();
  });

  it("should throw error if user exists", async () => {
    jest
      .spyOn(UserService, "validateUser")
      .mockReturnValueOnce(Promise.resolve(null));

    await errorModule.errorCatch(newUserSession)(req, res, next);

    expect(errorModule.appAssert).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
  });

  it("should throw error if credentials are invalid", async () => {
    jest
      .spyOn(UserService, "validateUser")
      .mockReturnValueOnce(Promise.resolve(false));

    await errorModule.errorCatch(newUserSession)(req, res, next);

    expect(errorModule.appAssert).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
  });

  it("should create session for user", async () => {
    req.body = userStub;
    const userSessionStub = {
      id: "2",
      userId: "2",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };
    const existingUserStub = { email: "test" } as SafeUser;
    const tokensStub = { accessToken: "access", refreshToken: "refresh" };

    jest
      .spyOn(UserService, "validateUser")
      .mockReturnValueOnce(Promise.resolve(existingUserStub));
    jest
      .spyOn(UserService, "createUserSession")
      .mockReturnValueOnce(Promise.resolve(userSessionStub));
    jest
      .spyOn(UserService, "createAccessAndRefreshTokens")
      .mockReturnValueOnce(tokensStub);
    (setAuthCookies as jest.Mock).mockReturnValueOnce(res);

    await errorModule.errorCatch(newUserSession)(req, res, next);

    expect(UserService.createUserSession).toHaveBeenCalled();
    expect(UserService.createUserSession).toHaveBeenCalledWith(
      existingUserStub.id
    );
    expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalled();
    expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalledWith(
      userSessionStub
    );
    expect(setAuthCookies).toHaveBeenCalled();
    expect(setAuthCookies).toHaveBeenCalledWith({
      res,
      refreshToken: tokensStub.refreshToken,
    });
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      user: existingUserStub,
      accessToken: tokensStub.accessToken,
    });
  });
});

describe("User logout", () => {
  const userStub = { id: "1" };

  /** mock new req, res, next for each test */
  beforeEach(() => {
    req = { user: userStub } as unknown as express.Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown as express.Response;
    next = jest.fn();
  });

  it("should delete user session and unset cookies", async () => {
    (unsetAuthCookies as jest.Mock).mockReturnValueOnce(res);

    await errorModule.errorCatch(deleteUserSession)(req, res, next);

    expect(UserService.deleteUserSession).toHaveBeenCalled();
    expect(UserService.deleteUserSession).toHaveBeenCalledWith(userStub.id);
    expect(unsetAuthCookies).toHaveBeenCalled();
    expect(unsetAuthCookies).toHaveBeenCalledWith(res);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.end).toHaveBeenCalled();
  });
});
