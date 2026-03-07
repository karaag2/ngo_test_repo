import type { Request, Response, NextFunction } from "express";
import AppError from "@/utils/appError.js";
import type { RequestWithUser } from "@/validators/auth.validator.js";

/**
 * ─── Middleware d'autorisation par rôle ───────────────
 *
 * Vérifie que l'utilisateur connecté possède l'un des rôles
 * requis. Le SUPER_ADMIN a un accès implicite à toutes les
 * ressources protégées.
 *
 * @param allowedRoles - Liste des rôles autorisés
 */
const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;

    if (!user || !user.role) {
      throw new AppError("Non autorisé", 403);
    }

    // Le SUPER_ADMIN a toujours accès à toutes les ressources
    if (user.role === "SUPER_ADMIN") {
      return next();
    }

    // Vérifier si le rôle de l'utilisateur est dans la liste autorisée
    if (!allowedRoles.includes(user.role)) {
      throw new AppError(
        "Vous n'avez pas les droits nécessaires pour cette action",
        403,
      );
    }

    return next();
  };
};

export default requireRole;
