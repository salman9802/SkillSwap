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
exports.dashboard = exports.skillswapSessionChat = exports.reviewSkillswapSession = exports.rejectSkillswapSession = exports.updateSkillswapSession = exports.skillswapSession = exports.skillswapSessions = exports.newSkillSwapSession = exports.request = exports.marketplace = exports.createNewRequest = exports.updateUserPicture = exports.updateUser = exports.deleteUserSession = exports.userAccountDetails = exports.newAccessToken = exports.newUserSession = exports.createUserAccount = void 0;
const schemas_1 = require("../lib/schemas");
const http_1 = require("../constants/http");
const UserService = __importStar(require("../services/user.service"));
const error_1 = require("../lib/error");
const cookie_1 = require("../lib/cookie");
const env_1 = require("../constants/env");
const error_2 = require("../constants/error");
const client_1 = __importDefault(require("../db/client"));
const sanitize_1 = require("../lib/sanitize");
const createUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedUser = schemas_1.newUserSchema.parse(Object.assign({}, req.body));
    // check for existing user
    const existingUser = yield client_1.default.user.findFirst({
        where: {
            OR: [{ name: parsedUser.name }, { email: parsedUser.email }],
        },
    });
    if (existingUser !== null) {
        (0, error_1.appAssert)(existingUser.name !== parsedUser.name, http_1.STATUS_CODES.CONFLICT, "Name already exists");
        (0, error_1.appAssert)(existingUser.email !== parsedUser.email, http_1.STATUS_CODES.CONFLICT, "Email already exists");
    }
    const user = yield UserService.createUser(parsedUser);
    const userSession = yield UserService.createUserSession(user.id);
    const { accessToken, refreshToken } = UserService.createAccessAndRefreshTokens(userSession);
    (0, cookie_1.setAuthCookies)({ res, refreshToken }).status(http_1.STATUS_CODES.CREATED).json({
        user,
        accessToken,
    });
});
exports.createUserAccount = createUserAccount;
const newUserSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedUser = schemas_1.existingUserSchema.parse(Object.assign({}, req.body));
    const existingUser = yield UserService.validateUser(parsedUser);
    (0, error_1.appAssert)(existingUser !== null, http_1.STATUS_CODES.NOT_FOUND, "User doesn't exist");
    (0, error_1.appAssert)(existingUser !== false, http_1.STATUS_CODES.BAD_REQUEST, "Invalid credentials");
    const userSession = yield UserService.createUserSession(existingUser.id);
    const { accessToken, refreshToken } = UserService.createAccessAndRefreshTokens(userSession);
    (0, cookie_1.setAuthCookies)({ res, refreshToken }).status(http_1.STATUS_CODES.OK).json({
        user: existingUser,
        accessToken,
    });
});
exports.newUserSession = newUserSession;
const newAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.signedCookies[env_1.ENV.REFRESH_TOKEN_COOKIE];
    (0, error_1.appAssert)(refreshToken, http_1.STATUS_CODES.UNAUTHORIZED, "Token not found");
    const userSession = yield UserService.validateSession(refreshToken);
    (0, error_1.appAssert)(userSession !== null && userSession !== false, http_1.STATUS_CODES.UNAUTHORIZED, "Session expired or does not exists");
    // appAssert(
    //   userSession !== false,
    //   STATUS_CODES.UNAUTHORIZED,
    //   "Session expired or does not exists"
    // );
    const accessToken = UserService.createAccessToken(userSession);
    const user = yield client_1.default.user.findFirst({
        where: {
            id: userSession.userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
        },
    });
    res.status(http_1.STATUS_CODES.OK).json({
        accessToken,
        user,
    });
});
exports.newAccessToken = newAccessToken;
const userAccountDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    (0, error_1.appAssert)(user, http_1.STATUS_CODES.UNAUTHORIZED, "Unauthorized access");
    res.status(http_1.STATUS_CODES.OK).json({
        user,
    });
});
exports.userAccountDetails = userAccountDetails;
const deleteUserSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    yield UserService.deleteUserSession(user === null || user === void 0 ? void 0 : user.id);
    (0, cookie_1.unsetAuthCookies)(res).status(http_1.STATUS_CODES.OK).end();
});
exports.deleteUserSession = deleteUserSession;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = req.body;
    const parsedData = schemas_1.updateUserSchema.parse(userData);
    const user = yield UserService.updateUserDetails((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, parsedData);
    res.status(http_1.STATUS_CODES.OK).json({
        message: "Update successful",
        user: (0, sanitize_1.sanitizeUser)(user),
    });
});
exports.updateUser = updateUser;
const updateUserPicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    (0, error_1.appAssert)(req.file, http_1.STATUS_CODES.BAD_REQUEST, "No file format");
    // update user
    yield UserService.updateUserDetails((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, {
        picture: `/uploads/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename}`,
    });
    res.status(http_1.STATUS_CODES.OK).json({
        message: "File upload success",
        file: {
            filename: (_c = req.file) === null || _c === void 0 ? void 0 : _c.filename,
            path: `/uploads/${(_d = req.file) === null || _d === void 0 ? void 0 : _d.filename}`,
        },
    });
});
exports.updateUserPicture = updateUserPicture;
const createNewRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const newRequest = req.body;
    // check for user's timezone
    (0, error_1.appAssert)((_a = req.user) === null || _a === void 0 ? void 0 : _a.timezone, http_1.STATUS_CODES.BAD_REQUEST, "You do not have a timezone. Cannot create request");
    //  validate input data
    const parsedRequest = schemas_1.newRequestSchema.parse(Object.assign(Object.assign({}, newRequest), { timezone: (_b = req.user) === null || _b === void 0 ? void 0 : _b.timezone }));
    // create new request
    const request = yield UserService.newRequest(req.user, parsedRequest);
    res.status(http_1.STATUS_CODES.OK).json({
        message: "Request created successfully",
        request,
    });
});
exports.createNewRequest = createNewRequest;
const marketplace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const limit = isNaN(parseInt((req.query.limit as string | undefined) || ""))
    //   ? parseInt(req.query.limit as string)
    //   : 10; // Default limit
    // const limit = req.query.limit ? parseInt(req.query.limit as string) : 0; // Default offset
    // const offset = req.query.offset ? parseInt(req.query.offset as string) : 0; // Default offset
    // const limit = req.query.limit ? Number(req.query.limit) : 10;
    // const offset = Number(req.query.limit ?? 0);
    // console.log(typeof req.query.limit);
    // console.log(req.query.limit);
    // console.log(!!req.query.limit);
    // console.log(limit, offset);
    // validate filter options
    const filters = req.query;
    const parsed = schemas_1.marketplaceParamsSchema.parse(Object.assign({}, filters));
    // TODO
    // const where = {
    //   availability: parsed.availability
    //     ? {
    //         some: parsed.availability,
    //       }
    //     : undefined,
    //   requestedSkill: parsed.offeredSkill
    //     ? {
    //         in: parsed.offeredSkill, // w.r.t. current user
    //       }
    //     : undefined,
    //   requester: parsed.requestedSkill.length
    //     ? {
    //         offeredSkills: {
    //           hasSome: parsed.requestedSkill, // w.r.t. current user
    //         },
    //       }
    //     : undefined,
    // };
    // const where = {
    //   // availability: parsed.availability
    //   availability: parsed.date
    //     ? {
    //         some: parsed.date,
    //       }
    //     : undefined,
    //   // requestedSkill: parsed.offeredSkill
    //   //   ? {
    //   //       in: parsed.offeredSkill, // w.r.t. current user
    //   //     }
    //   //   : undefined,
    //   // requester: parsed.requestedSkill.length
    //   //   ? {
    //   //       offeredSkills: {
    //   //         hasSome: parsed.requestedSkill, // w.r.t. current user
    //   //       },
    //   //     }
    //   //   : undefined,
    // };
    const where = {
        closed: false,
        availability: parsed.date
            ? {
                some: { date: new Date(parsed.date) },
            }
            : undefined,
        requester: {
            offeredSkills: parsed.offeredSkills
                ? {
                    hasEvery: parsed.offeredSkills.split(","),
                }
                : undefined,
        },
        requestedSkill: parsed.requestedSkill,
    };
    // fetch from db
    const [requests, totalCount] = yield Promise.all([
        client_1.default.skillSwapRequest.findMany({
            skip: parsed.offset,
            // take: parsed.limit,
            take: 8,
            where,
            select: {
                id: true,
                requester: {
                    select: {
                        name: true,
                        offeredSkills: true,
                    },
                },
                requestedSkill: true,
                createdAt: true,
                availability: true,
            },
        }),
        client_1.default.skillSwapRequest.count({ where }),
        // prisma.skillSwapRequest.count({}),
    ]);
    const offeredSkillQueryMatchedRequests = parsed.offeredSkillQuery === undefined
        ? requests
        : requests.filter((r) => r.requester.offeredSkills.includes(parsed.offeredSkillQuery));
    res.status(http_1.STATUS_CODES.OK).json({
        requests: offeredSkillQueryMatchedRequests,
        totalCount: parsed.offeredSkillQuery === undefined
            ? totalCount
            : offeredSkillQueryMatchedRequests.length,
    });
});
exports.marketplace = marketplace;
const request = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    (0, error_1.appAssert)(id, http_1.STATUS_CODES.NOT_FOUND);
    const request = yield client_1.default.skillSwapRequest.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            requestedSkill: true,
            createdAt: true,
            availability: {
                select: {
                    id: true,
                    date: true,
                },
            },
            requester: {
                select: {
                    id: true,
                    name: true,
                    offeredSkills: true,
                    asReviewee: {
                        select: {
                            rating: true,
                        },
                    },
                    picture: true,
                },
            },
            closed: true,
        },
    });
    (0, error_1.appAssert)(request !== null, http_1.STATUS_CODES.NOT_FOUND);
    (0, error_1.appAssert)(!request.closed, http_1.STATUS_CODES.CONFLICT, "Request closed");
    const reviewScore = request === null || request === void 0 ? void 0 : request.requester.asReviewee.reduce((previousValue, review) => previousValue + review.rating, 0);
    res.status(http_1.STATUS_CODES.OK).json({
        request,
        reviewScore: reviewScore !== 0
            ? reviewScore / request.requester.asReviewee.length
            : undefined,
        canProvideSkill: user.offeredSkills.includes(request.requestedSkill),
    });
});
exports.request = request;
const newSkillSwapSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accepter = req.user;
    const parsed = schemas_1.newSkillSwapSessionSchema.parse(Object.assign({}, req.body));
    // close request
    const result = yield UserService.acceptAndCloseRequest(accepter.id, parsed.requestId);
    (0, error_1.appAssert)(result, http_1.STATUS_CODES.CONFLICT, "Request closed. Session already present");
    // new entry in db
    const session = yield UserService.createSkillSwapSession(parsed);
    res.status(http_1.STATUS_CODES.OK).json({
        message: "Session created successfully",
        session,
    });
});
exports.newSkillSwapSession = newSkillSwapSession;
const skillswapSessions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const parsed = schemas_1.paginationSchema.parse(Object.assign({}, req.query));
    const [sessions, totalCount] = yield Promise.all([
        client_1.default.skillSwapSession.findMany({
            skip: parsed.offset,
            take: parsed.limit,
            where: {
                OR: [
                    {
                        skillswapRequest: {
                            accepterId: user.id,
                        },
                    },
                    {
                        skillswapRequest: {
                            requesterId: user.id,
                        },
                    },
                ],
            },
            select: {
                id: true,
                createdAt: true,
                status: true,
                offeredSkill: true,
                schedule: true,
                skillswapRequest: {
                    select: {
                        requestedSkill: true,
                        requesterId: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        client_1.default.skillSwapSession.count({
            where: {
                OR: [
                    {
                        skillswapRequest: {
                            accepterId: user.id,
                        },
                    },
                    {
                        skillswapRequest: {
                            requesterId: user.id,
                        },
                    },
                ],
            },
        }),
    ]);
    res.status(http_1.STATUS_CODES.OK).json({
        sessions: sessions.map((session) => (Object.assign(Object.assign({}, session), { schedule: session.schedule.date, isRequester: session.skillswapRequest.requesterId === user.id, skillswapRequest: Object.assign(Object.assign({}, session.skillswapRequest), { requesterId: undefined }) }))),
        totalCount,
    });
});
exports.skillswapSessions = skillswapSessions;
const skillswapSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    const session = yield client_1.default.skillSwapSession.findFirst({
        where: {
            id,
        },
        select: {
            status: true,
            offeredSkill: true,
            schedule: {
                select: {
                    date: true,
                },
            },
            review: {
                select: {
                    reviewerId: true,
                },
            },
            skillswapRequest: {
                select: {
                    requesterId: true,
                    accepterId: true,
                    requestedSkill: true,
                    requester: {
                        select: {
                            name: true,
                            picture: true,
                        },
                    },
                    accepter: {
                        select: {
                            name: true,
                            picture: true,
                        },
                    },
                },
            },
        },
    });
    res.status(http_1.STATUS_CODES.OK).json({
        session: Object.assign(Object.assign({}, session), { isRequester: (session === null || session === void 0 ? void 0 : session.skillswapRequest.requesterId) === user.id, 
            // hasReviewed: session?.review
            //   ? session?.review[0]?.reviewerId === user.id
            //   : false,
            hasReviewed: (session === null || session === void 0 ? void 0 : session.review.filter((r) => r.reviewerId === user.id).length) !== 0 }),
    });
});
exports.skillswapSession = skillswapSession;
const updateSkillswapSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const session = yield UserService.updateSkillSwapSessionStatus({
        sessionId: id,
        userId: req.user.id,
    });
    (0, error_1.appAssert)(session, http_1.STATUS_CODES.CONFLICT, "Session is closed", error_2.AppErrorCodes.SESSION_CLOSED);
    res.status(http_1.STATUS_CODES.OK).json({
        message: "Session updated successfully",
        session,
    });
});
exports.updateSkillswapSession = updateSkillswapSession;
const rejectSkillswapSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    // user must either be a requester or accepter
    const session = yield client_1.default.skillSwapSession.findFirst({
        where: {
            id,
        },
        select: {
            skillswapRequest: {
                select: {
                    requesterId: true,
                    accepterId: true,
                },
            },
        },
    });
    (0, error_1.appAssert)(session !== null, http_1.STATUS_CODES.BAD_REQUEST, "No session");
    (0, error_1.appAssert)((session === null || session === void 0 ? void 0 : session.skillswapRequest.requesterId) === user.id ||
        (session === null || session === void 0 ? void 0 : session.skillswapRequest.accepterId) === user.id, http_1.STATUS_CODES.FORBIDDEN);
    // update session
    yield client_1.default.skillSwapSession.update({
        where: {
            id,
        },
        data: {
            status: "CANCELLED",
        },
    });
    res.status(http_1.STATUS_CODES.OK).json({
        message: "Session rejected",
    });
});
exports.rejectSkillswapSession = rejectSkillswapSession;
const reviewSkillswapSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // skillswapSessionId
    const { id } = req.params;
    // reviewerId
    const user = req.user;
    // verify if user is part of session and have not reviewed yet
    const session = yield client_1.default.skillSwapSession.findFirst({
        where: {
            id,
        },
        select: {
            review: {
                select: {
                    reviewerId: true,
                },
            },
            skillswapRequest: {
                select: {
                    requesterId: true,
                    accepterId: true,
                },
            },
        },
    });
    (0, error_1.appAssert)(user.id === (session === null || session === void 0 ? void 0 : session.skillswapRequest.accepterId) ||
        user.id === (session === null || session === void 0 ? void 0 : session.skillswapRequest.requesterId), http_1.STATUS_CODES.FORBIDDEN);
    (0, error_1.appAssert)((session === null || session === void 0 ? void 0 : session.review.filter((r) => r.reviewerId === user.id).length) === 0, http_1.STATUS_CODES.CONFLICT, "Can only review once");
    const parsed = schemas_1.skillswapSessionReviewSchema.parse(Object.assign({}, req.body));
    yield UserService.createSkillswapSessionReview({
        review: parsed,
        sessionId: id,
        reviewerId: user.id,
    });
    res.status(http_1.STATUS_CODES.OK).send();
});
exports.reviewSkillswapSession = reviewSkillswapSession;
const skillswapSessionChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // sessionId
    const { id } = req.params;
    const messages = yield client_1.default.skillSwapSessionChatMessage.findMany({
        where: {
            skillswapSessionId: id,
        },
        select: {
            content: true,
            senderId: true,
        },
    });
    res.status(http_1.STATUS_CODES.OK).json({
        messages,
    });
});
exports.skillswapSessionChat = skillswapSessionChat;
const dashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { timePeriod } = schemas_1.dashboardQueryParamsSchema.parse(req.query);
    // total sessions completed
    const totalSessionsCompleted = yield client_1.default.skillSwapSession.count({
        where: {
            AND: [
                { status: "CLOSED" },
                {
                    OR: [
                        {
                            skillswapRequest: {
                                requesterId: user.id,
                            },
                        },
                        {
                            skillswapRequest: {
                                accepterId: user.id,
                            },
                        },
                    ],
                },
            ],
        },
    });
    // total requests created
    const totalRequestsCreated = yield client_1.default.skillSwapRequest.count({
        where: {
            requesterId: user.id,
        },
    });
    // total requests closed
    const totalRequestsCompleted = yield client_1.default.skillSwapRequest.count({
        where: {
            AND: [
                {
                    closed: true,
                },
                {
                    OR: [
                        {
                            requesterId: user.id,
                        },
                        {
                            accepterId: user.id,
                        },
                    ],
                },
            ],
        },
    });
    // total sessions cancelled
    const totalSessionsCancelled = yield client_1.default.skillSwapSession.count({
        where: {
            AND: [
                { status: "CANCELLED" },
                {
                    OR: [
                        {
                            skillswapRequest: {
                                requesterId: user.id,
                            },
                        },
                        {
                            skillswapRequest: {
                                accepterId: user.id,
                            },
                        },
                    ],
                },
            ],
        },
    });
    // total chat messages created
    const totalChatMessagesCreated = yield client_1.default.skillSwapSessionChatMessage.count({
        where: {
            senderId: user.id,
        },
    });
    // TODO: sessions completed (graph)
    /*
    Last week - date=YYYY-mm-dd (start date)
    Last month - (some kind of number)
    Last 3 month - (some kind of number) (start month)
     */
    // let date;
    // date = new Date();
    // date.setUTCSeconds(date.getUTCSeconds() - 60 * 60 * 24 * 7);
    // const lastWeek = date.toISOString().split("T")[0];
    // date = new Date();
    // date.setUTCMonth(date.getUTCMonth() - 1);
    // const lastMonth = date.getMonth();
    // const rangeStart = new Date();
    const rangeEnd = new Date();
    const rangeStart = new Date(Date.UTC(rangeEnd.getUTCFullYear(), rangeEnd.getUTCMonth(), rangeEnd.getUTCDate(), 0, 0, 0, 0));
    switch (timePeriod) {
        case "last_week":
            rangeStart.setUTCDate(rangeStart.getUTCDate() - 7);
            break;
        case "last_month":
            rangeStart.setUTCMonth(rangeStart.getUTCMonth() - 1);
            break;
        case "last_3_months":
            rangeStart.setUTCMonth(rangeStart.getUTCMonth() - 3);
            break;
        default:
            res.status(http_1.STATUS_CODES.BAD_REQUEST);
            break;
    }
    // set time 00:00:00:0000
    rangeStart.setUTCHours(0, 0, 0, 0);
    // const result = await prisma.$runCommandRaw({
    //   aggregate: "skillswap_sessions",
    //   // pipeline: [],
    //   pipeline: [
    //   {
    //     $match: {
    //       createdAt: {
    //         $gte: new Date(rangeStart.toISOString()),
    //       },
    //       status: "CLOSED",
    //     },
    //     // $match: {
    //     //   $expr: {
    //     //     $gte: ["$createdAt", rangeStart], // rangeStart is a Date object
    //     //   },
    //     //   status: "active",
    //     // },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         $dateToString: {
    //           format: "%Y-%m-%d",
    //           date: "$createdAt",
    //         },
    //       },
    //       count: { $sum: 1 },
    //     },
    //   },
    //   // { $group: { _id: "$createdAt", count: { $sum: 1 } } },
    //   { $sort: { _id: 1 } },
    //   {
    //     $project: {
    //       _id: 0,
    //       date: "$_id",
    //       count: 1,
    //     },
    //   },
    // ],
    //   cursor: {}, // required when using runCommandRaw for aggregation
    // });
    // as {
    //   cursor: {
    //     firstBatch: any;
    //     // firstBatch: {
    //     //   date: string;
    //     //   count: number;
    //     // };
    //   };
    // };
    // const sessionsClosedInRange = result;
    // const sessionsClosedInRange = result.cursor?.firstBatch;
    // 1. Fetch all matching sessions
    const sessions = yield client_1.default.skillSwapSession.findMany({
        where: {
            createdAt: { gte: rangeStart },
            status: "CLOSED",
        },
        select: {
            createdAt: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    // 2. Group by date (ignoring time)
    const countsByDate = {};
    for (const session of sessions) {
        // const day = formatISO(startOfDay(session.createdAt), { representation: 'date' });
        const day = session.createdAt.toISOString().split("T")[0];
        countsByDate[day] = (countsByDate[day] || 0) + 1;
    }
    // 3. Convert to desired format
    // const sessionsClosedInRange = Object.entries(countsByDate)
    //   .map(([date, count]) => ({ date, count }))
    //   .sort((a, b) => a.date.localeCompare(b.date));
    res.status(http_1.STATUS_CODES.OK).json({
        totalSessionsCompleted,
        totalRequestsCreated,
        totalRequestsCompleted,
        totalSessionsCancelled,
        totalChatMessagesCreated,
        sessionsClosedInRange: countsByDate,
        rangeStart,
        rangeEnd,
        //   test: await prisma.skillSwapSession.findMany({
        //     where: {
        //       createdAt: { gte: rangeStart },
        //       status: "CLOSED", // or use a variable
        //     },
        //     // take: 1,
        //   }),
    });
});
exports.dashboard = dashboard;
