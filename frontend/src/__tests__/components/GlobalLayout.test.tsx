/**
 * =============================================================
 *  TESTS : GlobalLayout — src/components/GlobalLayout.tsx
 * =============================================================
 *
 * Le layout global enveloppe tout le contenu. Il doit toujours
 * rendre ses enfants et appliquer la structure max-width.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import PageLayout from "@/src/components/GlobalLayout";

describe("PageLayout (GlobalLayout)", () => {
  it("rend ses enfants", () => {
    render(
      <PageLayout>
        <p>Contenu enfant</p>
      </PageLayout>,
    );
    expect(screen.getByText("Contenu enfant")).toBeInTheDocument();
  });

  it("rend plusieurs enfants", () => {
    render(
      <PageLayout>
        <p>Premier</p>
        <p>Deuxième</p>
      </PageLayout>,
    );
    expect(screen.getByText("Premier")).toBeInTheDocument();
    expect(screen.getByText("Deuxième")).toBeInTheDocument();
  });
});
