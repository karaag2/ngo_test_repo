/**
 * =============================================================
 *  TESTS : Composant Input — src/components/ui/input.tsx
 * =============================================================
 *
 * Pourquoi ?
 * Le formulaire de don et de contact utilisent ce composant.
 * Quand le backend sera connecté, les données saisies seront
 * envoyées à l'API. Il faut s'assurer que le composant transmet
 * correctement les valeurs et les attributs.
 */

import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/src/__tests__/test-utils";
import { Input } from "@/src/components/ui/input";

describe("Input", () => {
  describe("Rendu de base", () => {
    it("rend un champ de saisie", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("applique le data-slot='input'", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveAttribute("data-slot", "input");
    });

    it("affiche le placeholder", () => {
      render(<Input placeholder="Entrez votre nom" />);
      expect(
        screen.getByPlaceholderText("Entrez votre nom"),
      ).toBeInTheDocument();
    });
  });

  describe("Types de saisie", () => {
    it("accepte le type email", () => {
      render(<Input type="email" data-testid="email-input" />);
      expect(screen.getByTestId("email-input")).toHaveAttribute(
        "type",
        "email",
      );
    });

    it("accepte le type number", () => {
      render(<Input type="number" data-testid="number-input" />);
      expect(screen.getByTestId("number-input")).toHaveAttribute(
        "type",
        "number",
      );
    });
  });

  describe("Saisie utilisateur", () => {
    it("accepte la saisie de texte", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Nom" />);

      const input = screen.getByPlaceholderText("Nom");
      await user.type(input, "Moussa Diallo");
      expect(input).toHaveValue("Moussa Diallo");
    });

    it("déclenche onChange à chaque caractère", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole("textbox"), "abc");
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("État désactivé", () => {
    it("est désactivable", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
  });

  describe("Classes personnalisées", () => {
    it("accepte des classes CSS supplémentaires", () => {
      render(<Input className="rounded-full" />);
      expect(screen.getByRole("textbox")).toHaveClass("rounded-full");
    });
  });
});
