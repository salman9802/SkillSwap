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
// import * as configModule from "../../config/config";
import { ServerConfig } from "../../config/config";

jest.mock("../../middlewares/rate-limilt");
// jest.mock("../../config/config");
// jest.mock("../../config/config", () => ({
//   getConfig: () => ({
//     allowedClientOrigins: [
//       "http://localhost:5173",
//       "https://skillswap-1-r1h9.onrender.com",
//       // "https://console.cron-job.org",
//       "116.203.129.16",
//       "116.203.134.67",
//       "23.88.105.37",
//       "128.140.8.200",
//       "91.99.23.109",
//     ],
//     rateLimits: {
//       DEMO_LIMIT: 10,
//       USER_ACCOUNT_LIMIT: -1,
//     },
//   }),
// }));

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

      // const actualConfig = jest
      //   .requireActual("../../config/config")
      //   .getConfig();
      // jest.spyOn(configModule, "getConfig").mockReturnValueOnce({
      //   ...actualConfig,
      //   rateLimits: {
      //     ...actualConfig.rateLimits,
      //     USER_ACCOUNT_LIMIT: -1,
      //   },
      // });
      // jest.doMock("../../config/config", () => {
      //   const actual = jest.requireActual("../../config/config");
      //   return {
      //     ...actual,
      //     getConfig: () => ({
      //       ...actual.getConfig(),
      //       rateLimits: {
      //         ...actual.getConfig().rateLimits,
      //         USER_ACCOUNT_LIMIT: -1,
      //       },
      //     }),
      //   };
      // });

      // configModule.overrideConfig({
      //   rateLimits: {
      //     USER_ACCOUNT_LIMIT: -1,
      //   },
      // });

      const res = await request(createExpressApp())
        .post("/api/user/account")
        .send(newUserStub);
      // console.log(res.headers);
      console.log(res.body);

      expect(res.statusCode).toBe(STATUS_CODES.TOO_MANY_REQUEST);
      // expect(res.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    });
    it.todo("should create account");
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
