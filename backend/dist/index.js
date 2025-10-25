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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("@colors/colors"));
const env_1 = require("./constants/env");
const client_1 = __importDefault(require("./db/client"));
const server_1 = require("./server");
const app = (0, server_1.createExpressApp)();
const HOST = env_1.ENV.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
app.listen(env_1.ENV.PORT, HOST, (error) => {
    if (error)
        console.error(error);
    else
        console.log(colors_1.default.blue(`Server started on ${HOST}:${env_1.ENV.PORT}`));
});
(0, server_1.createSocketServer)(app);
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
        app.use(express_1.default.static(DIST_PATH));
        // Catch-all: send back index.html for any route not handled
        app.get("*all", (req, res) => {
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
