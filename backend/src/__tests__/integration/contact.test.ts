import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import prisma from "@/lib/db.js";

// Mock de Prisma
vi.mock("@/lib/db.js", () => ({
  default: {
    contact: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    admin: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Contact Controller - Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/contacts", () => {
    it("devrait créer un message de contact avec des données valides", async () => {
      const mockContact = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        message: "Hello world",
        read: false,
        createdAt: new Date(),
      };

      (prisma.contact.create as any).mockResolvedValue(mockContact);

      const response = await request(app).post("/api/contacts").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        message: "Hello world",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Message envoyé avec succès");
      expect(response.body.contact.email).toBe("john@example.com");
    });

    it("devrait retourner 400 pour des données invalides", async () => {
      const response = await request(app).post("/api/contacts").send({
        email: "not-an-email",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Données invalides");
    });
  });

  describe("GET /api/contacts (Protégé)", () => {
    it("devrait retourner 401 si non authentifié", async () => {
      const response = await request(app).get("/api/contacts");
      expect(response.status).toBe(401);
    });
  });
});
