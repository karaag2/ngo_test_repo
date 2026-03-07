import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit faire au moins 2 caractères")
    .trim(),
  lastName: z.string().min(2, "Le nom doit faire au moins 2 caractères").trim(),
  email: z.string().email("Adresse email invalide").trim(),
  message: z
    .string()
    .min(10, "Le message doit faire au moins 10 caractères")
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;
