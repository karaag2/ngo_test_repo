import type { Request, Response } from "express";
import AppError from "@/utils/appError.js";

export const uploadImageController = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError("Aucun fichier image fourni", 400);
  }

  // Frontend aura besoin de cette URL pour l'insérer
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  return res.status(200).json({
    success: true,
    message: "Image téléchargée avec succès",
    url: fileUrl,
  });
};
