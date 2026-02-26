/**
 * =============================================================
 *  TESTS : BlogPostClient — src/components/blog/BlogPostClient.tsx
 * =============================================================
 *
 * BlogPostClient affiche un article de blog complet avec :
 * - Le titre, la catégorie, l'auteur, la date
 * - Le contenu HTML de l'article
 * - Les articles liés (sidebar)
 * - Les boutons Partager / Sauvegarder
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import { BlogPostClient } from "@/src/components/blog/BlogPostClient";
import { getMockBlogPost, getMockBlogPosts } from "@/src/__tests__/factories";

describe("BlogPostClient", () => {
  const defaultPost = getMockBlogPost({
    title: "Distribution de kits scolaires",
    category: "Éducation",
    author: "Fatou Diallo",
    date: "24 Fév 2026",
    readTime: "5 min",
    content: "<p>Le contenu de l'article.</p>",
  });
  const relatedPosts = getMockBlogPosts(2);

  describe("En-tête de l'article", () => {
    it("affiche le titre de l'article", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(
        screen.getByText("Distribution de kits scolaires"),
      ).toBeInTheDocument();
    });

    it("affiche la catégorie", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(screen.getByText("Éducation")).toBeInTheDocument();
    });

    it("affiche l'auteur", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(screen.getByText("Fatou Diallo")).toBeInTheDocument();
    });

    it("affiche la date", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(screen.getByText("24 Fév 2026")).toBeInTheDocument();
    });

    it("affiche le temps de lecture", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(screen.getByText(/5 min/)).toBeInTheDocument();
    });
  });

  describe("Image mise en avant", () => {
    it("affiche l'image de l'article", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(
        screen.getByAltText("Distribution de kits scolaires"),
      ).toBeInTheDocument();
    });
  });

  describe("Contenu de l'article", () => {
    it("rend le contenu HTML de l'article", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(screen.getByText("Le contenu de l'article.")).toBeInTheDocument();
    });
  });

  describe("Actions", () => {
    it("affiche le bouton 'Partager'", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(
        screen.getByRole("button", { name: /partager/i }),
      ).toBeInTheDocument();
    });

    it("affiche le bouton 'Sauvegarder'", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(
        screen.getByRole("button", { name: /sauvegarder/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("affiche le lien 'Retour au journal'", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(screen.getByText("Retour au journal")).toBeInTheDocument();
    });

    it("le lien retour pointe vers /blog", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      const backLink = screen.getByText("Retour au journal").closest("a");
      expect(backLink).toHaveAttribute("href", "/blog");
    });
  });

  describe("Articles liés (sidebar)", () => {
    it("affiche le titre 'Articles Immortels'", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      expect(screen.getByText("Articles Immortels")).toBeInTheDocument();
    });

    it("affiche les articles liés", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      relatedPosts.forEach((rp) => {
        expect(screen.getByText(rp.title)).toBeInTheDocument();
      });
    });

    it("ne crashe pas avec une liste d'articles liés vide", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={[]} />);
      expect(screen.getByText("Articles Immortels")).toBeInTheDocument();
    });
  });

  describe("Sémantique", () => {
    it("utilise une balise <article>", () => {
      render(<BlogPostClient post={defaultPost} relatedPosts={relatedPosts} />);
      const article = document.querySelector("article");
      expect(article).not.toBeNull();
    });
  });
});
