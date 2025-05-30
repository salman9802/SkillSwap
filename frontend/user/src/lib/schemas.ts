import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(8, "Password must be minimum of 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type RegisterFormFields = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(8, "Password must be minimum of 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type LoginFormFields = z.infer<typeof loginFormSchema>;
