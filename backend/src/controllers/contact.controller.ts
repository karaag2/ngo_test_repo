import type { Request, Response } from "express";
import { contactSchema } from "@/validators/contact.validator.js";
import {
  createContactService,
  getAllContactsService,
  toggleContactReadStatusService,
  deleteContactService,
} from "@/services/contact.service.js";
import AppError from "@/utils/appError.js";

export const addContactController = async (req: Request, res: Response) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Données invalides", 400);
  }

  const newContact = await createContactService(result.data);
  return res.status(201).json({
    message: "Message envoyé avec succès",
    contact: newContact,
  });
};

export const getAllContactsController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await getAllContactsService(page, limit);
  return res.status(200).json({
    message: "Opération réussie",
    ...result,
  });
};

export const toggleReadStatusController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const contactId = parseInt(id as string);
  if (isNaN(contactId)) {
    throw new AppError("ID invalide", 400);
  }

  const updatedContact = await toggleContactReadStatusService(contactId);
  return res.status(200).json({
    message: "Statut mis à jour",
    contact: updatedContact,
  });
};

export const deleteContactController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contactId = parseInt(id as string);
  if (isNaN(contactId)) {
    throw new AppError("ID invalide", 400);
  }

  await deleteContactService(contactId);
  return res.status(200).json({
    message: "Message supprimé avec succès",
  });
};
