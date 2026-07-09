"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import ContentImage from "@/components/ui/ContentImage";
import { hasPublishedBlogPosts } from "@/lib/content";

export default function BlogSection() {
  const published = hasPublishedBlogPosts(blogPosts);
  const featured = blogPosts.filter((p) => p.featured && !p.draft).slice(0, 2);

  if (!published) {
    return (
      <section className="border-t border-border py-14 md:py-20">
        <div className="w-full px-6 md:px-10">
          <FadeIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">Writing</p>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">Technical notes</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Posts from real build work are in progress—mobile-money reconciliation, multi-tenant billing, and
              production engineering topics.
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <FadeIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">Writing</p>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">Notes from production builds.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="group hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
              >
                View all
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </Link>
          </FadeIn>
        </div>

        <StaggerChildren className="grid gap-5 md:grid-cols-2">
          {featured.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-[var(--card)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ContentImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs text-muted-dim">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display mb-2 text-lg leading-snug text-foreground">{post.title}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
