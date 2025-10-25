"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocketServer = exports.createExpressApp = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const colors_1 = __importDefault(require("@colors/colors"));
const routers_1 = __importDefault(require("./routers"));
const env_1 = require("./constants/env");
const error_middleware_1 = require("./middlewares/error.middleware");
const config_1 = require("./config/config");
const socket_io_1 = require("socket.io");
const socket_auth_middleware_1 = require("./middlewares/socket-auth.middleware");
const user_socket_1 = require("./sockets/user.socket");
const monitoring_middleware_1 = require("./middlewares/monitoring.middleware");
/** creates express app with middlewares & routes */
const createExpressApp = () => {
    const app = (0, express_1.default)();
    app.use("/uploads", express_1.default.static("uploads")); // Serve static files
    // middlewares
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)(env_1.ENV.COOKIE_SECRET));
    app.use((0, cors_1.default)({
        origin: (origin, cb) => {
            // allow requests with no origin (like curl or mobile apps)
            if (!origin)
                return cb(null, true);
            if (config_1.ServerConfig.getConfig().allowedClientOrigins.includes(origin))
                return cb(null, true);
            return cb(new Error("Blocked by CORS"));
        },
        // origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        // methods: "*",
        credentials: true,
    }));
    app.use(monitoring_middleware_1.responseMonitoring);
    app.get("/keep-alive", (req, res) => {
        const date = new Date();
        console.log(`Alive at ${date.toDateString()} ${date.toTimeString()}`);
        res.send("Alive");
    });
    // api
    app.use("/api", routers_1.default);
    // custom error handler
    app.use(error_middleware_1.errorMiddleware);
    return app;
};
exports.createExpressApp = createExpressApp;
/** creates a socket server from express app with middlewares */
const createSocketServer = (app) => {
    const httpServer = http_1.default.createServer(app);
    const socketServer = new socket_io_1.Server(httpServer, {
        cors: {
            origin: (origin, cb) => {
                // allow requests with no origin (like curl or mobile apps)
                if (!origin)
                    return cb(null, true);
                if (config_1.ServerConfig.getConfig().allowedClientOrigins.includes(origin))
                    return cb(null, true);
                return cb(new Error("Blocked by CORS"));
            },
            credentials: true,
        },
    });
    // auth middleware
    socketServer.use(socket_auth_middleware_1.socketAuthMiddleware);
    // setup io server for skill swap session
    (0, user_socket_1.skillswapSessionChatSocket)(socketServer);
    httpServer.listen(env_1.ENV.SOCKET_PORT, () => {
        console.log(colors_1.default.yellow(`Socket http server started on port ${env_1.ENV.SOCKET_PORT}`));
    });
    return socketServer;
};
exports.createSocketServer = createSocketServer;
