import { BlogList } from "@/src/components/blog/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal de Bord | Fajr",
  description:
    "Découvrez nos dernières interventions, les défis relevés et les histoires de terrain de notre mission au Sahel.",
};

const BlogPage = async () => {
  let posts = [];
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";
    const res = await fetch(`${API_URL}/api/blog/allPosts`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      posts = data.data || [];
    }
  } catch (error) {
    console.error("Erreur de récupération des posts:", error);
  }

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
