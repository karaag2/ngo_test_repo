import { z } from "zod";

export const activitySchema = z.object({
  title: z
    .string()
    .min(5, "Le titre doit faire au moins 5 caractères")
    .max(150, "Le titre est trop long")
    .trim(),
  description: z
    .string()
    .min(20, "La description doit faire au moins 20 caractères")
    .trim(),
  content: z.string().optional(),
  category: z.string().min(1, "La catégorie est requise"),
  imageUrl: z
    .string()
    .url("L'URL de l'image est invalide (doit commencer par http/https)"),
  published: z.boolean(),
});

export type ActivityInput = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  published: boolean;
  content?: string;
};

export const serviceSchema = z.object({
  title: z
    .string()
    .min(2, "Le titre doit faire au moins 2 caractères")
    .max(100, "Le titre est trop long")
    .trim(),
  description: z
    .string()
    .min(10, "La description doit faire au moins 10 caractères")
    .trim(),
  icon: z.string(),
  order: z.number().int().nonnegative(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
