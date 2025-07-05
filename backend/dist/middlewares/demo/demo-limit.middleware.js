"use strict";
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
exports.demoLimitForUserAccount = exports.demoLimitForSkillswapRequest = exports.demoLimitForSkillswapSession = void 0;
const error_1 = require("../../lib/error");
const client_1 = __importDefault(require("../../db/client"));
const http_1 = require("../../constants/http");
// resource limits
const DEMO_LIMIT = 10;
const USER_ACCOUNT_LIMIT = 100;
const demoLimitForSkillswapSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const createdSessionCount = yield client_1.default.skillSwapSession.count({
        where: {
            skillswapRequest: {
                OR: [
                    {
                        requesterId: user.id,
                    },
                    {
                        accepterId: user.id,
                    },
                ],
            },
        },
    });
    (0, error_1.appAssert)(createdSessionCount <= DEMO_LIMIT, http_1.STATUS_CODES.TOO_MANY_REQUEST, "You've reached the demo limit.");
    next();
});
exports.demoLimitForSkillswapSession = demoLimitForSkillswapSession;
const demoLimitForSkillswapRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const createdRequestCount = yield client_1.default.skillSwapRequest.count({
        where: {
            requesterId: user.id,
        },
    });
    (0, error_1.appAssert)(createdRequestCount <= DEMO_LIMIT, http_1.STATUS_CODES.TOO_MANY_REQUEST, "You've reached the demo limit.");
    next();
});
exports.demoLimitForSkillswapRequest = demoLimitForSkillswapRequest;
const demoLimitForUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUserAccountCount = yield client_1.default.user.count({});
    (0, error_1.appAssert)(createdUserAccountCount <= USER_ACCOUNT_LIMIT, http_1.STATUS_CODES.TOO_MANY_REQUEST, "Demo limit reached! Cannot create account. Please contact developer.");
    next();
});
exports.demoLimitForUserAccount = demoLimitForUserAccount;
