/**
 * =============================================================
 *  TESTS : Section Donation — src/components/sections/Donation.tsx
 * =============================================================
 *
 * C'est la section la plus CRITIQUE de tout le site.
 * Un bug ici = des dons perdus = impact direct sur la mission.
 *
 * Quand le backend sera connecté, la soumission du formulaire
 * enverra les données à l'API de paiement. Ces tests vérifient
 * que le formulaire est correctement structuré pour ça.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/src/__tests__/test-utils";
import Donation from "@/src/components/sections/Donation";

describe("Donation", () => {
  describe("Titres et structure", () => {
    it("affiche le titre 'Soutenez'", () => {
      render(<Donation />);
      expect(screen.getByText(/Soutenez/)).toBeInTheDocument();
    });

    it("affiche 'Makaranta'", () => {
      render(<Donation />);
      expect(screen.getByText("Makaranta")).toBeInTheDocument();
    });

    it("est une section avec l'id 'donation'", () => {
      render(<Donation />);
      const section = document.getElementById("donation");
      expect(section).not.toBeNull();
    });
  });

  describe("Montants prédéfinis", () => {
    it("affiche les trois montants de don (1500, 2500, 5000)", () => {
      render(<Donation />);
      // On utilise des regex flexibles pour gérer le formatage (virgule ou espace)
      expect(screen.getByText(/1.500\s*F/)).toBeInTheDocument();
      expect(screen.getByText(/2.500\s*F/)).toBeInTheDocument();
      expect(screen.getByText(/5.000\s*F/)).toBeInTheDocument();
    });

    it("affiche le label 'Montant du don'", () => {
      render(<Donation />);
      expect(screen.getByText("Montant du don")).toBeInTheDocument();
    });
  });

  describe("Formulaire", () => {
    it("contient un champ pour le montant personnalisé", () => {
      render(<Donation />);
      expect(
        screen.getByPlaceholderText("Montant personnalisé"),
      ).toBeInTheDocument();
    });

    it("contient un champ nom complet", () => {
      render(<Donation />);
      expect(screen.getByPlaceholderText("Nom complet")).toBeInTheDocument();
    });

    it("contient un champ email", () => {
      render(<Donation />);
      expect(screen.getByPlaceholderText("Adresse email")).toBeInTheDocument();
    });

    it("contient le bouton 'Confirmer le don'", () => {
      render(<Donation />);
      expect(
        screen.getByRole("button", { name: /confirmer le don/i }),
      ).toBeInTheDocument();
    });

    it("le bouton de soumission est de type 'submit'", () => {
      render(<Donation />);
      const btn = screen.getByRole("button", { name: /confirmer le don/i });
      expect(btn).toHaveAttribute("type", "submit");
    });
  });

  describe("Saisie utilisateur dans le formulaire", () => {
    it("permet de saisir un nom", async () => {
      const user = userEvent.setup();
      render(<Donation />);

      const nameInput = screen.getByPlaceholderText("Nom complet");
      await user.type(nameInput, "Aminata Traoré");
      expect(nameInput).toHaveValue("Aminata Traoré");
    });

    it("permet de saisir un email", async () => {
      const user = userEvent.setup();
      render(<Donation />);

      const emailInput = screen.getByPlaceholderText("Adresse email");
      await user.type(emailInput, "aminata@test.com");
      expect(emailInput).toHaveValue("aminata@test.com");
    });

    it("permet de saisir un montant personnalisé", async () => {
      const user = userEvent.setup();
      render(<Donation />);

      const amountInput = screen.getByPlaceholderText("Montant personnalisé");
      await user.type(amountInput, "10000");
      expect(amountInput).toHaveValue(10000);
    });
  });

  describe("Indication de sécurité", () => {
    it("affiche la mention de paiement sécurisé", () => {
      render(<Donation />);
      expect(screen.getByText(/Paiement 100% Sécurisé/)).toBeInTheDocument();
    });

    it("mentionne Stripe et Mobile Money", () => {
      render(<Donation />);
      expect(screen.getByText(/Stripe & Mobile Money/)).toBeInTheDocument();
    });
  });

  describe("Devise", () => {
    it("affiche 'FCFA' comme unité monétaire", () => {
      render(<Donation />);
      expect(screen.getByText("FCFA")).toBeInTheDocument();
    });
  });
});
