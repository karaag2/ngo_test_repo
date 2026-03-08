import prisma from "@/lib/db.js";
import type { Activity } from "@/generated/prisma/client.js";
import AppError from "@/utils/appError.js";
import type { BlogInput as Post } from "@/validators/blog.validators.js";

export const getAllPostService = async (
  page: number = 1,
  limit: number = 10,
  publishedOnly: boolean = false,
) => {
  const skip = (page - 1) * limit;
  const where = publishedOnly ? { published: true } : {};

  const [data, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.activity.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getPostService = async (Postid: number) => {
  const Post = await prisma.activity.findUnique({
    where: {
      id: Postid,
    },
  });
  if (!Post) throw new AppError("Post non trouvé", 404);
  return Post;
};

export const getPostBySlugService = async (slug: string) => {
  const Post = await prisma.activity.findUnique({
    where: {
      slug: slug,
    },
  });
  if (!Post) throw new AppError("Post non trouvé", 404);
  return Post;
};
export const deletePostService = async (adminId: string, Postid: number) => {
  const Post = await prisma.activity.findUnique({
    where: {
      id: Postid,
    },
  });
  if (!Post) throw new AppError("Article non trouvé", 404);

  // Le SUPER_ADMIN peut supprimer n'importe quel article
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (Post.createdById !== adminId && admin?.role !== "SUPER_ADMIN") {
    throw new AppError(
      "Vous n'avez pas la permission de supprimer cet article",
      403,
    );
  }

  await prisma.activity.delete({
    where: {
      id: Postid,
    },
  });
  return Post;
};
export const addPostService = async (adminId: string, data: Post) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });
  if (!admin) throw new AppError("Non autorisé", 403);

  const postCreated = await prisma.activity.create({
    data: {
      title: data.title,
      description: data.description,
      content: data.content || null,
      category: data.category,
      slug: data.slug!,
      imageUrl: data.imageUrl,
      published: data.published,
      createdById: adminId,
    },
  });

  console.log(postCreated);
  return postCreated;
};
export const updatePostService = async (
  adminId: string,
  Postid: number,
  data: Post,
) => {
  const Post = await prisma.activity.findUnique({
    where: {
      id: Postid,
    },
  });
  if (!Post) throw new AppError("Article non trouvé", 404);

  // Le SUPER_ADMIN peut modifier n'importe quel article
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (Post.createdById !== adminId && admin?.role !== "SUPER_ADMIN")
    throw new AppError(
      "Vous n'avez pas la permission de modifier cet article",
      403,
    );

  await prisma.activity.update({
    where: {
      id: Postid,
    },
    data: {
      title: data.title,
      description: data.description,
      content: data.content || null,
      category: data.category,
      slug: data.slug!,
      imageUrl: data.imageUrl,
      published: data.published,
      createdById: adminId,
    },
  });
  return Post;
};
