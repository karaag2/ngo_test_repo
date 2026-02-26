/**
 * =============================================================
 *  TESTS : Section MapSection — src/components/sections/MapSection.tsx
 * =============================================================
 *
 * La MapSection affiche les points d'intervention et les missions.
 * La carte elle-même est chargée dynamiquement (MapLoader),
 * mais on teste le contenu textuel qui l'accompagne.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import MapSection from "@/src/components/sections/MapSection";

describe("MapSection", () => {
  describe("Titres", () => {
    it("affiche 'Notre Mission'", () => {
      render(<MapSection />);
      expect(screen.getByText("Notre Mission")).toBeInTheDocument();
    });

    it("affiche 'Construire les fondements'", () => {
      render(<MapSection />);
      expect(screen.getByText(/Construire les fondements/)).toBeInTheDocument();
    });

    it("affiche 'de l'avenir.'", () => {
      render(<MapSection />);
      expect(screen.getByText("de l'avenir.")).toBeInTheDocument();
    });
  });

  describe("Cartes de mission", () => {
    it("affiche 'Construire des Écoles'", () => {
      render(<MapSection />);
      expect(screen.getByText("Construire des Écoles")).toBeInTheDocument();
    });

    it("affiche 'Former des Enseignants'", () => {
      render(<MapSection />);
      expect(screen.getByText("Former des Enseignants")).toBeInTheDocument();
    });

    it("affiche 'Matériel Scolaire'", () => {
      render(<MapSection />);
      expect(screen.getByText("Matériel Scolaire")).toBeInTheDocument();
    });
  });

  describe("Descriptions des missions", () => {
    it("décrit les écoles", () => {
      render(<MapSection />);
      expect(screen.getByText(/Salles de classe sûres/)).toBeInTheDocument();
    });

    it("décrit la formation", () => {
      render(<MapSection />);
      expect(screen.getByText(/Autonomisation locale/)).toBeInTheDocument();
    });

    it("décrit le matériel scolaire", () => {
      render(<MapSection />);
      expect(screen.getByText(/Garantir à chaque enfant/)).toBeInTheDocument();
    });
  });

  describe("Sémantique", () => {
    it("est une section avec l'id 'mission'", () => {
      render(<MapSection />);
      const section = document.getElementById("mission");
      expect(section).not.toBeNull();
    });
  });
});
