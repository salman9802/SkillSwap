// testUtils.ts
import { execSync } from "child_process";

export const resetTestDb = () => {
  execSync("npx prisma migrate reset --force --skip-seed", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
};
