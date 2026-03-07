import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import prisma from "@/lib/db.js";

// Mock de Prisma
vi.mock("@/lib/db.js", () => ({
  default: {
    activity: {
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    admin: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Blog Controller - Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/blog/allPosts", () => {
    it("devrait retourner la liste des articles", async () => {
      (prisma.activity.findMany as any).mockResolvedValue([]);
      (prisma.activity.count as any).mockResolvedValue(0);

      const response = await request(app).get("/api/blog/allPosts");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Opération réussie");
      expect(response.body.data).toBeDefined();
    });
  });

  describe("GET /api/blog/slug/:slug", () => {
    it("devrait retourner un article par son slug", async () => {
      const mockPost = {
        id: 1,
        title: "Titre",
        slug: "test-slug",
        published: true,
      };
      (prisma.activity.findUnique as any).mockResolvedValue(mockPost);

      const response = await request(app).get("/api/blog/slug/test-slug");

      expect(response.status).toBe(200);
      expect(response.body.Post.slug).toBe("test-slug");
    });

    it("devrait retourner 404 si l'article n'existe pas", async () => {
      (prisma.activity.findUnique as any).mockResolvedValue(null);

      const response = await request(app).get("/api/blog/slug/introuvable");
      // Selon blogpost.service.ts, il lève probablement une erreur 404
      expect(response.status).toBe(404);
    });
  });
});
