import type { Request, Response } from "express";

import {
  addPostService,
  deletePostService,
  getAllPostService,
  getPostService,
  getPostBySlugService,
  updatePostService,
} from "@/services/blogpost.service.js";
import AppError from "@/utils/appError.js";
import { BlogSchema } from "@/validators/blog.validators.js";
import type { RequestWithUser } from "@/validators/auth.validator.js";
import xss from "xss";

export const getAllPostController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  // Par défaut on ne renvoie que les publiés, sauf si explicitement demandé (via admin par ex)
  const publishedOnly = req.query.adminView !== "true";

  const result = await getAllPostService(page, limit, publishedOnly);
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

export const getPostBySlugController = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug || typeof slug !== "string")
    throw new AppError("Le slug du post est requis", 400);

  const Post = await getPostBySlugService(slug);
  return res.json({ message: "Opération réussie", Post });
};

export const addPostController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;

  const result = BlogSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Données invalides", 400);
  }

  // Sanitization XSS
  const sanitizedData = {
    title: result.data.title ? xss(result.data.title) : result.data.title,
    description: result.data.description
      ? xss(result.data.description)
      : result.data.description,
    content: result.data.content
      ? xss(result.data.content)
      : result.data.content,
    category: result.data.category
      ? xss(result.data.category)
      : result.data.category,
    imageUrl: result.data.imageUrl
      ? xss(result.data.imageUrl)
      : result.data.imageUrl,
    published: result.data.published,
    slug: result.data.slug,
  };

  const newPost = await addPostService(adminId, sanitizedData);
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

  // Sanitization XSS
  const sanitizedData = {
    title: result.data.title ? xss(result.data.title) : result.data.title,
    description: result.data.description
      ? xss(result.data.description)
      : result.data.description,
    content: result.data.content
      ? xss(result.data.content)
      : result.data.content,
    category: result.data.category
      ? xss(result.data.category)
      : result.data.category,
    imageUrl: result.data.imageUrl
      ? xss(result.data.imageUrl)
      : result.data.imageUrl,
    published: result.data.published,
    slug: result.data.slug,
  };

  const updatedPost = await updatePostService(adminId, id, sanitizedData);
  return res
    .status(200)
    .json({ message: "Post mis à jour avec succès", Post: updatedPost });
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
