/**
 * =============================================================
 *  TESTS : Section Cause — src/components/sections/cause.tsx
 * =============================================================
 *
 * Cette section explique le problème que résout l'ONG.
 * Les statistiques d'impact (40% non scolarisés) et les
 * descriptions doivent être présentes et correctes.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import Cause from "@/src/components/sections/Cause";

describe("Cause", () => {
  describe("Titres et sous-titres", () => {
    it("affiche le titre de la section 'La Réalité'", () => {
      render(<Cause />);
      expect(screen.getByText("La Réalité")).toBeInTheDocument();
    });

    it("affiche 'Pourquoi Agir'", () => {
      render(<Cause />);
      expect(screen.getByText(/Pourquoi Agir/)).toBeInTheDocument();
    });

    it("affiche 'Maintenant ?'", () => {
      render(<Cause />);
      expect(screen.getByText("Maintenant ?")).toBeInTheDocument();
    });
  });

  describe("Statistique principale", () => {
    it("affiche la statistique '40% des enfants non scolarisés'", () => {
      render(<Cause />);
      expect(screen.getByText(/40% des enfants/)).toBeInTheDocument();
    });

    it("affiche le badge 'Critique'", () => {
      render(<Cause />);
      expect(screen.getByText("Critique")).toBeInTheDocument();
    });
  });

  describe("Cartes secondaires", () => {
    it("affiche 'Pénurie de Professeurs'", () => {
      render(<Cause />);
      expect(screen.getByText("Pénurie de Professeurs")).toBeInTheDocument();
    });

    it("affiche 'Rêves Suspendus'", () => {
      render(<Cause />);
      expect(screen.getByText("Rêves Suspendus")).toBeInTheDocument();
    });

    it("affiche 'Absence de Matériel'", () => {
      render(<Cause />);
      expect(screen.getByText("Absence de Matériel")).toBeInTheDocument();
    });
  });

  describe("Sémantique HTML", () => {
    it("est une section avec l'id 'cause'", () => {
      render(<Cause />);
      const section = document.getElementById("cause");
      expect(section).not.toBeNull();
      expect(section?.tagName).toBe("SECTION");
    });
  });

  describe("Images", () => {
    it("affiche l'image de la classe délabrée", () => {
      render(<Cause />);
      expect(screen.getByAltText("Classe délabrée")).toBeInTheDocument();
    });

    it("affiche l'image des livres scolaires", () => {
      render(<Cause />);
      expect(screen.getByAltText("Livres scolaires")).toBeInTheDocument();
    });
  });
});
