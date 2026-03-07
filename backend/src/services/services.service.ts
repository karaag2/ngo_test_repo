import prisma from "@/lib/db.js";
import type { Service } from "@/generated/prisma/client.js";
import AppError from "@/utils/appError.js";

export const getallService = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.service.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.count(),
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

export const getService = async (serviceId: number) => {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });
  if (!service) throw new AppError("Service non trouvé", 404);
  return service;
};

export const deleteService = async (adminId: string, serviceId: number) => {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) throw new AppError("Service non trouvé", 404);

  // Vérification si l'admin est le créateur (optionnel selon tes besoins)
  if (service.createdById !== adminId) {
    throw new AppError(
      "Vous n'avez pas la permission de supprimer ce service",
      403,
    );
  }

  return await prisma.service.delete({
    where: { id: serviceId },
  });
};

export const addService = async (
  adminId: string,
  data: Omit<Service, "id" | "createdAt" | "updatedAt" | "createdById">,
) => {
  return await prisma.service.create({
    data: {
      ...data,
      createdById: adminId,
    },
  });
};

export const updateService = async (
  adminId: string,
  serviceId: number,
  data: Partial<
    Omit<Service, "id" | "createdAt" | "updatedAt" | "createdById">
  >,
) => {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) throw new AppError("Service non trouvé", 404);

  if (service.createdById !== adminId) {
    throw new AppError(
      "Vous n'avez pas la permission de mettre à jour ce service",
      403,
    );
  }

  return await prisma.service.update({
    where: { id: serviceId },
    data: {
      ...data,
      createdById: adminId,
    },
  });
};
