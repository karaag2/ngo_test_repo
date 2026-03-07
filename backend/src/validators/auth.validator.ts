import type { Request } from "express";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// ─── Schéma de connexion ─────────────────────────────
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

// ─── Schéma d'inscription ────────────────────────────
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

// ─── Schéma de mise à jour profil ────────────────────
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Le nom est requis").trim(),
  email: z.string().min(1, "L'email est requis").trim().email().toLowerCase(),
});

// ─── Schéma de changement de mot de passe ────────────
export const changePasswordSchema = z.object({
  otp: z.string().length(6, "Le code OTP doit contenir 6 chiffres"),
  newPassword: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Le mot de passe doit contenir une majuscule, une minuscule et un chiffre",
    ),
});

// ─── Schéma de vérification 2FA (login) ──────────────
export const check2FASchema = z.object({
  code: z.string().length(6, "Le code 2FA doit contenir 6 chiffres"),
  tempAdminId: z.string().uuid("ID temporaire invalide"),
});

// ─── Schéma de confirmation setup 2FA ────────────────
export const confirmSetup2FASchema = z.object({
  code: z.string().length(6, "Le code 2FA doit contenir 6 chiffres"),
});

// ─── Types ───────────────────────────────────────────
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
