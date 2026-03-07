import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .url("La DATABASE_URL doit être une URL valide ou format schema:"),
  JWT_ACCESS_SECRET: z
    .string()
    .min(10, "La clé JWT_ACCESS_SECRET doit faire au moins 10 caractères"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(10, "La clé JWT_REFRESH_SECRET doit faire au moins 10 caractères"),
  JWT_ACCESS_EXPIRATION: z.string().default("15m"),
  JWT_REFRESH_EXPIRATION: z.string().default("7d"),
  PORT: z.coerce.number().default(7000),
  NODE_ENV: z
    .enum(["development", "production", "test", "developpement"])
    .default("development"),
});

const validateEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(" Erreur de validation des variables d'environnement :");
    console.error(parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
};

export const env = validateEnv();
