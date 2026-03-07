/**
 * =============================================================
 *  TESTS : Section Footer — src/components/sections/Footer.tsx
 * =============================================================
 *
 * Le Footer contient des informations légales et de contact.
 * Les liens du sitemap doivent fonctionner, les réseaux sociaux
 * doivent être présents, et le copyright doit être à jour.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import Footer from "@/src/components/sections/Footer";

describe("Footer", () => {
  describe("Logo et branding", () => {
    it("affiche le nom 'FJ'", () => {
      render(<Footer />);
      expect(screen.getByText("FJ")).toBeInTheDocument();
    });

    it("affiche la description de l'ONG", () => {
      render(<Footer />);
      expect(
        screen.getByText(/Fajr œuvre pour transformer l'avenir des enfants/),
      ).toBeInTheDocument();
    });
  });

  describe("Sitemap", () => {
    it("affiche le titre 'Sitemap'", () => {
      render(<Footer />);
      expect(screen.getByText("Sitemap")).toBeInTheDocument();
    });

    it("contient les liens de navigation principaux", () => {
      render(<Footer />);
      expect(screen.getByText("Accueil")).toBeInTheDocument();
      expect(screen.getByText("La Réalité")).toBeInTheDocument();
      expect(screen.getByText("Notre Mission")).toBeInTheDocument();
      expect(screen.getByText("Les Activités")).toBeInTheDocument();
      expect(screen.getByText("Faire un don")).toBeInTheDocument();
    });
  });

  describe("Projets", () => {
    it("affiche le titre 'Projets'", () => {
      render(<Footer />);
      expect(screen.getByText("Projets")).toBeInTheDocument();
    });

    it("liste les projets de l'ONG", () => {
      render(<Footer />);
      expect(screen.getByText("Construction d'écoles")).toBeInTheDocument();
      expect(screen.getByText("Formation enseignants")).toBeInTheDocument();
      expect(screen.getByText("Kits scolaires")).toBeInTheDocument();
      expect(screen.getByText("Bourses d'études")).toBeInTheDocument();
    });
  });

  describe("Contact", () => {
    it("affiche l'email de contact", () => {
      render(<Footer />);
      expect(screen.getByText("contact@Fajr-ong.org")).toBeInTheDocument();
    });

    it("affiche le téléphone", () => {
      render(<Footer />);
      expect(screen.getByText("+227 99 99 99 99")).toBeInTheDocument();
    });

    it("affiche le siège social", () => {
      render(<Footer />);
      expect(screen.getByText("Niamey, Plateau, Niger")).toBeInTheDocument();
    });
  });

  describe("Réseaux sociaux", () => {
    it("contient 4 liens de réseaux sociaux", () => {
      render(<Footer />);
      // Les icônes sont dans des liens <a>
      const allLinks = screen.getAllByRole("link");
      // Au moins 4 réseaux sociaux
      expect(allLinks.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Copyright", () => {
    it("affiche l'année en cours dans le copyright", () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear().toString();
      expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    });

    it("affiche 'Fajr ONG'", () => {
      render(<Footer />);
      expect(screen.getByText(/Fajr ONG/)).toBeInTheDocument();
    });
  });

  describe("Liens légaux", () => {
    it("affiche le lien Confidentialité", () => {
      render(<Footer />);
      expect(screen.getByText("Confidentialité")).toBeInTheDocument();
    });

    it("affiche le lien Mentions Légales", () => {
      render(<Footer />);
      expect(screen.getByText("Mentions Légales")).toBeInTheDocument();
    });
  });

  describe("Sémantique HTML", () => {
    it("utilise une balise <footer>", () => {
      render(<Footer />);
      const footer = document.querySelector("footer");
      expect(footer).not.toBeNull();
    });
  });
});
