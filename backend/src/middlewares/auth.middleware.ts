import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db.js";
import AppError from "@/utils/appError.js";
import type { RequestWithUser, UserPayload } from "@/validators/vallidators.js";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  const accessSecret = process.env.JWT_ACCESS_SECRET || "";
  const refreshSecret = process.env.JWT_REFRESH_SECRET || "";
  
  //  Tentative de vérification de l'access token
  if (accessToken) {

    try {
      const payload = jwt.verify(accessToken, accessSecret) as UserPayload;
      if (typeof payload !== "object" || payload === null) {
        throw new AppError("Token invalide", 401);
      }
      (req as RequestWithUser).user = payload.user;
      return next();
    } catch {
      // Access token expiré → on passe à la vérification du refresh token
    }
  }

  // si access invalide on vérifie le refresh token
  if (!refreshToken) {
    return res.status(401).json({
      message:
        "Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.",
    });
  }
  //tentative de refresh le token
  try {
    const refreshPayload = jwt.verify(
      refreshToken,
      refreshSecret,
    ) as UserPayload;

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(401).json({ message: "Session expirée" });
    }

    const newAccessToken = jwt.sign(
      { payload: refreshPayload.user },
      accessSecret,
      { expiresIn: "15m" },
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    (req as RequestWithUser).user = refreshPayload.user;
    return next();
  } catch {
    // Refresh token invalide ou expiré
    return res.status(401).json({ message: "Session expirée ou invalide" });
  }
};

export default authMiddleware;