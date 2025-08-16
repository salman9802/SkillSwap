import assert from "assert";

import express from "express";
import * as errorModule from "../../lib/error";
import { createNewRequest, request } from "../../controllers/user.controller";
import { newRequestSchema } from "../../lib/schemas";
import * as UserService from "../../services/user.service";
import { SkillSwapRequest } from "../../generated/prisma";
import { STATUS_CODES } from "../../constants/http";
import { SafeUser } from "../../lib/sanitize";
import prisma from "../../db/client";

let req: express.Request, res: express.Response, next: express.NextFunction;

// these are const objects, that's why no spying
jest.mock("../../lib/schemas.ts", () => ({
  newRequestSchema: {
    parse: jest.fn(),
  },
}));
jest.mock("../../services/user.service");
jest.mock("../../db/client", () => ({
  skillSwapRequest: {
    findFirst: jest.fn(),
  },
}));

describe("Create Skillswap Request", () => {
  const userStub = {};

  /** mock new req, res, next for each test */
  beforeEach(() => {
    req = { user: userStub } as unknown as express.Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as express.Response;
    next = jest.fn();
  });

  it("should not create request if user doesn't have timezone", async () => {
    req = { user: { timezone: null } } as unknown as express.Request;
    jest.spyOn(errorModule, "appAssert").mockImplementationOnce(() => {
      throw new Error("TimezoneError");
    });

    await errorModule.errorCatch(createNewRequest)(req, res, next);

    expect(errorModule.appAssert).toThrow(assert.AssertionError);
  });

  it("should create request", async () => {
    const newRequestStub = {
      timezone: "india/kolkata",
      requestedSkill: "jest",
      availability: [
        { date: new Date() },
        { date: new Date(Date.now() + 1000 * 60 * 60 * 24) },
      ],
    };
    const requestStub = {} as unknown as SkillSwapRequest;
    req.body = newRequestStub;
    req = { user: { timezone: new Date() } } as unknown as express.Request;

    (newRequestSchema.parse as jest.Mock).mockReturnValueOnce(newRequestStub);
    jest
      .spyOn(UserService, "newRequest")
      .mockReturnValueOnce(Promise.resolve(requestStub));

    await errorModule.errorCatch(createNewRequest)(req, res, next);

    expect(UserService.newRequest).toHaveBeenCalled();
    expect(UserService.newRequest).toHaveBeenCalledWith(
      req.user,
      newRequestStub
    );
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "Request created successfully",
      request: requestStub,
    });
  });
});

describe("Fetch single Skillswap Request", () => {
  let userStub = {};

  /** mock new req, res, next for each test */
  beforeEach(() => {
    req = { user: userStub, params: {} } as unknown as express.Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as express.Response;
    next = jest.fn();
  });

  it("should return 404 when request doesn't exist", async () => {
    const userIdStub = "1";
    const requestStub = null;
    req.params.id = userIdStub;

    (prisma.skillSwapRequest.findFirst as jest.Mock).mockReturnValueOnce(
      Promise.resolve(requestStub)
    );

    await errorModule.errorCatch(request)(req, res, next);

    expect(errorModule.appAssert).toHaveBeenCalled();
    expect(errorModule.appAssert).toThrow();
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
  });

  it("should return 409 when request is closed", async () => {
    const userIdStub = "1";
    const requestStub = { closed: true } as SkillSwapRequest;
    req.params.id = userIdStub;

    (prisma.skillSwapRequest.findFirst as jest.Mock).mockReturnValueOnce(
      Promise.resolve(requestStub)
    );

    await errorModule.errorCatch(request)(req, res, next);

    expect(errorModule.appAssert).toHaveBeenCalled();
    expect(errorModule.appAssert).toThrow();
    expect(prisma.skillSwapRequest.findFirst).toHaveBeenCalled();
    expect(prisma.skillSwapRequest.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: userIdStub,
        },
      })
    );
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(assert.AssertionError));
  });

  it("should return request with proper info", async () => {
    const userIdStub = "1";

    // User can provide requested skill and there are reviews
    let requestStub = {
      closed: false,
      requestedSkill: "jest",
      requester: { asReviewee: [{ rating: 1 }, { rating: 2 }, { rating: 3 }] },
    };
    req.params.id = userIdStub;
    userStub = { offeredSkills: ["jest"] };
    req.user = userStub as unknown as SafeUser;

    (prisma.skillSwapRequest.findFirst as jest.Mock).mockReturnValueOnce(
      Promise.resolve(requestStub)
    );

    await errorModule.errorCatch(request)(req, res, next);

    expect(prisma.skillSwapRequest.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: userIdStub,
        },
      })
    );
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      request: requestStub,
      reviewScore: 6 / requestStub.requester.asReviewee.length,
      canProvideSkill: true,
    });

    // User cannot provide requested skill and there are no reviews
    req.user.offeredSkills = ["supertest"];
    requestStub.requester.asReviewee = [{ rating: 0 }];

    (prisma.skillSwapRequest.findFirst as jest.Mock).mockReturnValueOnce(
      Promise.resolve(requestStub)
    );

    await errorModule.errorCatch(request)(req, res, next);

    expect(prisma.skillSwapRequest.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: userIdStub,
        },
      })
    );
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      request: requestStub,
      reviewScore: undefined,
      canProvideSkill: false,
    });
  });
});
