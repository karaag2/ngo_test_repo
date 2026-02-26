/**
 * =============================================================
 *  TESTS : BlogList — src/components/blog/BlogList.tsx
 * =============================================================
 *
 * BlogList affiche la grille d'articles sur /blog.
 * Quand le backend sera connecté, les articles viendront de l'API.
 * Ces tests garantissent que le composant affiche correctement
 * les données *quelle que soit* leur source.
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import { BlogList } from "@/src/components/blog/BlogList";
import { getMockBlogPosts, getMockBlogPost } from "@/src/__tests__/factories";

describe("BlogList", () => {
  describe("Affichage de base", () => {
    it("affiche tous les articles fournis", () => {
      const posts = getMockBlogPosts(3);
      render(<BlogList posts={posts} />);

      posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    it("affiche les catégories de chaque article", () => {
      const posts = getMockBlogPosts(3);
      render(<BlogList posts={posts} />);

      posts.forEach((post) => {
        expect(screen.getByText(post.category)).toBeInTheDocument();
      });
    });

    it("affiche les dates de chaque article", () => {
      const posts = getMockBlogPosts(3);
      render(<BlogList posts={posts} />);

      posts.forEach((post) => {
        expect(screen.getAllByText(post.date).length).toBeGreaterThanOrEqual(1);
      });
    });

    it("affiche les temps de lecture", () => {
      const posts = getMockBlogPosts(3);
      render(<BlogList posts={posts} />);

      posts.forEach((post) => {
        expect(
          screen.getAllByText(post.readTime).length,
        ).toBeGreaterThanOrEqual(1);
      });
    });

    it("affiche les résumés tronqués (excerpts)", () => {
      const posts = getMockBlogPosts(1);
      render(<BlogList posts={posts} />);

      expect(screen.getByText(posts[0].excerpt)).toBeInTheDocument();
    });
  });

  describe("Liens", () => {
    it("chaque article a un lien vers sa page", () => {
      const posts = [getMockBlogPost({ slug: "mon-article" })];
      render(<BlogList posts={posts} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/blog/mon-article");
    });

    it("affiche le texte 'Lire la suite' pour chaque article", () => {
      const posts = getMockBlogPosts(2);
      render(<BlogList posts={posts} />);

      const readMoreLinks = screen.getAllByText("Lire la suite");
      expect(readMoreLinks).toHaveLength(2);
    });
  });

  describe("Cas limites", () => {
    it("ne crashe pas avec une liste vide", () => {
      render(<BlogList posts={[]} />);
      // Pas de crash = le test passe
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("gère correctement un seul article", () => {
      const posts = getMockBlogPosts(1);
      render(<BlogList posts={posts} />);

      expect(screen.getByText(posts[0].title)).toBeInTheDocument();
    });
  });

  describe("Images", () => {
    it("affiche les images de chaque article", () => {
      const posts = getMockBlogPosts(2);
      render(<BlogList posts={posts} />);

      posts.forEach((post) => {
        expect(screen.getByAltText(post.title)).toBeInTheDocument();
      });
    });
  });
});
