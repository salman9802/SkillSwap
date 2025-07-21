import path from "path";

import dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "..", "..", "..", ".env"),
  // debug: true,
});

import colors from "@colors/colors/safe";

import TIME from "./time";
import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  COOKIE_SECRET: z.string(),

  SERVER_BASE_URL: z.string().optional().default("http://localhost"),
  CLIENT_BASE_URL: z.string().optional().default("http://localhost:5173"),
  PORT: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().default(80)
  ),
  ACCESS_TOKEN_INTERVAL: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().default(15 * TIME.MINUTE)
  ),
  REFRESH_TOKEN_INTERVAL: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().default(30 * TIME.DAY)
  ),
  BCRYPT_SALT_ROUNDS: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().default(10)
  ),
  ACCESS_TOKEN_COOKIE: z.string().optional().default("accssess"),
  REFRESH_TOKEN_COOKIE: z.string().optional().default("refssresh"),
  SOCKET_PORT: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().default(8080)
  ),
  CLIENT_DIST_PATH: z.string().optional().default("./../../frontend/user/dist"),
  STANDALONE: z.preprocess(
    (val) => (typeof val === "string" ? Boolean(val) : val),
    z.boolean().optional().default(false)
  ),
});

let env;
try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const issues = error.issues.map(
      (issue) =>
        `Invalid environment variable '${issue.path[0]}'. ${issue.message}`
    );

    console.log(
      colors.red(`${issues.length} environment variable issues found.`)
    );
    console.log(colors.red(issues.join("\n")));
    process.exit(1);
  } else throw error;
}

export const ENV = env;
