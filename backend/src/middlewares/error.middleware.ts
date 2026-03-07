import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import { logger } from "../utils/logger.js";

const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  //Gestion des erreurs en fonction du mode d'execution
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      status,
      message: err.message,
      stack: err.stack,
    });
  }

  if (err.isOperational) {
    return res.status(statusCode).json({
      status,
      message: err.message,
    });
  }

  logger.error("ERREUR SERVER: ", err);

  return res.status(500).json({
    status: "erreur",
    message: "Une erreur interne s'est produite",
  });
};

export default errorMiddleware;
