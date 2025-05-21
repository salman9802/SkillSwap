import express from "express";
import "dotenv/config";
import colors from "@colors/colors";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./routers";
import { ENV } from "./constants/env";
import prisma from "./db/client";
import { errorMiddleware } from "./middlewares/error.middleware";

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

// api middelware
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

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
