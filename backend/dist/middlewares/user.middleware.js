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
exports.requiredCoins = void 0;
const error_1 = require("../lib/error");
const http_1 = require("../constants/http");
const client_1 = __importDefault(require("../db/client"));
const requiredCoins = (coins) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    (0, error_1.appAssert)(user !== undefined, http_1.STATUS_CODES.SERVICE_UNAVAILABLE, "Incompatible order of middlewares");
    (0, error_1.appAssert)(user.coins >= coins, http_1.STATUS_CODES.FORBIDDEN, "Not enough coins.");
    yield client_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            coins: user.coins - coins,
        },
    });
    next();
});
exports.requiredCoins = requiredCoins;
