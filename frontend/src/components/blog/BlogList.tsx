"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { BlogPost } from "@/src/types/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.map((post, index) => (
        <m.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-premium border border-border/50 group-hover:border-primary/30 transition-all duration-500">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-background/80 backdrop-blur-md text-main px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-border/50">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="px-2">
              <div className="flex items-center gap-x-4 text-xs text-muted-foreground font-bold uppercase tracking-widest mb-3">
                <span className="flex items-center gap-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {post.date}
                </span>
                <span className="flex items-center gap-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-2xl font-black text-main leading-tight mb-4 group-hover:text-primary transition-colors italic">
                {post.title}
              </h3>

              <p className="text-muted-foreground font-medium line-clamp-2 mb-6 text-sm italic">
                {post.excerpt}
              </p>

              <div className="flex items-center text-primary font-black uppercase tracking-widest text-xs group-hover:gap-x-2 transition-all">
                Lire la suite
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </div>
          </Link>
        </m.div>
      ))}
    </div>
  );
};
