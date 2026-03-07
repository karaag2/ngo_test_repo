import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

/**
 * ─── Service Validation Schema ──────────────────────────────
 *
 * Schéma pour la création et la mise à jour des services.
 */
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
  icon: z
    .string()
    .optional()
    .describe("Nom de l'icône Lucide (ex: Heart, Shield, etc.)"),
  color: z.string().optional().describe("Couleur du service"),
  order: z.number().int().nonnegative().optional().default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
