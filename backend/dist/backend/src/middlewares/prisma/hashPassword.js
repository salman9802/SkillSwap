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
const modelsToHash = ["User", "Admin"];
/** Prisma middleware to hash password before being saved / updated */
const hashPasswordMiddleware = (params, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (params.model &&
        modelsToHash.includes(params.model) &&
        (params.action === "create" ||
            params.action === "update" ||
            params.action === "findFirst")) {
        const password = (_b = (_a = params.args) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.password;
        if (password) {
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
            params.args.data.password = hashedPassword;
        }
    }
    return next(params);
});
exports.hashPasswordMiddleware = hashPasswordMiddleware;
