import http from "http";

import express from "express";
import "dotenv/config";
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

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser(ENV.COOKIE_SECRET as string));
server.use(
  cors({
    origin: [ENV.CLIENT_BASE_URL as string],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

server.get("/", (req, res) => {
  res.send("Hello world");
});

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
