"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, "..", "..", "..", ".env"),
    // debug: true,
});
const safe_1 = __importDefault(require("@colors/colors/safe"));
const time_1 = __importDefault(require("./time"));
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    NODE_ENV: zod_1.default.enum(["development", "production"]),
    DATABASE_URL: zod_1.default.string(),
    ACCESS_TOKEN_SECRET: zod_1.default.string(),
    REFRESH_TOKEN_SECRET: zod_1.default.string(),
    COOKIE_SECRET: zod_1.default.string(),
    SERVER_BASE_URL: zod_1.default.string().optional().default("http://localhost"),
    CLIENT_BASE_URL: zod_1.default.string().optional().default("http://localhost:5173"),
    PORT: zod_1.default.preprocess((val) => (typeof val === "string" ? Number(val) : val), zod_1.default.number().default(80)),
    ACCESS_TOKEN_INTERVAL: zod_1.default.preprocess((val) => (typeof val === "string" ? Number(val) : val), zod_1.default.number().default(15 * time_1.default.MINUTE)),
    REFRESH_TOKEN_INTERVAL: zod_1.default.preprocess((val) => (typeof val === "string" ? Number(val) : val), zod_1.default.number().default(30 * time_1.default.DAY)),
    BCRYPT_SALT_ROUNDS: zod_1.default.preprocess((val) => (typeof val === "string" ? Number(val) : val), zod_1.default.number().default(10)),
    ACCESS_TOKEN_COOKIE: zod_1.default.string().optional().default("accssess"),
    REFRESH_TOKEN_COOKIE: zod_1.default.string().optional().default("refssresh"),
    SOCKET_PORT: zod_1.default.preprocess((val) => (typeof val === "string" ? Number(val) : val), zod_1.default.number().default(8080)),
    CLIENT_DIST_PATH: zod_1.default.string().optional().default("./../../frontend/user/dist"),
    STANDALONE: zod_1.default.preprocess((val) => (typeof val === "string" ? Boolean(val) : val), zod_1.default.boolean().optional().default(false)),
});
let env;
try {
    env = envSchema.parse(process.env);
}
catch (error) {
    if (error instanceof zod_1.default.ZodError) {
        const issues = error.issues.map((issue) => `Invalid environment variable '${issue.path[0]}'. ${issue.message}`);
        console.log(safe_1.default.red(`${issues.length} environment variable issues found.`));
        console.log(safe_1.default.red(issues.join("\n")));
        process.exit(1);
    }
    else
        throw error;
}
exports.ENV = env;
