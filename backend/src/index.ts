import http from "http";
import path from "path";
import fs from "fs";

import express from "express";
import colors from "@colors/colors";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./routers";
import { ENV } from "./constants/env";
import prisma from "./db/client";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middlewares/socket-auth.middleware";
import { skillswapSessionChatSocket } from "./sockets/user.socket";

const allowedClientOrigins = [
  "http://localhost:5173",
  "https://skillswap-1-r1h9.onrender.com",
];

const server = express();

server.use("/uploads", express.static("uploads")); // Serve static files

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser(ENV.COOKIE_SECRET as string));
server.use(
  cors({
    origin: (origin, cb) => {
      // allow requests with no origin (like curl or mobile apps)
      if (!origin) return cb(null, true);

      if (allowedClientOrigins.includes(origin)) return cb(null, true);

      return cb(new Error("Blocked by CORS"));
    },
    // origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // methods: "*",
    credentials: true,
  })
);

server.get("/keep-alive", (req, res) => {
  const date = new Date();
  console.log(`Alive at ${date.toDateString()} ${date.toTimeString()}`);
  res.send("Alive");
});

// api
server.use("/api", apiRouter);

// custom error handler
server.use(errorMiddleware);

const HOST = ENV.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
server.listen(ENV.PORT, HOST, (error) => {
  if (error) console.error(error);
  else console.log(colors.blue(`Server started on ${HOST}:${ENV.PORT}`));
});

// Socket implementation
const socketHttpServer = http.createServer(server);
const io = new Server(socketHttpServer, {
  cors: {
    origin: (origin, cb) => {
      // allow requests with no origin (like curl or mobile apps)
      if (!origin) return cb(null, true);

      if (allowedClientOrigins.includes(origin)) return cb(null, true);

      return cb(new Error("Blocked by CORS"));
    },
    credentials: true,
  },
});

// auth middleware
io.use(socketAuthMiddleware);

// setup io server for skill swap session
skillswapSessionChatSocket(io);

socketHttpServer.listen(ENV.SOCKET_PORT, () => {
  console.log(
    colors.yellow(`Socket http server started on port ${ENV.SOCKET_PORT}`)
  );
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Serve frontend (React)
if (ENV.NODE_ENV === "production" && !ENV.STANDALONE) {
  console.log(colors.cyan("Production environment detected"));
  const DIST_PATH = path.join(__dirname, ENV.CLIENT_DIST_PATH);
  if (fs.existsSync(DIST_PATH)) {
    console.log(colors.cyan(`- Using distribution found at '${DIST_PATH}'`));

    server.use(express.static(DIST_PATH));

    // Catch-all: send back index.html for any route not handled
    server.get("*all", (req, res) => {
      res.sendFile(path.join(DIST_PATH, "index.html"));
    });
  } else {
    console.log(
      colors.red(`- No distribution found! '${DIST_PATH}' does not exists.`)
    );
    setImmediate(() => {
      process.exit(1);
    });
  }
} else {
  console.log(
    colors.red(`Development environment detected (NODE_ENV = ${ENV.NODE_ENV})`)
  );
  console.log(colors.red("- Manually start client"));
}
