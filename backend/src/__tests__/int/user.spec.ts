// import fs from "fs";
import path from "path";

import dotenv from "dotenv";

// console.log("-".repeat(30));
// console.log(
//   fs.existsSync(path.join(__dirname, "..", "..", "..", "..", ".env.test"))
// );
// console.log("-".repeat(30));

dotenv.config({
  path: path.join(__dirname, "..", "..", "..", "..", ".env.test"),
  override: true,
});

import request from "supertest";
import { createPrismaClient } from "../../db/client";
import { createExpressApp } from "../../server";
import * as rateLimiters from "../../middlewares/rate-limilt";
import { STATUS_CODES } from "../../constants/http";
import { ServerConfig } from "../../config/config";
import { AppErrorCodes } from "../../constants/error";

jest.mock("../../middlewares/rate-limilt");

describe("User Account", () => {
  const prismaClient = createPrismaClient();
  // const app = createExpressApp();
  const newUserStub = {
    name: "John Doe",
    email: "john@gmail.com",
    password: "Password1",
  };

  /** clean db before all tests */
  beforeAll(async () => {
    await prismaClient.$connect();
    await prismaClient.$transaction([
      prismaClient.userSession.deleteMany(),
      prismaClient.user.deleteMany(),
    ]);
  });

  beforeEach(() => {
    jest.resetModules();
  });

  /** clean db after all tests */
  afterAll(async () => {
    await prismaClient.$transaction([
      prismaClient.userSession.deleteMany(),
      prismaClient.user.deleteMany(),
    ]);
    await prismaClient.$disconnect();
  });

  describe("POST /api/user/account", () => {
    it("should be rate limited", async () => {
      jest
        .spyOn(rateLimiters, "registerLimiter")
        .mockRejectedValueOnce("Rate Limit");

      try {
        await request(createExpressApp())
          .post("/api/user/account")
          .send(newUserStub);
      } catch (error) {
        expect((error as Error).message).toEqual("Rate Limit");
      }
    });

    it("should should not create account if demo limit reached", async () => {
      jest
        .spyOn(rateLimiters, "registerLimiter")
        .mockImplementation((req, res, next) => {
          next();
        });

      ServerConfig.override("USER_ACCOUNT_LIMIT", -1);

      const res = await request(createExpressApp())
        .post("/api/user/account")
        .send(newUserStub);

      expect(res.statusCode).toBe(STATUS_CODES.TOO_MANY_REQUEST);
      expect(res.body.code).toEqual(AppErrorCodes.APP_ERROR);
      expect(res.body.message).toEqual(
        "Demo limit reached! Cannot create account. Please contact developer."
      );
    });

    it("should create account", async () => {
      ServerConfig.override("USER_ACCOUNT_LIMIT", 1);

      const res = await request(createExpressApp())
        .post("/api/user/account")
        .send(newUserStub);

      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.name).toEqual(newUserStub.name);
      expect(res.body.user.email).toEqual(newUserStub.email);
      expect(res.body.accessToken).toBeDefined();
    });
  });
});

// describe("User Session", () => {
//   describe("POST /user/session", () => {
//     //
//   });

//   describe("DELETE /user/session", () => {
//     //
//   });

//   describe("DELETE /user/access", () => {
//     //
//   });
// });
