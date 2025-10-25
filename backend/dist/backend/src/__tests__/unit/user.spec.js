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
const client_1 = __importDefault(require("../../db/client"));
const schemas_1 = require("../../lib/schemas");
const user_controller_1 = require("../../controllers/user.controller");
const errorModule = __importStar(require("../../lib/error"));
const UserService = __importStar(require("../../services/user.service"));
const cookie_1 = require("../../lib/cookie");
const http_1 = require("../../constants/http");
/** Mock `ENV` with test env vars */
jest.mock("../../constants/env.ts", () => ({
    NODE_ENV: "test",
    DATABASE_URL: "",
    PORT: "80",
    ACCESS_TOKEN_SECRET: "67fd5165ebf6a8440fd53276e9afd1b9e3541b22c2e1eb064f15e6f12b81a5aa",
    REFRESH_TOKEN_SECRET: "3dc4c2fac44907123509d2991f3989557824fd481b6891d1631bb5ee289ee337",
    COOKIE_SECRET: "9300d259669b8de4fb3f8b3ef41ccbdd10a046f31f28385e74df87e48d6179b5",
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
let req, res, next;
describe("User registration", () => {
    const stubUser = { name: "test", email: "test", password: "test" };
    beforeEach(() => {
        // (newUserSchema.parse as jest.Mock).mockImplementation(() => null)
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should return errors when user with name or email exists", () => __awaiter(void 0, void 0, void 0, function* () {
        schemas_1.newUserSchema.parse.mockImplementationOnce(() => stubUser);
        client_1.default.user.findFirst.mockImplementationOnce(() => (Object.assign(Object.assign({}, stubUser), { email: stubUser.email + "test" })));
        jest.spyOn(errorModule, "appAssert").mockImplementationOnce(() => {
            throw new Error("test");
        });
        yield errorModule.errorCatch(user_controller_1.createUserAccount)(req, res, next);
        expect(client_1.default.user.findFirst).toHaveBeenCalled();
        expect(errorModule.appAssert).toThrow();
    }));
    it("should create user account", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = stubUser;
        const stubUserSession = {
            id: "2",
            userId: "2",
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        };
        const stubTokens = { accessToken: "access", refreshToken: "refresh" };
        const createdUserStub = Object.assign(Object.assign({}, stubUser), { id: "1" });
        schemas_1.newUserSchema.parse.mockImplementationOnce(() => stubUser);
        client_1.default.user.findFirst.mockReturnValueOnce(Promise.resolve(null));
        jest
            .spyOn(UserService, "createUser")
            .mockReturnValueOnce(Promise.resolve(createdUserStub));
        jest
            .spyOn(UserService, "createUserSession")
            .mockReturnValueOnce(Promise.resolve(stubUserSession));
        jest
            .spyOn(UserService, "createAccessAndRefreshTokens")
            .mockReturnValueOnce(stubTokens);
        cookie_1.setAuthCookies.mockReturnValueOnce(res);
        yield errorModule.errorCatch(user_controller_1.createUserAccount)(req, res, next);
        expect(UserService.createUser).toHaveBeenCalled();
        expect(UserService.createUser).toHaveBeenCalledWith(stubUser);
        expect(UserService.createUserSession).toHaveBeenCalled();
        expect(UserService.createUserSession).toHaveBeenCalledWith("1");
        expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalled();
        expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalledWith(stubUserSession);
        expect(cookie_1.setAuthCookies).toHaveBeenCalled();
        expect(cookie_1.setAuthCookies).toHaveBeenCalledWith({
            res,
            refreshToken: stubTokens.refreshToken,
        });
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_1.STATUS_CODES.CREATED);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            user: createdUserStub,
            accessToken: stubTokens.accessToken,
        });
    }));
});
describe("User login", () => {
    const userStub = { email: "test", password: "test" };
    /** mock new req, res, next for each test */
    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should throw error if user exists", () => __awaiter(void 0, void 0, void 0, function* () {
        jest
            .spyOn(UserService, "validateUser")
            .mockReturnValueOnce(Promise.resolve(null));
        yield errorModule.errorCatch(user_controller_1.newUserSession)(req, res, next);
        expect(errorModule.appAssert).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(expect.any(assert_1.default.AssertionError));
    }));
    it("should throw error if credentials are invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        jest
            .spyOn(UserService, "validateUser")
            .mockReturnValueOnce(Promise.resolve(false));
        yield errorModule.errorCatch(user_controller_1.newUserSession)(req, res, next);
        expect(errorModule.appAssert).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(expect.any(assert_1.default.AssertionError));
    }));
    it("should create session for user", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = userStub;
        const userSessionStub = {
            id: "2",
            userId: "2",
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        };
        const existingUserStub = { email: "test" };
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
        cookie_1.setAuthCookies.mockReturnValueOnce(res);
        yield errorModule.errorCatch(user_controller_1.newUserSession)(req, res, next);
        expect(UserService.createUserSession).toHaveBeenCalled();
        expect(UserService.createUserSession).toHaveBeenCalledWith(existingUserStub.id);
        expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalled();
        expect(UserService.createAccessAndRefreshTokens).toHaveBeenCalledWith(userSessionStub);
        expect(cookie_1.setAuthCookies).toHaveBeenCalled();
        expect(cookie_1.setAuthCookies).toHaveBeenCalledWith({
            res,
            refreshToken: tokensStub.refreshToken,
        });
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_1.STATUS_CODES.OK);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            user: existingUserStub,
            accessToken: tokensStub.accessToken,
        });
    }));
});
describe("User logout", () => {
    const userStub = { id: "1" };
    /** mock new req, res, next for each test */
    beforeEach(() => {
        req = { user: userStub };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            end: jest.fn(),
        };
        next = jest.fn();
    });
    it("should delete user session and unset cookies", () => __awaiter(void 0, void 0, void 0, function* () {
        cookie_1.unsetAuthCookies.mockReturnValueOnce(res);
        yield errorModule.errorCatch(user_controller_1.deleteUserSession)(req, res, next);
        expect(UserService.deleteUserSession).toHaveBeenCalled();
        expect(UserService.deleteUserSession).toHaveBeenCalledWith(userStub.id);
        expect(cookie_1.unsetAuthCookies).toHaveBeenCalled();
        expect(cookie_1.unsetAuthCookies).toHaveBeenCalledWith(res);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_1.STATUS_CODES.OK);
        expect(res.end).toHaveBeenCalled();
    }));
});
