import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "@/routes/blogpost.route.js";
import serviceRoutes from "@/routes/services.route.js";
import contactRoutes from "@/routes/contact.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import multer from "multer";
import { logger } from "./utils/logger.js";

// Swagger
import swaggerUi from "swagger-ui-express";
import { generateOpenApiConfig } from "./docs/openapi.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:8000"],
    credentials: true,
  }),
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Trop de requêtes provenant de cette IP, veuillez réessayer dans 15 minutes",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());
app.use(cookieParser());
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);
app.use(compression());
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contacts", contactRoutes);

// --- Documentation ---
const openapiDocument = generateOpenApiConfig();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use(errorMiddleware);

export default app;
