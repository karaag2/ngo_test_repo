import type { Interface } from "node:readline";
import type { Request } from "express";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

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

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name required").trim(),
  email: z.string().min(1, "Email required").trim().email().toLowerCase(),
});

export const changePasswordSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number",
    ),
});

export type loginInput = z.infer<typeof loginSchema>;
export type registrationInput = z.infer<typeof registrationSchema>;
export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}
export interface UserPayload {
  payload: {
    id: string;
    email: string;
    role: string;
  };
}
