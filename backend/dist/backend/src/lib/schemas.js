"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardQueryParamsSchema = exports.skillswapSessionReviewSchema = exports.paginationSchema = exports.newSkillSwapSessionSchema = exports.marketplaceParamsSchema = exports.newRequestSchema = exports.updateUserSchema = exports.existingUserSchema = exports.newUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.newUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    email: zod_1.default.string().email("Email must be valid"),
    password: zod_1.default
        .string()
        .min(8, "Password must be minimum of 8 characters")
        .regex(/\d/, "Password must contain at least one number"),
});
exports.existingUserSchema = zod_1.default.object({
    email: zod_1.default.string().email("Email must be valid"),
    password: zod_1.default
        .string()
        .min(8, "Password must be minimum of 8 characters")
        .regex(/\d/, "Password must contain at least one number"),
});
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required").optional(),
    email: zod_1.default.string().email("Email must be valid").optional(),
    password: zod_1.default
        .string()
        .min(8, "Password must be minimum of 8 characters")
        .regex(/\d/, "Password must contain at least one number")
        .optional(),
    picture: zod_1.default.string().optional(),
    country: zod_1.default.string().optional(),
    timezone: zod_1.default.string().optional(),
    offeredSkills: zod_1.default.array(zod_1.default.string()).optional(),
    requestedSkills: zod_1.default.array(zod_1.default.string()).optional(),
});
const scheduleSchema = zod_1.default.object({
    date: zod_1.default
        .string()
        .refine((v) => !isNaN(Date.parse(v)), {
        message: "Invalid date string",
    })
        .transform((v) => new Date(v)),
    // startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    //   message: "Time must be in HH:mm format",
    // }),
    // endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    //   message: "Time must be in HH:mm format",
    // }),
});
// const scheduleSchema = z.object({
//   date: z
//     .string()
//     .refine((v) => !isNaN(Date.parse(v)), {
//       message: "Invalid date string",
//     })
//     .transform((v) => new Date(v)),
//   // startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
//   //   message: "Time must be in HH:mm format",
//   // }),
//   // endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
//   //   message: "Time must be in HH:mm format",
//   // }),
// });
// .refine(
//   (data) => {
//     const [startHour, startMinute] = data.startTime.split(":").map(Number);
//     const [endHour, endMinute] = data.endTime.split(":").map(Number);
//     const startInMinutes = startHour * 60 + startMinute;
//     const endInMinutes = endHour * 60 + endMinute;
//     return startInMinutes < endInMinutes;
//   },
//   {
//     message: "Start time must be before end time",
//     path: ["startTime", "endTime"],
//   }
// );
exports.newRequestSchema = zod_1.default.object({
    timezone: zod_1.default.string(),
    requestedSkill: zod_1.default.string(),
    availability: zod_1.default.array(scheduleSchema),
});
// export const marketplaceFilterSchema = z.object({
//   limit: z.coerce.number().min(1).default(10),
//   offset: z.coerce.number().min(0).default(0),
//   availability: scheduleSchema.optional(),
//   offeredSkills: z.array(z.string()).optional(),
//   requestedSkill: z.string().optional(),
// });
// export type MarketplaceFilter = z.infer<typeof marketplaceFilterSchema>;
exports.marketplaceParamsSchema = zod_1.default.object({
    // limit: z.coerce.number().min(1).default(10),
    offset: zod_1.default.coerce.number().min(0).default(0),
    date: zod_1.default.string().optional(),
    offeredSkills: zod_1.default.string().optional(),
    requestedSkill: zod_1.default.string().optional(),
    offeredSkillQuery: zod_1.default.string().optional(),
});
exports.newSkillSwapSessionSchema = zod_1.default.object({
    offeredSkill: zod_1.default.string(),
    // schedule: z.array(scheduleSchema),
    scheduleId: zod_1.default.string(),
    requestId: zod_1.default.string(),
});
exports.paginationSchema = zod_1.default.object({
    limit: zod_1.default.coerce.number().min(1).default(10),
    offset: zod_1.default.coerce.number().min(0).default(0),
});
exports.skillswapSessionReviewSchema = zod_1.default.object({
    rating: zod_1.default.number().min(1).max(5),
    comment: zod_1.default.string().optional(),
    revieweeId: zod_1.default.string(),
    coins: zod_1.default.number(),
});
exports.dashboardQueryParamsSchema = zod_1.default.object({
    timePeriod: zod_1.default.enum(["last_week", "last_month", "last_3_months"]),
});
