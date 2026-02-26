/**
 * =============================================================
 *  TESTS : Composant Button — src/components/ui/button.tsx
 * =============================================================
 *
 * Pourquoi tester un composant UI de base ?
 * -----------------------------------------
 * Le Button est utilisé partout (Header, Donation, Contact...).
 * Si ses variantes ou son accessibilité cassent, c'est une
 * régression en cascade. Ces tests servent de filet de sécurité.
 */

import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/src/__tests__/test-utils";
import { Button } from "@/src/components/ui/button";

describe("Button", () => {
  describe("Rendu de base", () => {
    it("rend le texte du bouton", () => {
      render(<Button>Faire un don</Button>);
      expect(
        screen.getByRole("button", { name: "Faire un don" }),
      ).toBeInTheDocument();
    });

    it("applique le data-slot='button'", () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
    });
  });

  describe("Variantes", () => {
    it("utilise la variante 'default' par défaut", () => {
      render(<Button>Default</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "default",
      );
    });

    it("accepte la variante 'destructive'", () => {
      render(<Button variant="destructive">Supprimer</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "destructive",
      );
    });

    it("accepte la variante 'outline'", () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "outline",
      );
    });

    it("accepte la variante 'ghost'", () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "ghost",
      );
    });

    it("accepte la variante 'link'", () => {
      render(<Button variant="link">Lien</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "link",
      );
    });
  });

  describe("Tailles", () => {
    it("utilise la taille 'default' par défaut", () => {
      render(<Button>Taille par défaut</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-size",
        "default",
      );
    });

    it("accepte la taille 'sm'", () => {
      render(<Button size="sm">Petit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-size", "sm");
    });

    it("accepte la taille 'lg'", () => {
      render(<Button size="lg">Grand</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg");
    });

    it("accepte la taille 'icon'", () => {
      render(<Button size="icon">🔍</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-size", "icon");
    });
  });

  describe("Interactions", () => {
    it("appelle onClick quand on clique", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Cliquez</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("ne déclenche pas onClick quand le bouton est désactivé", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button onClick={handleClick} disabled>
          Désactivé
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibilité", () => {
    it("est focusable au clavier", async () => {
      const user = userEvent.setup();
      render(<Button>Focus</Button>);

      await user.tab();
      expect(screen.getByRole("button")).toHaveFocus();
    });

    it("transmet les props aria- correctement", () => {
      render(<Button aria-label="Ouvrir le menu">☰</Button>);
      expect(
        screen.getByRole("button", { name: "Ouvrir le menu" }),
      ).toBeInTheDocument();
    });
  });

  describe("Classes personnalisées", () => {
    it("accepte des classes CSS supplémentaires", () => {
      render(<Button className="ma-classe-custom">Custom</Button>);
      expect(screen.getByRole("button")).toHaveClass("ma-classe-custom");
    });
  });
});
