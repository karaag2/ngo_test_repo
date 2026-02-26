/**
 * =============================================================
 *  TESTS : Composant Card — src/components/ui/card.tsx
 * =============================================================
 *
 * Pourquoi ?
 * Les Cards sont utilisées dans les Témoignages et dans le Blog.
 * On vérifie que chaque sous-composant (Header, Content, Footer)
 * rend correctement ses enfants et ses data-slots pour le CSS.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";

describe("Card", () => {
  it("rend le Card wrapper avec data-slot='card'", () => {
    render(<Card data-testid="card">Contenu</Card>);
    expect(screen.getByTestId("card")).toHaveAttribute("data-slot", "card");
  });

  it("rend le contenu enfant", () => {
    render(<Card>Mon contenu</Card>);
    expect(screen.getByText("Mon contenu")).toBeInTheDocument();
  });

  it("accepte des classes CSS supplémentaires", () => {
    render(
      <Card className="ma-card" data-testid="card">
        Test
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("ma-card");
  });
});

describe("CardHeader", () => {
  it("rend avec data-slot='card-header'", () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId("header")).toHaveAttribute(
      "data-slot",
      "card-header",
    );
  });
});

describe("CardTitle", () => {
  it("rend le titre", () => {
    render(<CardTitle>Titre test</CardTitle>);
    expect(screen.getByText("Titre test")).toBeInTheDocument();
  });

  it("a le data-slot='card-title'", () => {
    render(<CardTitle data-testid="title">Titre</CardTitle>);
    expect(screen.getByTestId("title")).toHaveAttribute(
      "data-slot",
      "card-title",
    );
  });
});

describe("CardDescription", () => {
  it("rend la description", () => {
    render(<CardDescription>Description test</CardDescription>);
    expect(screen.getByText("Description test")).toBeInTheDocument();
  });
});

describe("CardContent", () => {
  it("rend le contenu", () => {
    render(<CardContent>Paragraphe de test</CardContent>);
    expect(screen.getByText("Paragraphe de test")).toBeInTheDocument();
  });

  it("a le data-slot='card-content'", () => {
    render(<CardContent data-testid="content">Contenu</CardContent>);
    expect(screen.getByTestId("content")).toHaveAttribute(
      "data-slot",
      "card-content",
    );
  });
});

describe("CardFooter", () => {
  it("rend le pied de carte", () => {
    render(<CardFooter>Footer test</CardFooter>);
    expect(screen.getByText("Footer test")).toBeInTheDocument();
  });
});

describe("Card composée complète", () => {
  it("rend une carte complète avec tous les sous-composants", () => {
    render(
      <Card data-testid="full-card">
        <CardHeader>
          <CardTitle>Témoignage</CardTitle>
          <CardDescription>Un récit inspirant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Le contenu du témoignage ici.</p>
        </CardContent>
        <CardFooter>
          <button>Partager</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText("Témoignage")).toBeInTheDocument();
    expect(screen.getByText("Un récit inspirant")).toBeInTheDocument();
    expect(
      screen.getByText("Le contenu du témoignage ici."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Partager" }),
    ).toBeInTheDocument();
  });
});
