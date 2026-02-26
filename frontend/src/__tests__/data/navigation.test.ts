/**
 * =============================================================
 *  TESTS : Données de navigation — src/data/navigation.ts
 * =============================================================
 *
 * Pourquoi tester les données ?
 * ----------------------------
 * Quand on connectera le backend, les données statiques seront
 * remplacées par des appels API. Ces tests deviennent alors des
 * "contrats" qui vérifient que la structure des données reste
 * compatible, quel que soit la source (statique ou API).
 */

import { describe, it, expect } from "vitest";
import { Sections } from "@/src/data/navigation";

describe("Données de navigation", () => {
  it("contient au moins une section", () => {
    expect(Sections.length).toBeGreaterThan(0);
  });

  it("chaque section a un href et un label", () => {
    Sections.forEach((section) => {
      expect(section).toHaveProperty("href");
      expect(section).toHaveProperty("label");
      expect(typeof section.href).toBe("string");
      expect(typeof section.label).toBe("string");
    });
  });

  it("les href commencent par le bon préfixe (ancre ou route)", () => {
    Sections.forEach((section) => {
      expect(section.href).toMatch(/^(\/|#)/);
    });
  });

  it("contient la section Accueil", () => {
    const accueil = Sections.find((s) => s.label === "Accueil");
    expect(accueil).toBeDefined();
  });

  it("contient la section Contact", () => {
    const contact = Sections.find((s) => s.label === "Contact");
    expect(contact).toBeDefined();
  });

  it("aucun label n'est vide", () => {
    Sections.forEach((section) => {
      expect(section.label.trim()).not.toBe("");
    });
  });
});
