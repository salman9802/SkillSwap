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
exports.skillswapSessionChatSocket = void 0;
const client_1 = __importDefault(require("../db/client"));
/** Takes an io server and handles event handlers and emissions related to skillswap sessions. */
const skillswapSessionChatSocket = (io) => {
    io.on("connection", (socket) => {
        const user = socket.user;
        socket.on("ss-session-join", (sessionId) => {
            socket.join(sessionId);
            console.log(`${user === null || user === void 0 ? void 0 : user.name} joined ${sessionId}`);
        });
        socket.on("ss-session-send", (_a, cb_1) => __awaiter(void 0, [_a, cb_1], void 0, function* ({ sessionId, message }, cb) {
            if (!sessionId || !message || !user)
                return;
            const chatMessages = yield client_1.default.skillSwapSessionChatMessage.count({
                where: {
                    senderId: user.id,
                    skillswapSessionId: sessionId,
                },
            });
            if (chatMessages > 10) {
                cb({
                    error: "Cannot have more than 10 messages per person",
                    success: false,
                });
            }
            yield client_1.default.skillSwapSession.update({
                where: {
                    id: sessionId,
                },
                data: {
                    chatMessages: {
                        create: {
                            senderId: user.id,
                            content: message,
                        },
                    },
                },
            });
            io.to(sessionId).emit("ss-session-receive", {
                senderId: user === null || user === void 0 ? void 0 : user.id,
                message,
            });
            cb({ success: true });
        }));
        socket.on("disconnect", () => {
            console.log(`${user === null || user === void 0 ? void 0 : user.name} disconnected`);
        });
    });
};
exports.skillswapSessionChatSocket = skillswapSessionChatSocket;
