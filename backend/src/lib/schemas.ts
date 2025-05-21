import z from "zod";

export const newUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(8, "Password must be minimum of 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type NewUser = z.infer<typeof newUserSchema>;

export const existingUserSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(8, "Password must be minimum of 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type ExistingUser = z.infer<typeof existingUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Email must be valid").optional(),
  password: z
    .string()
    .min(8, "Password must be minimum of 8 characters")
    .regex(/\d/, "Password must contain at least one number")
    .optional(),
  picture: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  offeredSkills: z.array(z.string()).optional(),
  requestedSkills: z.array(z.string()).optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;

const scheduleSchema = z
  .object({
    date: z
      .string()
      .refine((v) => !isNaN(Date.parse(v)), {
        message: "Invalid date string",
      })
      .transform((v) => new Date(v)),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Time must be in HH:mm format",
    }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Time must be in HH:mm format",
    }),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(":").map(Number);
      const [endHour, endMinute] = data.endTime.split(":").map(Number);

      const startInMinutes = startHour * 60 + startMinute;
      const endInMinutes = endHour * 60 + endMinute;

      return startInMinutes < endInMinutes;
    },
    {
      message: "Start time must be before end time",
      path: ["startTime", "endTime"],
    }
  );

export const newRequestSchema = z.object({
  timezone: z.string(),
  requestedSkill: z.string(),
  availability: z.array(scheduleSchema),
});

export type NewRequest = z.infer<typeof newRequestSchema>;

export const marketplaceFilterSchema = z.object({
  limit: z.coerce.number().min(1).default(10),
  offset: z.coerce.number().min(0).default(0),
  availability: scheduleSchema.optional(),
  offeredSkill: z.array(z.string()).optional(),
  requestedSkill: z.array(z.string()).default([]),
});

export type MarketplaceFilter = z.infer<typeof marketplaceFilterSchema>;

export const newSkillSwapSessionSchema = z.object({
  offeredSkill: z.string(),
  // schedule: z.array(scheduleSchema),
  scheduleId: z.string(),
  requestId: z.string(),
});

export type NewSkillSwapSession = z.infer<typeof newSkillSwapSessionSchema>;

export const paginationSchema = z.object({
  limit: z.coerce.number().min(1).default(10),
  offset: z.coerce.number().min(0).default(0),
});
