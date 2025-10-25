"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLogSchema = exports.logQueryParams = exports.adminLoginPayloadSchema = exports.createAdminPayloadSchema = void 0;
const zod_1 = require("zod");
exports.createAdminPayloadSchema = zod_1.z.object({
    name: zod_1.z.string(),
    password: zod_1.z.string(),
    deactivated: zod_1.z.boolean().optional().default(false),
    role: zod_1.z
        .union([zod_1.z.literal("ADMIN"), zod_1.z.literal("SUPERADMIN")])
        .optional()
        .default("ADMIN"),
});
exports.adminLoginPayloadSchema = zod_1.z.object({
    name: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.logQueryParams = zod_1.z.object({
    limit: zod_1.z.number().optional().default(50),
    offset: zod_1.z.number().optional().default(0),
});
exports.exportLogSchema = zod_1.z.object({
    query: zod_1.z.object({
        format: zod_1.z.enum(["JSON", "CSV"]).default("JSON"),
        startDate: zod_1.z.date().default(() => {
            // 1w ago
            const now = new Date();
            now.setDate(now.getDate() - 7);
            return now;
        }),
        endDate: zod_1.z.date().default(() => new Date()), // now
    }),
});
