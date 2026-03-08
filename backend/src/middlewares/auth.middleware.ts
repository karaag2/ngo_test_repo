import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db.js";
import AppError from "@/utils/appError.js";
import type {
  RequestWithUser,
  UserPayload,
} from "@/validators/auth.validator.js";
import { env } from "@/config/env.js";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  const accessSecret = env.JWT_ACCESS_SECRET;
  const refreshSecret = env.JWT_REFRESH_SECRET;

  // Vérification de l'access token
  if (accessToken) {
    try {
      const payload = jwt.verify(accessToken, accessSecret) as UserPayload;
      if (typeof payload !== "object" || payload === null) {
        throw new AppError("Token invalide", 401);
      }
      (req as RequestWithUser).user = payload.payload;
      return next();
    } catch {
      // Access token expiré -> passage au refresh token
    }
  }

  // Si access invalide, on regarde le refresh token
  if (!refreshToken) {
    return res.status(401).json({
      message:
        "Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.",
    });
  }
  // Tentative de refresh le token
  try {
    const refreshPayload = jwt.verify(
      refreshToken,
      refreshSecret,
    ) as UserPayload;

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    const myTokens = await prisma.refreshToken.findMany({
      where: { adminId: refreshPayload.payload.id },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(401).json({ message: "Session expirée" });
    }

    const newAccessToken = jwt.sign(
      { payload: refreshPayload.payload },
      accessSecret,
      { expiresIn: "15m" },
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    (req as RequestWithUser).user = refreshPayload.payload;
    return next();
  } catch {
    // Refresh token invalide ou expiré
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(401).json({ message: "Session expirée ou invalide" });
  }
};

export default authMiddleware;
