/**
 * =============================================================
 *  TESTS : Section Hero — src/components/sections/hero.tsx
 * =============================================================
 *
 * La Hero est la première chose que voit l'utilisateur.
 * Si le titre, les CTA (Call-to-Action) ou le badge urgent
 * ne s'affichent pas, c'est toute la première impression qui
 * est perdue. Ces tests s'assurent du contenu critique.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import Hero from "@/src/components/sections/hero";

describe("Hero", () => {
  describe("Contenu textuel", () => {
    it("affiche le titre principal 'Bâtir Ensemble'", () => {
      render(<Hero />);
      expect(screen.getByText("Ensemble")).toBeInTheDocument();
    });

    it("affiche la mention 'Sahel' dans le titre", () => {
      render(<Hero />);
      expect(screen.getByText("Sahel")).toBeInTheDocument();
    });

    it("affiche le badge 'APPEL URGENT'", () => {
      render(<Hero />);
      expect(screen.getByText("APPEL URGENT")).toBeInTheDocument();
    });

    it("affiche la description de la mission", () => {
      render(<Hero />);
      expect(
        screen.getByText(/Fajr œuvre pour résoudre la crise éducative/i),
      ).toBeInTheDocument();
    });
  });

  describe("Boutons d'action (CTA)", () => {
    it("affiche le bouton 'Faire un don'", () => {
      render(<Hero />);
      expect(
        screen.getByRole("button", { name: /faire un don/i }),
      ).toBeInTheDocument();
    });

    it("affiche le bouton 'Notre mission'", () => {
      render(<Hero />);
      expect(
        screen.getByRole("button", { name: /notre mission/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Sémantique HTML", () => {
    it("est une balise <section> avec l'id 'hero'", () => {
      render(<Hero />);
      const section = document.getElementById("hero");
      expect(section).not.toBeNull();
      expect(section?.tagName).toBe("SECTION");
    });
  });

  describe("Preuve sociale (contributeurs)", () => {
    it("affiche le nombre de donateurs", () => {
      render(<Hero />);
      expect(screen.getByText(/1,240 donateurs/)).toBeInTheDocument();
    });

    it("affiche le badge '+1K'", () => {
      render(<Hero />);
      expect(screen.getByText("+1K")).toBeInTheDocument();
    });

    it("affiche le texte d'impact", () => {
      render(<Hero />);
      expect(screen.getByText("Impact direct au Niger.")).toBeInTheDocument();
    });
  });

  describe("Image Hero", () => {
    it("rend l'image Hero avec le bon alt", () => {
      render(<Hero />);
      expect(screen.getByAltText("L'éducation pour tous")).toBeInTheDocument();
    });
  });
});
