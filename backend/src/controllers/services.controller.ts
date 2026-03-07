import type { Request, Response } from "express";

import {
  addService,
  deleteService,
  getallService,
  getService,
  updateService,
} from "@/services/services.service.js";
import AppError from "@/utils/appError.js";
import { serviceSchema } from "@/validators/service.validators.js";
import type { RequestWithUser } from "@/validators/auth.validator.js";
import type { Service } from "@/generated/prisma/browser.js";

export const getAllServicesController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await getallService(page, limit);
  return res.status(200).json({ message: "Opération réussie", ...result });
};

export const getServiceController = async (req: Request, res: Response) => {
  const { ServiceId } = req.params;
  if (!ServiceId || typeof ServiceId !== "string")
    throw new AppError("L'ID du service est requis", 400);

  const id = parseInt(ServiceId);
  if (isNaN(id)) throw new AppError("ID du service invalide", 400);

  const service = await getService(id);
  return res.json({ message: "Opération réussie", service });
};

export const addServiceController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;

  const result = serviceSchema.safeParse(req.body);
  console.log(result);
  if (!result.success) {
    throw new AppError("Données invalides", 400);
  }

  const newService = await addService(adminId, result.data as Service);
  return res
    .status(201)
    .json({ message: "Service créé avec succès", service: newService });
};

export const updateServiceController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;
  const { ServiceId } = req.params;

  if (!ServiceId || typeof ServiceId !== "string")
    throw new AppError("L'ID du service est requis", 400);
  const id = parseInt(ServiceId);
  if (isNaN(id)) throw new AppError("ID du service invalide", 400);

  const result = serviceSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Données invalides", 400);
  }

  const updatedService = await updateService(
    adminId,
    id,
    result.data as unknown as Partial<Service>,
  );
  return res.json({
    message: "Service mis à jour avec succès",
    service: updatedService,
  });
};

export const deleteServiceController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;
  const { ServiceId } = req.params;

  if (!ServiceId || typeof ServiceId !== "string")
    throw new AppError("L'ID du service est requis", 400);
  const id = parseInt(ServiceId);
  if (isNaN(id)) throw new AppError("ID du service invalide", 400);

  const deletedService = await deleteService(adminId, id);
  return res
    .status(200)
    .json({ message: "Service supprimé avec succès", service: deletedService });
};
