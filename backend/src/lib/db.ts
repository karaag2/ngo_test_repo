import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";
export const generatePrismaClient = () => {
  const databaseURL = process.env.DATABASE_URL || "bro you've fucked up";
  const adapter = new PrismaBetterSqlite3({ url: databaseURL });
  const client = new PrismaClient({ adapter });
  const connectDB = async () => {
    try {
      await client.$connect();
      console.log("Connected to DB via Prisma");
    } catch (err) {
      console.error("Database connection error:", err);
    }
  };

  const disconnectDB = async () => {
    await client.$disconnect();
  };
  return { client, connectDB, disconnectDB };
};

const { client: prisma, connectDB, disconnectDB } = generatePrismaClient();

export default prisma;
export { connectDB, disconnectDB };
