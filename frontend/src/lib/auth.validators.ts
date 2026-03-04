import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Le nom est trop court"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type LoginInput = z.infer<typeof loginSchema>;