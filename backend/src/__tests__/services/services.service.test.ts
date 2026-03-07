import { describe, it, expect } from "vitest";
import { getallService, getService } from "@/services/services.service.js";
import prisma from "@/lib/db.js";

describe("Services (Contenu ONG) Service", () => {
  it("Devrait récupérer un service existant", async () => {
    const fakeService = {
      id: 1,
      title: "Sante",
      description: "Secours",
      createdAt: new Date(),
      updatedAt: new Date(),
      icon: null,
      color: null,
      order: 0,
      createdById: "x",
    };
    // @ts-ignore
    prisma.service.findUnique.mockResolvedValue(fakeService);

    const result = await getService(1);
    expect(result.title).toBe("Sante");
    expect(prisma.service.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("Devrait déclencher une exception si service introuvable", async () => {
    // @ts-ignore
    prisma.service.findUnique.mockResolvedValue(null);
    await expect(getService(99)).rejects.toThrow("Service non trouvé");
  });
});
