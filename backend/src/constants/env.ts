import colors from "@colors/colors/safe";

import TIME from "./time";

export const ENV: { [key: string]: string | number } = {};
let missingEnv: string[] = [];

/** parse "string | number" to return appropriate value  */
function parseEnvVar(value: string): string | number {
  const num = Number(value);
  return isNaN(num) ? value : num;
}

function loadEnv(
  name: string,
  defaultValue: undefined | string | number = undefined
) {
  if (defaultValue) {
    ENV[name] = process.env[name]
      ? parseEnvVar(process.env[name])
      : defaultValue;
  } else {
    if (process.env[name]) ENV[name] = parseEnvVar(process.env[name]);
    else missingEnv.push(name);
    // else console.log(colors.red(`'${name}' environment variable required`));
  }
}

const REQUIRED_ENV = [
  "NODE_ENV",
  "DATABASE_URL",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "COOKIE_SECRET",
] as const;

const OPTIONAL_ENV: { [key: string]: string | number } = {
  SERVER_BASE_URL: "http://localhost",
  CLIENT_BASE_URL: "http://localhost:5173",
  PORT: 80,
  ACCESS_TOKEN_INTERVAL: 15 * TIME.MINUTE,
  REFRESH_TOKEN_INTERVAL: 30 * TIME.DAY,
  BCRYPT_SALT_ROUNDS: 10,
  ACCESS_TOKEN_COOKIE: "accssess",
  REFRESH_TOKEN_COOKIE: "refssresh",
} as const;

REQUIRED_ENV.forEach((env) => loadEnv(env));
Object.keys(OPTIONAL_ENV).forEach((k) => loadEnv(k, OPTIONAL_ENV[k]));

if (missingEnv.length > 0) {
  console.log(
    colors.red(
      `${
        missingEnv.length
      } environment variable(s) missing. ('${missingEnv.join("', '")}')`
    )
  );
  process.exit(1);
}
