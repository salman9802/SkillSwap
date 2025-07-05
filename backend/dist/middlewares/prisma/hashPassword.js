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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPasswordMiddleware = void 0;
const bcrypt_1 = require("../../lib/bcrypt");
/** Prisma middleware to hash password before being saved / updated */
const hashPasswordMiddleware = (params, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (params.model === "User" &&
        (params.action === "create" || params.action === "update")) {
        const password = params.args.data.password;
        if (password) {
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
            params.args.data.password = hashedPassword;
        }
    }
    return next(params);
});
exports.hashPasswordMiddleware = hashPasswordMiddleware;
