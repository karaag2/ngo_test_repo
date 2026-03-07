import prisma from "@/lib/db.js";
import type { ContactInput } from "@/validators/contact.validator.js";
import AppError from "@/utils/appError.js";

export const createContactService = async (data: ContactInput) => {
  return await prisma.contact.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      message: data.message,
    },
  });
};

export const getAllContactsService = async (
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.contact.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contact.count(),
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

export const toggleContactReadStatusService = async (id: number) => {
  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    throw new AppError("Message non trouvé", 404);
  }

  return await prisma.contact.update({
    where: { id },
    data: {
      read: !contact.read,
    },
  });
};

export const deleteContactService = async (id: number) => {
  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    throw new AppError("Message non trouvé", 404);
  }

  return await prisma.contact.delete({
    where: { id },
  });
};
