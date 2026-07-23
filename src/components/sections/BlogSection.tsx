"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

export default function BlogSection() {
  const featured = blogPosts.filter((p) => p.featured).slice(0, 2);

  return (
    <section className="border-t border-black/6 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-3">
              From the studio,
            </p>
            <h2 className="font-display text-4xl text-neutral-900 md:text-5xl">
              design insights.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="group hidden md:flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                View All
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </Link>
          </FadeIn>
        </div>

        <StaggerChildren className="grid md:grid-cols-2 gap-5">
          {featured.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl overflow-hidden bg-[var(--card)] border border-black/5 cursor-pointer"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
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
                    <div className="flex items-center gap-3 mb-3 text-xs text-neutral-400">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display mb-2 text-lg leading-snug text-neutral-900 transition-colors group-hover:text-neutral-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-500 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1 mt-4 text-xs text-[var(--accent)] group-hover:gap-2 transition-all">
                      Read article
                      <ArrowUpRight size={12} />
                    </div>
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
