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

const server = express();

server.use("/uploads", express.static("uploads")); // Serve static files

// Serve frontend (React)
if (ENV.NODE_ENV === "production") {
  console.log(colors.cyan("Production environment detected"));
  const DIST_PATH = path.join(__dirname, ENV.CLIENT_DIST_PATH);
  if (fs.existsSync(DIST_PATH)) {
    console.log(colors.cyan(`- Using distribution found at '${DIST_PATH}'`));

    server.use(express.static(DIST_PATH));
    // server.get("/", (req, res) => {
    //   res.sendFile(path.join(__dirname, ENV.CLIENT_DIST_PATH, "index.html"));
    // });
  } else {
    console.log(
      colors.red(`- No distribution found! '${DIST_PATH}' does not exists.`)
    );
    setImmediate(() => {
      process.exit(1);
    });
  }
} else {
  console.log(colors.cyan("Development environment detected"));
  console.log(colors.cyan("- Manually start client"));
}
// server.use(express.static(path.join(__dirname, ENV.CLIENT_DIST_PATH)));
// server.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, ENV.CLIENT_DIST_PATH, "index.html"));
// });

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser(ENV.COOKIE_SECRET as string));
server.use(
  cors({
    origin: [ENV.CLIENT_BASE_URL as string],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // methods: "*",
    credentials: true,
  })
);

// server.get("/", (req, res) => {
//   res.send("Hello world");
// });

// api
server.use("/api", apiRouter);

// custom error handler
server.use(errorMiddleware);

server.listen(ENV.PORT, (error) => {
  if (error) console.error(error);
  else
    console.log(
      colors.blue(`Server started on ${ENV.SERVER_BASE_URL}:${ENV.PORT}`)
    );
});

// Socket implementation
const socketHttpServer = http.createServer(server);
const io = new Server(socketHttpServer, {
  cors: {
    origin: ENV.CLIENT_BASE_URL,
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
