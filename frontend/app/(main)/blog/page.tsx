import React from "react";
import { blogPosts } from "@/src/data/blogData";
import { BlogList } from "@/src/components/blog/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal de Bord | Makaranta",
  description:
    "Découvrez nos dernières interventions, les défis relevés et les histoires de terrain de notre mission au Sahel.",
};

const BlogPage = () => {
  // En production, nous ferions un fetch ici
  const posts = blogPosts;

  return (
    <div className="min-height-screen bg-background py-6 md:pt-20">
      {/* Hero Section (Static) */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">
            Notre Journal de Bord
          </h2>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-main mb-6 leading-tight">
            Histoires de <span className="text-primary">Terrain</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium italic">
            Découvrez nos dernières interventions, les défis relevés et les
            sourires partagés à chaque étape de notre mission.
          </p>
        </div>
      </section>

      {/* Blog Grid (Client-side for animations) */}
      <section className="container mx-auto px-6">
        <BlogList posts={posts} />
      </section>
    </div>
  );
};

export default BlogPage;
