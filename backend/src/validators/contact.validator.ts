import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const contactSchema = z.object({
  firstName: z.string().min(2, "Prénom trop court"),
  lastName: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Message trop court (min 10 caractères)"),
});

export type ContactInput = z.infer<typeof contactSchema>;
