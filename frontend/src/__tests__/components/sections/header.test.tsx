/**
 * =============================================================
 *  TESTS : Section Header — src/components/sections/header.tsx
 * =============================================================
 *
 * Le Header est la barre de navigation fixe. Il doit toujours
 * afficher le logo, le bouton CTA et le toggle de thème.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import Header from "@/src/components/sections/Header";

describe("Header", () => {
  describe("Logo", () => {
    it("affiche le nom 'FJ'", () => {
      render(<Header />);
      expect(screen.getByText("FJ")).toBeInTheDocument();
    });

    it("affiche l'image du logo", () => {
      render(<Header />);
      expect(screen.getByAltText("Logo FJ")).toBeInTheDocument();
    });
  });

  describe("CTA principal", () => {
    it("affiche le bouton 'Participer'", () => {
      render(<Header />);
      expect(
        screen.getByRole("button", { name: "Participer" }),
      ).toBeInTheDocument();
    });
  });

  describe("Toggle de thème", () => {
    it("affiche le bouton de changement de thème avec texte accessible", () => {
      render(<Header />);
      expect(screen.getByText("Changer le thème")).toBeInTheDocument();
    });
  });

  describe("Sémantique HTML", () => {
    it("utilise une balise <header>", () => {
      render(<Header />);
      const header = document.querySelector("header");
      expect(header).not.toBeNull();
    });
  });
});
