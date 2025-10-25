"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTestDb = void 0;
// testUtils.ts
const child_process_1 = require("child_process");
const resetTestDb = () => {
    (0, child_process_1.execSync)("npx prisma migrate reset --force --skip-seed", {
        stdio: "inherit",
        env: Object.assign(Object.assign({}, process.env), { DATABASE_URL: process.env.DATABASE_URL }),
    });
};
exports.resetTestDb = resetTestDb;
