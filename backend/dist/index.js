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
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("@colors/colors"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routers_1 = __importDefault(require("./routers"));
const env_1 = require("./constants/env");
const client_1 = __importDefault(require("./db/client"));
const error_middleware_1 = require("./middlewares/error.middleware");
const socket_io_1 = require("socket.io");
const socket_auth_middleware_1 = require("./middlewares/socket-auth.middleware");
const user_socket_1 = require("./sockets/user.socket");
const allowedClientOrigins = [
    "http://localhost:5173",
    "https://skillswap-1-r1h9.onrender.com",
    // "https://console.cron-job.org",
    "116.203.129.16",
    "116.203.134.67",
    "23.88.105.37",
    "128.140.8.200",
    "91.99.23.109",
];
const server = (0, express_1.default)();
server.use("/uploads", express_1.default.static("uploads")); // Serve static files
// middlewares
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use((0, cookie_parser_1.default)(env_1.ENV.COOKIE_SECRET));
server.use((0, cors_1.default)({
    origin: (origin, cb) => {
        // allow requests with no origin (like curl or mobile apps)
        if (!origin)
            return cb(null, true);
        if (allowedClientOrigins.includes(origin))
            return cb(null, true);
        return cb(new Error("Blocked by CORS"));
    },
    // origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // methods: "*",
    credentials: true,
}));
server.get("/keep-alive", (req, res) => {
    const date = new Date();
    console.log(`Alive at ${date.toDateString()} ${date.toTimeString()}`);
    res.send("Alive");
});
// api
server.use("/api", routers_1.default);
// custom error handler
server.use(error_middleware_1.errorMiddleware);
const HOST = env_1.ENV.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
server.listen(env_1.ENV.PORT, HOST, (error) => {
    if (error)
        console.error(error);
    else
        console.log(colors_1.default.blue(`Server started on ${HOST}:${env_1.ENV.PORT}`));
});
// Socket implementation
const socketHttpServer = http_1.default.createServer(server);
const io = new socket_io_1.Server(socketHttpServer, {
    cors: {
        origin: (origin, cb) => {
            // allow requests with no origin (like curl or mobile apps)
            if (!origin)
                return cb(null, true);
            if (allowedClientOrigins.includes(origin))
                return cb(null, true);
            return cb(new Error("Blocked by CORS"));
        },
        credentials: true,
    },
});
// auth middleware
io.use(socket_auth_middleware_1.socketAuthMiddleware);
// setup io server for skill swap session
(0, user_socket_1.skillswapSessionChatSocket)(io);
socketHttpServer.listen(env_1.ENV.SOCKET_PORT, () => {
    console.log(colors_1.default.yellow(`Socket http server started on port ${env_1.ENV.SOCKET_PORT}`));
});
// Graceful shutdown
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.$disconnect();
    process.exit(0);
}));
// Serve frontend (React)
if (!env_1.ENV.STANDALONE) {
    console.log(colors_1.default.cyan("'STANDALONE' config not found detected."));
    const DIST_PATH = path_1.default.join(__dirname, env_1.ENV.CLIENT_DIST_PATH);
    if (fs_1.default.existsSync(DIST_PATH)) {
        console.log(colors_1.default.cyan(`- Using distribution found at '${DIST_PATH}'`));
        server.use(express_1.default.static(DIST_PATH));
        // Catch-all: send back index.html for any route not handled
        server.get("*all", (req, res) => {
            res.sendFile(path_1.default.join(DIST_PATH, "index.html"));
        });
    }
    else {
        console.log(colors_1.default.red(`- No distribution found! '${DIST_PATH}' does not exists.`));
        setImmediate(() => {
            process.exit(1);
        });
    }
}
else {
    console.log(colors_1.default.red(`'STANDALONE' config detected`));
    console.log(colors_1.default.red("- Separate client required"));
}
