import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères").trim(),
  email: z.string().email("Adresse email invalide").trim(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const passwordChangeSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Le mot de passe doit faire au moins 8 caractères")
    .regex(/[A-Z]/, "Doit contenir une majuscule")
    .regex(/[a-z]/, "Doit contenir une minuscule")
    .regex(/[0-9]/, "Doit contenir un chiffre"),
  otp: z.string().length(6, "Le code 2FA doit faire 6 chiffres"),
});

export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
