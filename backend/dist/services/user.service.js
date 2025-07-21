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
exports.checkDailyLoginReward = exports.createSkillswapSessionReview = exports.updateSkillSwapSessionStatus = exports.createSkillSwapSession = exports.acceptAndCloseRequest = exports.newRequest = exports.updateUserDetails = exports.deleteUserSession = exports.validateAccessToken = exports.validateRefreshToken = exports.validateSession = exports.createAccessAndRefreshTokens = exports.createAccessToken = exports.validateUser = exports.createUserSession = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../constants/env");
const client_1 = __importDefault(require("../db/client"));
const bcrypt_1 = require("../lib/bcrypt");
const error_1 = require("../lib/error");
const http_1 = require("../constants/http");
const error_2 = require("../constants/error");
const sanitize_1 = require("../lib/sanitize");
const user_1 = require("../constants/user");
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.create({
        data: newUser,
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    return user;
});
exports.createUser = createUser;
/** create new session or update existing one */
const createUserSession = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUserSession = yield client_1.default.userSession.findFirst({
        where: {
            userId,
        },
    });
    if (existingUserSession === null) {
        // create new session
        const userSession = yield client_1.default.userSession.create({
            data: {
                userId,
                expiresAt: new Date(Date.now() + env_1.ENV.REFRESH_TOKEN_INTERVAL),
            },
        });
        return userSession;
    }
    else {
        // update existing one
        const userSession = yield client_1.default.userSession.update({
            data: {
                userId,
                expiresAt: new Date(Date.now() + env_1.ENV.REFRESH_TOKEN_INTERVAL),
            },
            where: {
                userId,
            },
        });
        return userSession;
    }
});
exports.createUserSession = createUserSession;
/** Check if user is an existing user with valid credentials */
const validateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield client_1.default.user.findFirst({
        where: {
            email: user.email,
        },
    });
    if (existingUser === null)
        return null;
    const hasValidPassword = yield (0, bcrypt_1.comparePassword)(user.password, existingUser.password);
    if (hasValidPassword)
        return (0, sanitize_1.sanitizeUser)(existingUser);
    else
        return false;
});
exports.validateUser = validateUser;
/** Creates an access token from session */
const createAccessToken = (userSession) => {
    // ⚠️ expiresIn is duration in seconds, NOT a Unix timestamp!
    // 15 minutes from now = 900 seconds
    const accessToken = jsonwebtoken_1.default.sign({ id: userSession.id, uid: userSession.userId }, env_1.ENV.ACCESS_TOKEN_SECRET, {
        expiresIn: env_1.ENV.ACCESS_TOKEN_INTERVAL / 1000,
    });
    return accessToken;
};
exports.createAccessToken = createAccessToken;
/** Creates an access & refresh tokens from session */
const createAccessAndRefreshTokens = (userSession) => {
    // ⚠️ expiresIn is duration in seconds, NOT a Unix timestamp!
    // 15 minutes from now = 900 seconds
    const refreshToken = jsonwebtoken_1.default.sign({
        id: userSession.id,
    }, env_1.ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: env_1.ENV.REFRESH_TOKEN_INTERVAL / 1000,
    });
    return { refreshToken, accessToken: (0, exports.createAccessToken)(userSession) };
};
exports.createAccessAndRefreshTokens = createAccessAndRefreshTokens;
/** Validates if a session is valid & deletes expired session */
const validateSession = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshPayload = (0, exports.validateRefreshToken)(refreshToken);
    const userSession = yield client_1.default.userSession.findFirst({
        where: {
            id: refreshPayload === null || refreshPayload === void 0 ? void 0 : refreshPayload.id,
        },
    });
    if (userSession === null)
        return null;
    if (Date.now() < userSession.expiresAt.getTime()) {
        // if not expired
        yield client_1.default.userSession.update({
            data: {
                expiresAt: new Date(Date.now() + env_1.ENV.REFRESH_TOKEN_INTERVAL),
            },
            where: {
                id: refreshPayload.id,
            },
        });
        return userSession;
    }
    else {
        // if expired
        yield client_1.default.userSession.delete({
            where: {
                id: refreshPayload.id,
            },
        });
        return false;
    }
});
exports.validateSession = validateSession;
/** Returns refresh token if valid or throws App error if expired */
const validateRefreshToken = (refreshToken) => {
    try {
        const refreshPayload = jsonwebtoken_1.default.verify(refreshToken, env_1.ENV.REFRESH_TOKEN_SECRET);
        return refreshPayload;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError)
            (0, error_1.appAssert)(false, http_1.STATUS_CODES.UNAUTHORIZED, "Refresh token expired", error_2.AppErrorCodes.REFRESH_TOKEN_EXPIRED);
        else
            (0, error_1.appAssert)(false, http_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong", error_2.AppErrorCodes.SERVER_ERROR);
    }
};
exports.validateRefreshToken = validateRefreshToken;
/** Returns access token if valid or throws App error if expired */
const validateAccessToken = (accessToken) => {
    try {
        const accessPayload = jsonwebtoken_1.default.verify(accessToken, env_1.ENV.ACCESS_TOKEN_SECRET);
        return accessPayload;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError)
            (0, error_1.appAssert)(false, http_1.STATUS_CODES.UNAUTHORIZED, "Access token expired", error_2.AppErrorCodes.ACCESS_TOKEN_EXPIRED);
        else
            (0, error_1.appAssert)(false, http_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong", error_2.AppErrorCodes.SERVER_ERROR);
    }
};
exports.validateAccessToken = validateAccessToken;
/** Converts `User` into `SafeUser` by removing sensitive info */
// export const sanitizeUser = (user: User): SafeUser => {
//   const { password, ...safeUser } = user;
//   return safeUser;
// };
const deleteUserSession = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (userId === undefined)
        return;
    yield client_1.default.userSession.deleteMany({
        where: {
            userId: userId,
        },
    });
});
exports.deleteUserSession = deleteUserSession;
const updateUserDetails = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.user.update({
        where: {
            id: userId,
        },
        data: userData,
    });
});
exports.updateUserDetails = updateUserDetails;
const newRequest = (user, request) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.skillSwapRequest.create({
        data: {
            requesterTimezone: user.timezone,
            requesterId: user.id,
            requestedSkill: request.requestedSkill,
            availability: {
                create: request.availability,
            },
            // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // availability: {
            //   date: request.availability
            // }
            // availability: { create: request.availability },
        },
    });
});
exports.newRequest = newRequest;
const acceptAndCloseRequest = (accepterId, requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield client_1.default.skillSwapRequest.findFirst({
        where: {
            id: requestId,
        },
    });
    if (request === null || request === void 0 ? void 0 : request.closed)
        return false;
    return yield client_1.default.skillSwapRequest.update({
        data: {
            closed: true,
            closedAt: new Date(),
            accepterId,
        },
        where: {
            id: requestId,
        },
    });
});
exports.acceptAndCloseRequest = acceptAndCloseRequest;
const createSkillSwapSession = (newSkillSwapSession) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.skillSwapSession.create({
        data: {
            offeredSkill: newSkillSwapSession.offeredSkill,
            scheduleId: newSkillSwapSession.scheduleId,
            skillswapRequestId: newSkillSwapSession.requestId,
        },
    });
});
exports.createSkillSwapSession = createSkillSwapSession;
const updateSkillSwapSessionStatus = (_a) => __awaiter(void 0, [_a], void 0, function* ({ sessionId, userId, }) {
    // TODO
    const session = yield client_1.default.skillSwapSession.findFirst({
        where: {
            id: sessionId,
        },
        select: {
            status: true,
            schedule: true,
            review: true,
            skillswapRequest: {
                select: {
                    requesterId: true,
                    accepterId: true,
                    requesterTimezone: true,
                },
            },
        },
    });
    (0, error_1.appAssert)(session !== null, http_1.STATUS_CODES.BAD_REQUEST, "Session not found");
    (0, error_1.appAssert)((session === null || session === void 0 ? void 0 : session.status) !== "CANCELLED", http_1.STATUS_CODES.FORBIDDEN, "Sesssion was rejected", error_2.AppErrorCodes.SESSION_REJECTED);
    // appAssert(
    //   session?.status !== "CLOSED",
    //   STATUS_CODES.FORBIDDEN,
    //   "Sesssion already closed",
    //   AppErrorCodes.SESSION_CLOSED
    // );
    switch (session === null || session === void 0 ? void 0 : session.status) {
        case "OPEN":
            // OPEN -> ACCEPTED
            (0, error_1.appAssert)(userId === session.skillswapRequest.accepterId, http_1.STATUS_CODES.FORBIDDEN, "Accepter hasn't confirmed the session.");
            return yield client_1.default.skillSwapSession.update({
                data: {
                    status: "ACCEPTED",
                },
                where: {
                    id: sessionId,
                },
            });
        case "ACCEPTED":
            // ACCEPTED -> SCHEDULED
            (0, error_1.appAssert)(userId === session.skillswapRequest.requesterId, http_1.STATUS_CODES.FORBIDDEN, "Requester hasn't confirmed the session.");
            return yield client_1.default.skillSwapSession.update({
                data: {
                    status: "SCHEDULED",
                },
                where: {
                    id: sessionId,
                },
            });
        case "SCHEDULED":
            // SCHEDULED -> FINISHED
            (0, error_1.appAssert)(userId === session.skillswapRequest.accepterId ||
                userId === session.skillswapRequest.requesterId, http_1.STATUS_CODES.FORBIDDEN);
            // const date = moment.tz(
            //   `${session.schedule.date} ${session.schedule.endTime}`,
            //   session.skillswapRequest.requesterTimezone
            // );
            // const [hour, minute] = session.schedule.endTime.split(":").map(Number);
            // session.schedule.date.setHours(hour, minute)
            if (session.schedule.date.getTime() < Date.now()) {
                // schedule has passed
                return yield client_1.default.skillSwapSession.update({
                    data: {
                        status: "FINISHED",
                    },
                    where: {
                        id: sessionId,
                    },
                });
            }
            else {
                (0, error_1.appAssert)(false, http_1.STATUS_CODES.CONFLICT, "Session has yet to take place");
            }
            break;
        case "FINISHED":
            // FINISHED -> CLOSED
            const hasReviewed = (yield client_1.default.skillSwapSession.count({
                where: {
                    AND: [
                        { id: sessionId },
                        {
                            review: {
                                some: {
                                    reviewerId: userId,
                                },
                            },
                        },
                    ],
                },
            })) > 0;
            const hasBeenReviewed = (yield client_1.default.skillSwapSession.count({
                where: {
                    AND: [
                        { id: sessionId },
                        {
                            review: {
                                some: {
                                    revieweeId: userId,
                                },
                            },
                        },
                    ],
                },
            })) > 0;
            (0, error_1.appAssert)(hasReviewed && hasBeenReviewed, http_1.STATUS_CODES.CONFLICT, "Session can only be closed after both users have rated each other.");
            return yield client_1.default.skillSwapSession.update({
                data: {
                    status: "CLOSED",
                },
                where: {
                    id: sessionId,
                },
            });
        default:
            return false;
    }
});
exports.updateSkillSwapSessionStatus = updateSkillSwapSessionStatus;
const createSkillswapSessionReview = (_a) => __awaiter(void 0, [_a], void 0, function* ({ review, sessionId, reviewerId, }) {
    if (review.coins !== 0) {
        yield client_1.default.user.update({
            where: {
                id: review.revieweeId,
            },
            data: {
                coins: {
                    increment: review.coins,
                },
            },
        });
    }
    return yield client_1.default.skillSwapSession.update({
        where: {
            id: sessionId,
        },
        data: {
            review: {
                create: {
                    // ...review,
                    rating: review.rating,
                    revieweeId: review.revieweeId,
                    comment: review.comment,
                    reviewerId,
                },
            },
        },
    });
});
exports.createSkillswapSessionReview = createSkillswapSessionReview;
const checkDailyLoginReward = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.user.findFirst({
        where: {
            id: user.id,
        },
        select: {
            lastLoginDate: true,
            coins: true,
        },
    });
    const hasDailyLoginReward = (user === null || user === void 0 ? void 0 : user.lastLoginDate.getUTCDate()) !== new Date().getUTCDate();
    if (hasDailyLoginReward)
        yield client_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                coins: user.coins + user_1.DAILY_LOGIN_REWARD,
                lastLoginDate: new Date(),
            },
        });
    return hasDailyLoginReward;
});
exports.checkDailyLoginReward = checkDailyLoginReward;
