/**
 * =============================================================
 *  TESTS : Section Contact — src/components/sections/Contact.tsx
 * =============================================================
 *
 * Le formulaire de contact est le deuxième formulaire critique.
 * Quand le backend sera connecté, il enverra les messages à l'API.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/src/__tests__/test-utils";
import Contact from "@/src/components/sections/Contact";

describe("Contact", () => {
  describe("Titres", () => {
    it("affiche 'Contactez-nous'", () => {
      render(<Contact />);
      expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    });

    it("affiche 'Ensemble'", () => {
      render(<Contact />);
      expect(screen.getByText("Ensemble")).toBeInTheDocument();
    });
  });

  describe("Informations de contact", () => {
    it("affiche l'adresse du siège", () => {
      render(<Contact />);
      expect(screen.getByText("Plateau, Niamey, Niger")).toBeInTheDocument();
    });

    it("affiche le numéro de téléphone", () => {
      render(<Contact />);
      expect(screen.getByText("+227 99 99 99 99")).toBeInTheDocument();
    });

    it("affiche l'email officiel", () => {
      render(<Contact />);
      expect(screen.getByText("contact@makaranta.org")).toBeInTheDocument();
    });
  });

  describe("Formulaire de contact", () => {
    it("contient le champ prénom avec label", () => {
      render(<Contact />);
      expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    });

    it("contient le champ nom avec label", () => {
      render(<Contact />);
      expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    });

    it("contient le champ email avec label", () => {
      render(<Contact />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("contient le champ message avec label", () => {
      render(<Contact />);
      expect(screen.getByLabelText("Message")).toBeInTheDocument();
    });

    it("contient le bouton d'envoi", () => {
      render(<Contact />);
      expect(
        screen.getByRole("button", { name: /envoyé/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Saisie dans le formulaire", () => {
    it("permet de remplir le prénom", async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const prenom = screen.getByLabelText("Prénom");
      await user.type(prenom, "Fatou");
      expect(prenom).toHaveValue("Fatou");
    });

    it("permet de remplir le nom", async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nom = screen.getByLabelText("Nom");
      await user.type(nom, "Diallo");
      expect(nom).toHaveValue("Diallo");
    });

    it("permet de saisir un message", async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const message = screen.getByLabelText("Message");
      await user.type(message, "Comment puis-je aider ?");
      expect(message).toHaveValue("Comment puis-je aider ?");
    });
  });

  describe("Sémantique", () => {
    it("est une section avec l'id 'contact'", () => {
      render(<Contact />);
      const section = document.getElementById("contact");
      expect(section).not.toBeNull();
    });
  });

  describe("Réactivité promise", () => {
    it("mentionne le délai de réponse de 24H", () => {
      render(<Contact />);
      expect(screen.getByText("24H")).toBeInTheDocument();
    });
  });
});
