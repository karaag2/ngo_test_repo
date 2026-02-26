/**
 * =============================================================
 *  TESTS : Section Témoignages — src/components/sections/Temoignages.tsx
 * =============================================================
 *
 * Les témoignages renforcent la confiance des donateurs.
 * Les noms, messages et niveaux doivent être correctement affichés.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import Temoignages from "@/src/components/sections/Temoignages";

describe("Temoignages", () => {
  describe("Titre de la section", () => {
    it("affiche 'Histoires'", () => {
      render(<Temoignages />);
      expect(screen.getByText(/Histoires/)).toBeInTheDocument();
    });

    it("affiche 'Inspirantes'", () => {
      render(<Temoignages />);
      expect(screen.getByText("Inspirantes")).toBeInTheDocument();
    });

    it("affiche la description de la section", () => {
      render(<Temoignages />);
      expect(
        screen.getByText(/Découvrez l'impact réel de vos contributions/),
      ).toBeInTheDocument();
    });
  });

  describe("Contenu des témoignages", () => {
    it("affiche le nom d'Awa Traoré", () => {
      render(<Temoignages />);
      expect(screen.getByText("Awa Traoré")).toBeInTheDocument();
    });

    it("affiche le nom de Mamadou Diallo", () => {
      render(<Temoignages />);
      expect(screen.getByText("Mamadou Diallo")).toBeInTheDocument();
    });

    it("affiche 'Enfants de Ndioum'", () => {
      render(<Temoignages />);
      expect(screen.getByText("Enfants de Ndioum")).toBeInTheDocument();
    });

    it("affiche les niveaux/postes", () => {
      render(<Temoignages />);
      expect(screen.getByText("Élève 5e Année médecine")).toBeInTheDocument();
      expect(
        screen.getByText("Professeur de mathématiques"),
      ).toBeInTheDocument();
      expect(screen.getByText("Élèves Primaire")).toBeInTheDocument();
    });
  });

  describe("Images des témoins", () => {
    it("affiche les photos de profil avec le bon alt", () => {
      render(<Temoignages />);
      expect(screen.getByAltText("Awa Traoré")).toBeInTheDocument();
      expect(screen.getByAltText("Mamadou Diallo")).toBeInTheDocument();
      expect(screen.getByAltText("Enfants de Ndioum")).toBeInTheDocument();
    });
  });

  describe("Carousel", () => {
    it("affiche les boutons de navigation du carousel", () => {
      render(<Temoignages />);
      const buttons = screen.getAllByRole("button");
      // Au minimum les boutons Previous et Next du carousel
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
  });
});
