import { describe, it, expect } from "vitest";
import hashPassword from "@/utils/hashPassword.js";
import AppError from "@/utils/appError.js";
import bcrypt from "bcrypt";
import generateTokens from "@/utils/generateTokens.js";

describe("Utils & Helpers", () => {
  it("Devrait lancer une AppError correcte", () => {
    const error = new AppError("Message test", 400);
    expect(error.message).toBe("Message test");
    expect(error.statusCode).toBe(400);
    expect(error.status).toBe("fail"); // 400 -> fail
  });

  it("Devrait lancer une erreur serveur (500 -> error)", () => {
    const error = new AppError("Critique", 500);
    expect(error.status).toBe("error");
  });

  it("Hachage de mot de passe", async () => {
    const original = "MotDePasseSecret123!";
    const hashed = await hashPassword(original);

    expect(hashed).not.toBe(original);
    const isMatch = await bcrypt.compare(original, hashed);
    expect(isMatch).toBe(true);
  });

  it("Génération de Tokens (Access & Refresh)", () => {
    const payload = { payload: { id: "1", email: "a@b.com", role: "ADMIN" } };
    const tokens = generateTokens(payload);

    expect(tokens).toHaveProperty("accessToken");
    expect(tokens).toHaveProperty("refreshToken");
    expect(typeof tokens.accessToken).toBe("string");
    expect(tokens.accessToken.length).toBeGreaterThan(10);
  });
});
