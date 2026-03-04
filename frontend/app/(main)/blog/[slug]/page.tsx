import React from "react";
import { blogPosts } from "@/src/data/blogData";
import { BlogPostClient } from "@/src/components/blog/BlogPostClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Article non trouvé" };

  return {
    title: `${post.title} | Makaranta`,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current)
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
