import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
// import multer from 'multer'
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import multer from "multer";

const app = express();

app.use(helmet());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none())
app.use(cookieParser());
app.use(morgan("dev"));
app.use(compression());
app.use("/api/auth", authRoutes);


// Error handling middleware MUST be at the end of the pipeline!
app.use(errorMiddleware);

export default app;
