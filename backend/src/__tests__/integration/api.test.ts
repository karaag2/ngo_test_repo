import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "@/app.js";
import prisma from "@/lib/db.js";

describe("Integration Tests - Contacts API", () => {
  it("POST /api/contacts - Succès avec payload valide", async () => {
    const playload = {
      firstName: "Test",
      lastName: "Unitaire",
      email: "test@unit.com",
      message: "Bonjour c'est Vitest!",
    };

    // @ts-ignore
    prisma.contact.create.mockResolvedValue({
      id: 2,
      ...playload,
      read: false,
      createdAt: new Date(),
    });

    const res = await request(app).post("/api/contacts").send(playload);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Message envoyé avec succès");
    expect(res.body.contact.firstName).toBe("Test");
  });

  it("POST /api/contacts - Erreur 400 si données manquantes", async () => {
    const playload = { firstName: "Test", message: "Bonjour c'est Vitest!" }; // Manque email et lastName

    const res = await request(app).post("/api/contacts").send(playload);

    // Zod validator should block it
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("Données invalides");
  });
});
