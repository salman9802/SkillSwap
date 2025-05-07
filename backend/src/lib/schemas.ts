import z from "zod";

export const newUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(6, "Password must be minimum of 6 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type NewUser = z.infer<typeof newUserSchema>;

export const existingUserSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(6, "Password must be minimum of 6 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type ExistingUser = z.infer<typeof existingUserSchema>;
