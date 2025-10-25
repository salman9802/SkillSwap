import { z } from "zod";

export const createAdminPayloadSchema = z.object({
  name: z.string(),
  password: z.string(),
  deactivated: z.boolean().optional().default(false),
  role: z
    .union([z.literal("ADMIN"), z.literal("SUPERADMIN")])
    .optional()
    .default("ADMIN"),
});
export type CreateAdminPayload = z.infer<typeof createAdminPayloadSchema>;

export const adminLoginPayloadSchema = z.object({
  name: z.string(),
  password: z.string(),
});
export type AdminLoginPayload = z.infer<typeof adminLoginPayloadSchema>;

export const logQueryParams = z.object({
  limit: z.number().optional().default(50),
  offset: z.number().optional().default(0),
});
export type LogQueryParams = z.infer<typeof logQueryParams>;

export const exportLogSchema = z.object({
  query: z.object({
    format: z.enum(["JSON", "CSV"]).default("JSON"),
    startDate: z.date().default(() => {
      // 1w ago
      const now = new Date();
      now.setDate(now.getDate() - 7);
      return now;
    }),
    endDate: z.date().default(() => new Date()), // now
  }),
});
export type ExportLogSchema = z.infer<typeof exportLogSchema>;
