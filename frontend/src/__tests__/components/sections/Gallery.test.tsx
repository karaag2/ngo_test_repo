/**
 * =============================================================
 *  TESTS : Section Gallery — src/components/sections/Gallery.tsx
 * =============================================================
 *
 * La Gallery montre les activités de l'ONG. Chaque carte
 * doit être cliquable et mener vers la page blog correspondante.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import Gallery from "@/src/components/sections/Gallery";

describe("Gallery", () => {
  describe("Titres", () => {
    it("affiche 'Nos Activités'", () => {
      render(<Gallery />);
      expect(screen.getByText("Nos Activités")).toBeInTheDocument();
    });

    it("affiche 'L'impact en'", () => {
      render(<Gallery />);
      expect(screen.getByText(/L'impact en/)).toBeInTheDocument();
    });

    it("affiche 'Images'", () => {
      render(<Gallery />);
      expect(screen.getByText("Images")).toBeInTheDocument();
    });
  });

  describe("Activités affichées", () => {
    it("affiche 'Distribution de kits'", () => {
      render(<Gallery />);
      expect(screen.getByText("Distribution de kits")).toBeInTheDocument();
    });

    it("affiche 'Construction d'école'", () => {
      render(<Gallery />);
      expect(screen.getByText("Construction d'école")).toBeInTheDocument();
    });

    it("affiche 'Formation pédagogique'", () => {
      render(<Gallery />);
      expect(screen.getByText("Formation pédagogique")).toBeInTheDocument();
    });

    it("affiche 'Accès à l'eau'", () => {
      render(<Gallery />);
      expect(screen.getByText("Accès à l'eau")).toBeInTheDocument();
    });

    it("affiche 'Consultation médicale'", () => {
      render(<Gallery />);
      expect(screen.getByText("Consultation médicale")).toBeInTheDocument();
    });
  });

  describe("Catégories", () => {
    it("affiche les badges de catégories", () => {
      render(<Gallery />);
      expect(screen.getByText("Éducation")).toBeInTheDocument();
      expect(screen.getByText("Infrastructure")).toBeInTheDocument();
      expect(screen.getByText("Savoir-faire")).toBeInTheDocument();
      expect(screen.getByText("Vie Quotidienne")).toBeInTheDocument();
      expect(screen.getByText("Santé")).toBeInTheDocument();
    });
  });

  describe("Liens", () => {
    it("contient des liens vers les articles du blog", () => {
      render(<Gallery />);
      const links = screen.getAllByRole("link");
      // 5 activités + 1 lien "Voir tous nos articles"
      expect(links.length).toBeGreaterThanOrEqual(5);
    });

    it("affiche le lien 'Voir tous nos articles'", () => {
      render(<Gallery />);
      expect(screen.getByText("Voir tous nos articles")).toBeInTheDocument();
    });

    it("le lien principal mène vers /blog", () => {
      render(<Gallery />);
      const allArticlesLink = screen
        .getByText("Voir tous nos articles")
        .closest("a");
      expect(allArticlesLink).toHaveAttribute("href", "/blog");
    });
  });

  describe("Sémantique", () => {
    it("est une section avec l'id 'activites'", () => {
      render(<Gallery />);
      const section = document.getElementById("activites");
      expect(section).not.toBeNull();
    });
  });

  describe("Images", () => {
    it("affiche les images de toutes les activités", () => {
      render(<Gallery />);
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThanOrEqual(5);
    });
  });
});
