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
// import fs from "fs";
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// console.log("-".repeat(30));
// console.log(
//   fs.existsSync(path.join(__dirname, "..", "..", "..", "..", ".env.test"))
// );
// console.log("-".repeat(30));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, "..", "..", "..", "..", ".env.test"),
    override: true,
});
const supertest_1 = __importDefault(require("supertest"));
const client_1 = require("../../db/client");
const server_1 = require("../../server");
const rateLimiters = __importStar(require("../../middlewares/rate-limilt"));
const http_1 = require("../../constants/http");
const config_1 = require("../../config/config");
const error_1 = require("../../constants/error");
jest.mock("../../middlewares/rate-limilt");
describe("User Account", () => {
    const prismaClient = (0, client_1.createPrismaClient)();
    // const app = createExpressApp();
    const newUserStub = {
        name: "John Doe",
        email: "john@gmail.com",
        password: "Password1",
    };
    /** clean db before all tests */
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient.$connect();
        yield prismaClient.$transaction([
            prismaClient.userSession.deleteMany(),
            prismaClient.user.deleteMany(),
        ]);
    }));
    beforeEach(() => {
        jest.resetModules();
    });
    /** clean db after all tests */
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient.$transaction([
            prismaClient.userSession.deleteMany(),
            prismaClient.user.deleteMany(),
        ]);
        yield prismaClient.$disconnect();
    }));
    describe("POST /api/user/account", () => {
        it("should be rate limited", () => __awaiter(void 0, void 0, void 0, function* () {
            jest
                .spyOn(rateLimiters, "registerLimiter")
                .mockRejectedValueOnce("Rate Limit");
            try {
                yield (0, supertest_1.default)((0, server_1.createExpressApp)())
                    .post("/api/user/account")
                    .send(newUserStub);
            }
            catch (error) {
                expect(error.message).toEqual("Rate Limit");
            }
        }));
        it("should should not create account if demo limit reached", () => __awaiter(void 0, void 0, void 0, function* () {
            jest
                .spyOn(rateLimiters, "registerLimiter")
                .mockImplementation((req, res, next) => {
                next();
            });
            config_1.ServerConfig.override("USER_ACCOUNT_LIMIT", -1);
            const res = yield (0, supertest_1.default)((0, server_1.createExpressApp)())
                .post("/api/user/account")
                .send(newUserStub);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.TOO_MANY_REQUEST);
            expect(res.body.code).toEqual(error_1.AppErrorCodes.APP_ERROR);
            expect(res.body.message).toEqual("Demo limit reached! Cannot create account. Please contact developer.");
        }));
        it("should create account", () => __awaiter(void 0, void 0, void 0, function* () {
            config_1.ServerConfig.override("USER_ACCOUNT_LIMIT", 1);
            const res = yield (0, supertest_1.default)((0, server_1.createExpressApp)())
                .post("/api/user/account")
                .send(newUserStub);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(res.body.user).toBeDefined();
            expect(res.body.user.name).toEqual(newUserStub.name);
            expect(res.body.user.email).toEqual(newUserStub.email);
            expect(res.body.accessToken).toBeDefined();
        }));
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
