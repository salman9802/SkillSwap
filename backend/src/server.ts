import http from "http";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "@colors/colors";

import apiRouter from "./routers";
import { ENV } from "./constants/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ServerConfig } from "./config/config";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middlewares/socket-auth.middleware";
import { skillswapSessionChatSocket } from "./sockets/user.socket";
import { responseMonitoring } from "./middlewares/monitoring.middleware";

/** creates express app with middlewares & routes */
export const createExpressApp = () => {
  const app = express();

  app.use("/uploads", express.static("uploads")); // Serve static files

  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(ENV.COOKIE_SECRET as string));
  app.use(
    cors({
      origin: (origin, cb) => {
        // allow requests with no origin (like curl or mobile apps)
        if (!origin) return cb(null, true);

        if (ServerConfig.getConfig().allowedClientOrigins.includes(origin))
          return cb(null, true);

        return cb(new Error("Blocked by CORS"));
      },
      // origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      // methods: "*",
      credentials: true,
    })
  );

  app.use(responseMonitoring);

  app.get("/keep-alive", (req, res) => {
    const date = new Date();
    console.log(`Alive at ${date.toDateString()} ${date.toTimeString()}`);
    res.send("Alive");
  });

  // api
  app.use("/api", apiRouter);

  // custom error handler
  app.use(errorMiddleware);

  return app;
};

/** creates a socket server from express app with middlewares */
export const createSocketServer = (app: express.Express) => {
  const httpServer = http.createServer(app);
  const socketServer = new Server(httpServer, {
    cors: {
      origin: (origin, cb) => {
        // allow requests with no origin (like curl or mobile apps)
        if (!origin) return cb(null, true);

        if (ServerConfig.getConfig().allowedClientOrigins.includes(origin))
          return cb(null, true);

        return cb(new Error("Blocked by CORS"));
      },
      credentials: true,
    },
  });

  // auth middleware
  socketServer.use(socketAuthMiddleware);

  // setup io server for skill swap session
  skillswapSessionChatSocket(socketServer);

  httpServer.listen(ENV.SOCKET_PORT, () => {
    console.log(
      colors.yellow(`Socket http server started on port ${ENV.SOCKET_PORT}`)
    );
  });
  return socketServer;
};
