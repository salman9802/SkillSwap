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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = require("../lib/error");
const UserController = __importStar(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_1 = require("../lib/multer");
const demo_limit_middleware_1 = require("../middlewares/demo/demo-limit.middleware");
const rate_limilt_1 = require("../middlewares/rate-limilt");
const user_middleware_1 = require("../middlewares/user.middleware");
const user_1 = require("../constants/user");
const userRouter = express_1.default.Router();
// Prefix: /api/user
userRouter.post("/session", rate_limilt_1.loginLimiter, (0, error_1.errorCatch)(UserController.newUserSession)); // Creates new refresh & access token (login)
userRouter.get("/session/access", (0, error_1.errorCatch)(UserController.newAccessToken)); // Creates new access token (refresh)
userRouter.delete("/session", (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.deleteUserSession)); // (logout)
// user account routes
userRouter
    .route("/account")
    .post(rate_limilt_1.registerLimiter, (0, error_1.errorCatch)(demo_limit_middleware_1.demoLimitForUserAccount), (0, error_1.errorCatch)(UserController.createUserAccount)) // Creates new user account (registeration)
    .get((0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.userAccountDetails)) // get user account details
    .put((0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.updateUser)); // update user
userRouter.put("/upload-picture", (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(multer_1.upload.single("picture")), (0, error_1.errorCatch)(UserController.updateUserPicture)); // update user picture
userRouter.get("/dashboard", rate_limilt_1.readRateLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.dashboard));
userRouter.post("/new-request", rate_limilt_1.createLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(demo_limit_middleware_1.demoLimitForSkillswapRequest), (0, error_1.errorCatch)((0, user_middleware_1.requiredCoins)(user_1.NEW_REQUEST_FEE)), (0, error_1.errorCatch)(UserController.createNewRequest));
userRouter.get("/marketplace", rate_limilt_1.readRateLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.marketplace));
userRouter.get("/request/:id", rate_limilt_1.readRateLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.request));
userRouter.post("/ss-session", rate_limilt_1.createLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(demo_limit_middleware_1.demoLimitForSkillswapSession), (0, error_1.errorCatch)(UserController.newSkillSwapSession));
userRouter.get("/ss-session", rate_limilt_1.readRateLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.skillswapSessions));
userRouter.get("/ss-session/:id", rate_limilt_1.readRateLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.skillswapSession));
userRouter.put("/ss-session/:id", (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.updateSkillswapSession));
userRouter.put("/ss-session/:id/reject", (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.rejectSkillswapSession));
userRouter.post("/ss-session/:id/review", rate_limilt_1.createLimiter, (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.reviewSkillswapSession));
userRouter.get("/ss-session/:id/chat", (0, error_1.errorCatch)(auth_middleware_1.userHasAccess), (0, error_1.errorCatch)(UserController.skillswapSessionChat));
exports.default = userRouter;
