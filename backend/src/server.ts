import app from "./app.js";
import "dotenv/config";
import { env } from "./config/env.js"; // Validation Zod immédiate de l'environnement
import { connectDB, disconnectDB } from "./lib/db.js";
import { logger } from "./utils/logger.js";

const PORT = env.PORT;

await connectDB();

const server = app.listen(PORT, () => {
  logger.info(` Serveur en cours d'exécution sur le port ${PORT}`);
});

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  logger.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
