import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import prisma from "@/lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock des composants critiques
vi.mock("@/lib/db.js", () => ({
  default: {
    admin: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    refreshToken: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}));

describe("Auth Controller - Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/auth/login", () => {
    it("devrait retourner 400 si l'email ou le mdp n'est pas fourni (validation Zod)", async () => {
      const response = await request(app).post("/api/auth/login").send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Identifiants invalides");
    });

    it("devrait authentifier correctement l'utilisateur si les creds sont bons", async () => {
      // Setup des mocks
      const mockUser = {
        id: "1",
        email: "admin@makaranta.com",
        password: "hashed_password",
        name: "Admin",
        role: "SUPER_ADMIN",
        twoFactorEnabled: false,
      };

      (prisma.admin.findUnique as any).mockResolvedValue(mockUser);
      (bcrypt.compare as any).mockResolvedValue(true);
      (prisma.refreshToken.upsert as any).mockResolvedValue({
        id: 1,
        token: "refresh_token",
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "admin@makaranta.com",
        password: "SuperAdminPassword123!",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Connexion réussie");
      expect(response.body.admin).toBeDefined();
      expect(response.body.admin.email).toBe("admin@makaranta.com");

      // On s'assure que les cookies sont présents
      const cookies = response.headers["set-cookie"];
      expect(cookies).toBeDefined();
      expect(cookies.some((c: string) => c.includes("accessToken="))).toBe(
        true,
      );
      expect(cookies.some((c: string) => c.includes("refreshToken="))).toBe(
        true,
      );
    });

    it("devrait retourner une demande de 2FA si activé pour l'utilisateur", async () => {
      const mockUser = {
        id: "2",
        email: "2fa@makaranta.com",
        password: "hashed_password",
        name: "Admin 2FA",
        role: "ADMIN",
        twoFactorEnabled: true,
      };

      (prisma.admin.findUnique as any).mockResolvedValue(mockUser);
      (bcrypt.compare as any).mockResolvedValue(true);

      const response = await request(app).post("/api/auth/login").send({
        email: "2fa@makaranta.com",
        password: "SuperAdminPassword123!",
      });

      expect(response.status).toBe(200);
      expect(response.body.necessite2FA).toBe(true);
      expect(response.body.adminTemporaire).toBe("2");
    });
  });
});
