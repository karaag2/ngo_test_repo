/**
 * =============================================================
 *  FACTORIES DE DONNÉES DE TEST
 * =============================================================
 *
 * Les "factories" sont des fonctions qui génèrent des données
 * de test cohérentes et réutilisables. C'est une bonne pratique
 * pour éviter de dupliquer les données dans chaque fichier de test.
 *
 * Utilisation :
 *   const post = getMockBlogPost({ title: "Mon titre custom" });
 */

import { BlogPost } from "@/src/types/blog";
import { Location } from "@/src/data/NigerPoints";

// ─── Factory : BlogPost ───────────────────────────────────────
export const getMockBlogPost = (overrides?: Partial<BlogPost>): BlogPost => ({
  id: "test-1",
  slug: "test-article",
  title: "Article de test",
  category: "Éducation",
  image: "https://example.com/test.jpg",
  excerpt: "Ceci est un résumé de test pour vérifier le composant.",
  content: "<p>Contenu HTML de test.</p>",
  date: "01 Jan 2026",
  author: "Test Auteur",
  readTime: "5 min",
  ...overrides,
});

// ─── Factory : Liste de BlogPosts ─────────────────────────────
export const getMockBlogPosts = (count: number = 3): BlogPost[] =>
  Array.from({ length: count }, (_, i) =>
    getMockBlogPost({
      id: `post-${i + 1}`,
      slug: `article-${i + 1}`,
      title: `Article de test ${i + 1}`,
      category: ["Éducation", "Infrastructure", "Santé"][i % 3],
      author: `Auteur ${i + 1}`,
    }),
  );

// ─── Factory : Location (Point sur la carte) ─────────────────
export const getMockLocation = (overrides?: Partial<Location>): Location => ({
  id: 1,
  name: "École Test - Niamey",
  short: "ET Niamey",
  lng: 2.1148,
  lat: 13.5137,
  ville: "Niamey",
  region: "Niamey",
  type: "École primaire",
  ouverture: 2020,
  eleves: 250,
  description: "Une école de test pour les tests unitaires.",
  services: ["Cantine", "Bibliothèque"],
  ...overrides,
});

// ─── Factory : Section de navigation ──────────────────────────
export const getMockNavSection = (
  overrides?: Partial<{ href: string; label: string }>,
) => ({
  href: "/#test",
  label: "Test",
  ...overrides,
});
