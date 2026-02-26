/**
 * =============================================================
 *  TESTS : Données NigerPoints — src/data/NigerPoints.ts
 * =============================================================
 *
 * Les données géographiques des établissements sont critiques
 * pour la carte interactive. Ces tests vérifient :
 * - La structure de chaque point
 * - La validité des coordonnées GPS
 * - La cohérence des types d'établissements
 */

import { describe, it, expect } from "vitest";
import { locations } from "@/src/data/NigerPoints";

describe("Données géographiques — NigerPoints", () => {
  it("contient au moins un établissement", () => {
    expect(locations.length).toBeGreaterThan(0);
  });

  it("chaque établissement a les champs obligatoires", () => {
    locations.forEach((loc) => {
      expect(loc).toHaveProperty("id");
      expect(loc).toHaveProperty("name");
      expect(loc).toHaveProperty("lng");
      expect(loc).toHaveProperty("lat");
      expect(loc).toHaveProperty("ville");
      expect(loc).toHaveProperty("region");
      expect(loc).toHaveProperty("type");
      expect(loc).toHaveProperty("eleves");
      expect(loc).toHaveProperty("services");
    });
  });

  it("les coordonnées GPS sont dans les limites du Niger", () => {
    // Niger : lat 11.7-23.5, lng 0.2-16
    locations.forEach((loc) => {
      expect(loc.lat).toBeGreaterThanOrEqual(11);
      expect(loc.lat).toBeLessThanOrEqual(24);
      expect(loc.lng).toBeGreaterThanOrEqual(0);
      expect(loc.lng).toBeLessThanOrEqual(16);
    });
  });

  it("les ids sont uniques", () => {
    const ids = locations.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("chaque établissement a au moins un service", () => {
    locations.forEach((loc) => {
      expect(loc.services.length).toBeGreaterThan(0);
    });
  });

  it("le type est parmi les valeurs autorisées", () => {
    const validTypes = [
      "École primaire",
      "Collège",
      "Lycée technique",
      "Centre de formation",
    ];
    locations.forEach((loc) => {
      expect(validTypes).toContain(loc.type);
    });
  });

  it("le nombre d'élèves est un entier positif", () => {
    locations.forEach((loc) => {
      expect(loc.eleves).toBeGreaterThan(0);
      expect(Number.isInteger(loc.eleves)).toBe(true);
    });
  });

  it("l'année d'ouverture est raisonnable (2015-2030)", () => {
    locations.forEach((loc) => {
      expect(loc.ouverture).toBeGreaterThanOrEqual(2015);
      expect(loc.ouverture).toBeLessThanOrEqual(2030);
    });
  });
});
