import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

/**
 * Configuration du pool de connexions avec 'pg' (node-postgres)
 * utilisé ensuite comme adaptateur pour Prisma.
 * Cela permet un contrôle fin sur le pool (max connections, idle timeout, etc.)
 * idéal pour PostgreSQL.
 */
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  max: 10, // Maximum de connexions dans le pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);

// Singleton pour PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(
      "✅ Base de données PostgreSQL connectée via PG Pool & Adaptateur",
    );
  } catch (err) {
    console.error("❌ Erreur de connexion PostgreSQL via Pool:", err);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
  await pool.end();
};

export default prisma;
