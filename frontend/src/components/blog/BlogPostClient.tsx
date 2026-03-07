"use client";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { BlogPost } from "@/src/types/blog";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export const BlogPostClient = ({ post, relatedPosts }: BlogPostClientProps) => {
  return (
    <article className="min-height-screen bg-background py-6 md:pt-12">
      {/* Back Button & Header Info */}
      <div className="container mx-auto px-6 mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-x-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-x-3 transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au journal
        </Link>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] bg-primary/10 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-6 inline-block border border-primary/20">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-main mb-8 leading-[0.9]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-header font-bold border-y border-border/50 py-6">
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <User className="w-5 h-5 text-primary" />
              </div>
              <span className="italic">{post.author}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Calendar className="w-4 h-4 text-primary" />
              {post.date}
            </div>
            <div className="flex items-center gap-x-2">
              <Clock className="w-4 h-4 text-primary" />
              {post.readTime} de lecture
            </div>
          </div>
        </m.div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-6 mb-16">
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-21/9 rounded-4xl overflow-hidden shadow-2xl border border-border/50"
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </m.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div
              className="prose prose-invert prose-primary max-w-none text-muted-foreground font-medium text-lg leading-relaxed italic
              prose-h3:text-main prose-h3:text-2xl prose-h3:font-black prose-h3:mt-12 prose-h3:mb-6
              prose-p:mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Actions */}
            <div className="mt-16 flex items-center gap-4 py-8 border-t border-border/50">
              <button className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary border border-border px-6 py-3 rounded-2xl transition-colors font-bold text-sm outline-none">
                <Share2 className="w-4 h-4" />
                Partager
              </button>
              <button className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary border border-border px-6 py-3 rounded-2xl transition-colors font-bold text-sm outline-none">
                <Bookmark className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>
          </div>

          {/* Sidebar / Related */}
          <aside className="lg:w-1/3">
            <div className="sticky top-32 p-8 rounded-4xl bg-secondary/30 backdrop-blur-xl border border-border/50">
              <h4 className="text-main font-black uppercase tracking-[0.2em] text-sm mb-8 border-b border-border/50 pb-4">
                Articles Immortels
              </h4>
              <div className="flex flex-col gap-10">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-border/30 group-hover:border-primary/50 transition-all">
                      <Image
                        src={related.imageUrl}
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h5 className="text-main font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 italic">
                      {related.title}
                    </h5>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-2 block">
                      {related.date}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};
