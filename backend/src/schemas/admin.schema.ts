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
