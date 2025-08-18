import path from "path";
import fs from "fs";

import express from "express";
import colors from "@colors/colors";

import { ENV } from "./constants/env";
import prisma from "./db/client";

import { createExpressApp, createSocketServer } from "./server";

const app = createExpressApp();
const HOST = ENV.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
app.listen(ENV.PORT, HOST, (error) => {
  if (error) console.error(error);
  else console.log(colors.blue(`Server started on ${HOST}:${ENV.PORT}`));
});

createSocketServer(app);

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Serve frontend (React)
if (!ENV.STANDALONE) {
  console.log(colors.cyan("'STANDALONE' config not found detected."));
  const DIST_PATH = path.join(__dirname, ENV.CLIENT_DIST_PATH);
  if (fs.existsSync(DIST_PATH)) {
    console.log(colors.cyan(`- Using distribution found at '${DIST_PATH}'`));

    app.use(express.static(DIST_PATH));

    // Catch-all: send back index.html for any route not handled
    app.get("*all", (req, res) => {
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
  console.log(colors.red(`'STANDALONE' config detected`));
  console.log(colors.red("- Separate client required"));
}
