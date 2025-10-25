"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const errorModule = __importStar(require("../../lib/error"));
const user_controller_1 = require("../../controllers/user.controller");
const schemas_1 = require("../../lib/schemas");
const UserService = __importStar(require("../../services/user.service"));
const http_1 = require("../../constants/http");
const client_1 = __importDefault(require("../../db/client"));
let req, res, next;
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
        req = { user: userStub };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should not create request if user doesn't have timezone", () => __awaiter(void 0, void 0, void 0, function* () {
        req = { user: { timezone: null } };
        jest.spyOn(errorModule, "appAssert").mockImplementationOnce(() => {
            throw new Error("TimezoneError");
        });
        yield errorModule.errorCatch(user_controller_1.createNewRequest)(req, res, next);
        expect(errorModule.appAssert).toThrow(assert_1.default.AssertionError);
    }));
    it("should create request", () => __awaiter(void 0, void 0, void 0, function* () {
        const newRequestStub = {
            timezone: "india/kolkata",
            requestedSkill: "jest",
            availability: [
                { date: new Date() },
                { date: new Date(Date.now() + 1000 * 60 * 60 * 24) },
            ],
        };
        const requestStub = {};
        req.body = newRequestStub;
        req = { user: { timezone: new Date() } };
        schemas_1.newRequestSchema.parse.mockReturnValueOnce(newRequestStub);
        jest
            .spyOn(UserService, "newRequest")
            .mockReturnValueOnce(Promise.resolve(requestStub));
        yield errorModule.errorCatch(user_controller_1.createNewRequest)(req, res, next);
        expect(UserService.newRequest).toHaveBeenCalled();
        expect(UserService.newRequest).toHaveBeenCalledWith(req.user, newRequestStub);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_1.STATUS_CODES.OK);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            message: "Request created successfully",
            request: requestStub,
        });
    }));
});
describe("Fetch single Skillswap Request", () => {
    let userStub = {};
    /** mock new req, res, next for each test */
    beforeEach(() => {
        req = { user: userStub, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should return 404 when request doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const userIdStub = "1";
        const requestStub = null;
        req.params.id = userIdStub;
        client_1.default.skillSwapRequest.findFirst.mockReturnValueOnce(Promise.resolve(requestStub));
        yield errorModule.errorCatch(user_controller_1.request)(req, res, next);
        expect(errorModule.appAssert).toHaveBeenCalled();
        expect(errorModule.appAssert).toThrow();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(expect.any(assert_1.default.AssertionError));
    }));
    it("should return 409 when request is closed", () => __awaiter(void 0, void 0, void 0, function* () {
        const userIdStub = "1";
        const requestStub = { closed: true };
        req.params.id = userIdStub;
        client_1.default.skillSwapRequest.findFirst.mockReturnValueOnce(Promise.resolve(requestStub));
        yield errorModule.errorCatch(user_controller_1.request)(req, res, next);
        expect(errorModule.appAssert).toHaveBeenCalled();
        expect(errorModule.appAssert).toThrow();
        expect(client_1.default.skillSwapRequest.findFirst).toHaveBeenCalled();
        expect(client_1.default.skillSwapRequest.findFirst).toHaveBeenCalledWith(expect.objectContaining({
            where: {
                id: userIdStub,
            },
        }));
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(expect.any(assert_1.default.AssertionError));
    }));
    it("should return request with proper info", () => __awaiter(void 0, void 0, void 0, function* () {
        const userIdStub = "1";
        // User can provide requested skill and there are reviews
        let requestStub = {
            closed: false,
            requestedSkill: "jest",
            requester: { asReviewee: [{ rating: 1 }, { rating: 2 }, { rating: 3 }] },
        };
        req.params.id = userIdStub;
        userStub = { offeredSkills: ["jest"] };
        req.user = userStub;
        client_1.default.skillSwapRequest.findFirst.mockReturnValueOnce(Promise.resolve(requestStub));
        yield errorModule.errorCatch(user_controller_1.request)(req, res, next);
        expect(client_1.default.skillSwapRequest.findFirst).toHaveBeenCalledWith(expect.objectContaining({
            where: {
                id: userIdStub,
            },
        }));
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_1.STATUS_CODES.OK);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            request: requestStub,
            reviewScore: 6 / requestStub.requester.asReviewee.length,
            canProvideSkill: true,
        });
        // User cannot provide requested skill and there are no reviews
        req.user.offeredSkills = ["supertest"];
        requestStub.requester.asReviewee = [{ rating: 0 }];
        client_1.default.skillSwapRequest.findFirst.mockReturnValueOnce(Promise.resolve(requestStub));
        yield errorModule.errorCatch(user_controller_1.request)(req, res, next);
        expect(client_1.default.skillSwapRequest.findFirst).toHaveBeenCalledWith(expect.objectContaining({
            where: {
                id: userIdStub,
            },
        }));
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_1.STATUS_CODES.OK);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            request: requestStub,
            reviewScore: undefined,
            canProvideSkill: false,
        });
    }));
});
