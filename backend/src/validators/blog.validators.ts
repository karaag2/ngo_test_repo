import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const BlogSchema = z
  .object({
    title: z
      .string()
      .min(5, "Le titre doit faire au moins 5 caractères")
      .max(150)
      .trim(),
    description: z.string().min(20, "La description est trop courte").trim(),
    content: z.string().optional(),
    category: z.string().min(1, "La catégorie est requise"),
    slug: z.string().optional(),
    imageUrl: z
      .string()
      .url("L'URL de l'image est invalide (doit commencer par http/https)"),
    published: z.boolean().optional().default(true),
  })
  .transform((data) => {
    if (!data.slug) {
      return {
        ...data,
        slug: data.title
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
          .replace(/[^a-z0-8 ]/g, "") // Enlève le spécial
          .replace(/\s+/g, "-"), // Espaces -> tirets
      };
    }
    return data;
  });

export type BlogInput = z.infer<typeof BlogSchema>;
