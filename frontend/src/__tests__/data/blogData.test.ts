/**
 * =============================================================
 *  TESTS : Données du blog — src/data/blogData.ts
 * =============================================================
 *
 * Ces tests servent de "contrat de données" pour le blog.
 * Quand le backend sera connecté, ces tests garantiront que
 * l'API retourne des données au bon format, avec les bons champs.
 *
 * C'est crucial car les composants BlogList et BlogPostClient
 * dépendent directement de cette structure.
 */

import { describe, it, expect } from "vitest";
import { blogPosts } from "@/src/data/blogData";

describe("Données du Blog (contrat de données)", () => {
  it("contient au moins un article", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it("chaque article a tous les champs obligatoires du type BlogPost", () => {
    const requiredFields = [
      "id",
      "slug",
      "title",
      "category",
      "imageUrl",
      "excerpt",
      "content",
      "date",
      "author",
      "readTime",
    ];

    blogPosts.forEach((post) => {
      requiredFields.forEach((field) => {
        expect(post).toHaveProperty(field);
        expect((post as Record<string, unknown>)[field]).toBeTruthy();
      });
    });
  });

  it("chaque slug est unique (pas de doublon)", () => {
    const slugs = blogPosts.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("chaque id est unique", () => {
    const ids = blogPosts.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("les slugs ne contiennent que des caractères URL-safe", () => {
    blogPosts.forEach((post) => {
      // Un slug valide : lettres minuscules, chiffres, tirets
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("les images commencent par https://", () => {
    blogPosts.forEach((post) => {
      expect(post.imageUrl).toMatch(/^https:\/\//);
    });
  });

  it("le contenu HTML de chaque article n'est pas vide", () => {
    blogPosts.forEach((post) => {
      expect(post.content.trim().length).toBeGreaterThan(10);
    });
  });

  it("le readTime est au bon format (ex: '5 min')", () => {
    blogPosts.forEach((post) => {
      expect(post.readTime).toMatch(/^\d+\s*min$/);
    });
  });
});
