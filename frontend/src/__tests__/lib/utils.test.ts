/**
 * =============================================================
 *  TESTS : Fonction utilitaire cn() — src/lib/utils.ts
 * =============================================================
 *
 * Pourquoi tester ça ?
 * --------------------
 * La fonction `cn()` est la base de tout le système de styles.
 * Si elle casse, TOUS les composants sont visuellement cassés.
 * C'est un "fondation test" — peu glamour, mais indispensable.
 *
 * Quoi tester ?
 * -------------
 * 1. Cas normal : deux classes fusionnées
 * 2. Cas de conflit Tailwind : les classes conflictuelles
 *    doivent être résolues (ex: p-2 vs p-4 → p-4 gagne)
 * 3. Cas limites : undefined, null, chaînes vides
 */

import { describe, it, expect } from "vitest";
import { cn } from "@/src/lib/utils";

describe("cn() — Fusion de classes CSS", () => {
  it("fusionne plusieurs classes simples", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("résout les conflits de classes Tailwind (la dernière gagne)", () => {
    const result = cn("p-2", "p-4");
    expect(result).toBe("p-4");
  });

  it("ignore les valeurs undefined et null", () => {
    const result = cn("text-main", undefined, null, "font-bold");
    expect(result).toBe("text-main font-bold");
  });

  it("gère les classes conditionnelles (pattern classique React)", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toContain("active-class");
  });

  it("renvoie une chaîne vide quand aucune classe valide", () => {
    const result = cn(undefined, null, false);
    expect(result).toBe("");
  });

  it("fusionne les classes avec clsx syntax (objets)", () => {
    const result = cn("base", { "text-primary": true, hidden: false });
    expect(result).toContain("text-primary");
    expect(result).not.toContain("hidden");
  });
});
