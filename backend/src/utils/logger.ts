import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");

// Format pour les logs dans les fichiers
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Format plus lisible pour la console
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ""}`;
  }),
);

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: fileFormat,
  transports: [
    new DailyRotateFile({
      dirname: logDirectory,
      filename: "application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
    }),
    new DailyRotateFile({
      dirname: logDirectory,
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
      level: "error",
    }),
  ],
});

// Logs dans la console également si on n'est pas en prod
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    }),
  );
}
