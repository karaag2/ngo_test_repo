import { beforeEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { PrismaClient } from "@/generated/prisma/client.js";
import prisma from "@/lib/db.js";

// Mock des variables d'environnement stricte de Zod
process.env.DATABASE_URL = "file:./test.db";
process.env.JWT_ACCESS_SECRET = "test-secret-min-10-chars";
process.env.JWT_REFRESH_SECRET = "test-secret-refresh-10-chars";

// Mock Prisma
vi.mock("@/lib/db.js", () => {
  const mockPrisma = mockDeep<PrismaClient>();
  return {
    __esModule: true,
    default: mockPrisma,
  };
});

// Reset du mock avant chaque test
beforeEach(() => {
  mockReset(prisma as any);
});
