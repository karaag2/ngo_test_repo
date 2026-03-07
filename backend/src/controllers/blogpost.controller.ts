import type { Request, Response } from "express";

import {
  addPostService,
  deletePostService,
  getAllPostService,
  getPostService,
  updatePostService,
} from "@/services/blogpost.service.js";
import AppError from "@/utils/appError.js";
import { BlogSchema } from "@/validators/blog.validators.js";
import type { RequestWithUser } from "@/validators/auth.validator.js";

export const getAllPostController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await getAllPostService(page, limit);
  return res.status(200).json({ message: "Opération réussie", ...result });
};

export const getPostController = async (req: Request, res: Response) => {
  const { PostId } = req.params;
  if (!PostId || typeof PostId !== "string")
    throw new AppError("L'ID du post est requis", 400);

  const id = parseInt(PostId);
  if (isNaN(id)) throw new AppError("ID du post invalide", 400);

  const Post = await getPostService(id);
  return res.json({ message: "Opération réussie", Post });
};

export const addPostController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;

  const result = BlogSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Données invalides", 400);
  }

  const newPost = await addPostService(adminId, result.data);
  return res
    .status(201)
    .json({ message: "Post créé avec succès", Post: newPost });
};

export const updatePostController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;
  const { PostId } = req.params;

  if (!PostId || typeof PostId !== "string")
    throw new AppError("L'ID du post est requis", 400);
  const id = parseInt(PostId);
  if (isNaN(id)) throw new AppError("ID du post invalide", 400);

  const result = BlogSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Données invalides", 400);
  }

  const updatedPost = await updatePostService(adminId, id, result.data);
};

export const deletePostController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;
  const { PostId } = req.params;

  if (!PostId || typeof PostId !== "string")
    throw new AppError("L'ID du post est requis", 400);
  const id = parseInt(PostId);
  if (isNaN(id)) throw new AppError("ID du post invalide", 400);

  const deletedPost = await deletePostService(adminId, id);
  return res
    .status(200)
    .json({ message: "Post supprimé avec succès", Post: deletedPost });
};
