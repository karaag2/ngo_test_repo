import { describe, it, expect, vi } from "vitest";
import {
  createContactService,
  getAllContactsService,
  toggleContactReadStatusService,
  deleteContactService,
} from "@/services/contact.service.js";
import prisma from "@/lib/db.js";

describe("Contacts Service", () => {
  it("Devrait créer un contact avec Prisma", async () => {
    const input = {
      firstName: "John",
      lastName: "Doe",
      email: "j@d.com",
      message: "Hello",
    };
    // @ts-ignore
    prisma.contact.create.mockResolvedValue({
      id: 1,
      ...input,
      read: false,
      createdAt: new Date(),
    });

    const result = await createContactService(input);
    expect(result.firstName).toBe("John");
    expect(prisma.contact.create).toHaveBeenCalledOnce();
  });

  it("Devrait récupérer la liste paige des contacts", async () => {
    // @ts-ignore
    prisma.contact.findMany.mockResolvedValue([]);
    // @ts-ignore
    prisma.contact.count.mockResolvedValue(0);

    const result = await getAllContactsService(1, 10);
    expect(result.data).toEqual([]);
    expect(result.meta.page).toBe(1);
    expect(result.meta.total).toBe(0);
  });

  it("Devrait renvoyer une erreur si on modifie le status d'un message inexistant", async () => {
    // @ts-ignore
    prisma.contact.findUnique.mockResolvedValue(null);

    await expect(toggleContactReadStatusService(999)).rejects.toThrow(
      "Message non trouvé",
    );
  });
});
