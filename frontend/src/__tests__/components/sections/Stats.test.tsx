/**
 * =============================================================
 *  TESTS : Section Stats — src/components/sections/Stats.tsx
 * =============================================================
 *
 * Les Stats montrent l'impact de l'ONG. Les chiffres affichés
 * doivent correspondre aux données réelles. Si un jour ces
 * données viennent d'une API, ces tests protègent l'affichage.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import Stats from "@/src/components/sections/Stats";

describe("Stats", () => {
  describe("Statistiques affichées", () => {
    it("affiche '10k+' élèves impactés", () => {
      render(<Stats />);
      expect(screen.getByText("10k+")).toBeInTheDocument();
    });

    it("affiche '50+' écoles construites", () => {
      render(<Stats />);
      expect(screen.getByText("50+")).toBeInTheDocument();
    });

    it("affiche '100%' transparence", () => {
      render(<Stats />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });
  });

  describe("Labels des statistiques", () => {
    it("affiche le label 'Élèves Impactés'", () => {
      render(<Stats />);
      expect(screen.getByText("Élèves Impactés")).toBeInTheDocument();
    });

    it("affiche le label 'Écoles construites'", () => {
      render(<Stats />);
      expect(screen.getByText("Écoles construites")).toBeInTheDocument();
    });

    it("affiche le label 'Transparence'", () => {
      render(<Stats />);
      expect(screen.getByText("Transparence")).toBeInTheDocument();
    });
  });

  describe("Descriptions", () => {
    it("affiche la description des élèves", () => {
      render(<Stats />);
      expect(
        screen.getByText(
          /Ayant accès à une éducation de qualité grâce à vos dons/,
        ),
      ).toBeInTheDocument();
    });

    it("affiche la description de la transparence", () => {
      render(<Stats />);
      expect(
        screen.getByText(/Chaque centime investi directement sur le terrain/),
      ).toBeInTheDocument();
    });
  });
});
