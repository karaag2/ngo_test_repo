import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email required").trim().email().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number",
    ),
});

export const registrationSchema = z.object({
  name: z.string().min(2, "Name required").trim(),
  email: z.string().min(1, "Email required").trim().email().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number",
    ),
});

export type loginInput = z.infer<typeof loginSchema>;
export type registrationInput = z.infer<typeof registrationSchema>;
