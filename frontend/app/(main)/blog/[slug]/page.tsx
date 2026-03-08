import React from "react";
import { BlogPostClient } from "@/src/components/blog/BlogPostClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_URL}/api/blog/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { title: "Article non trouvé" };
    const { Post } = await res.json();

    return {
      title: `${Post.title} | Fajr`,
      description: Post.description,
      openGraph: {
        images: [Post.imageUrl],
      },
    };
  } catch (e) {
    return { title: "Fajr ONG" };
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/api/blog/allPosts?limit=100`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) return [{ slug: "placeholder-article" }];

    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      return [{ slug: "placeholder-article" }];
    }

    return data.data.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Erreur lors de generateStaticParams:", error);
    return [{ slug: "placeholder-article" }];
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post = null;
  let relatedPosts = [];

  try {
    const res = await fetch(`${API_URL}/api/blog/slug/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      post = data.Post;
    }

    // Fetch related (simplifié: on reprend les derniers posts)
    const allRes = await fetch(`${API_URL}/api/blog/allPosts?limit=3`, {
      next: { revalidate: 86400 },
    });
    if (allRes.ok) {
      const allData = await allRes.json();
      relatedPosts = allData.data.filter((p: any) => p.slug !== slug);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) {
    notFound();
  }

  // Adapter le format backend au format attendu par le client si nécessaire
  const adaptedPost = {
    ...post,
    image: post.imageUrl,
    excerpt: post.description.substring(0, 160) + "...",
    content: post.content,
    date: new Date(post.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    author: "Équipe Fajr",
    readTime: "5 min",
  };

  const adaptedRelated = relatedPosts.map((p: any) => ({
    ...p,
    image: p.imageUrl,
    date: new Date(p.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return <BlogPostClient post={adaptedPost} relatedPosts={adaptedRelated} />;
}
