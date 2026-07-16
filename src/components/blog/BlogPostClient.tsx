"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Tag } from "lucide-react";
import { blogPosts } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

export default function BlogPostClient({ slug }: { slug: string }) {
  const { open: openContact } = useContactDrawer();
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  // Simple markdown-like content renderer
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <h3 key={i} className="text-xl text-neutral-900 mt-8 mb-4">
            {trimmed.slice(2, -2)}
          </h3>
        );
      }
      return (
        <p key={i} className="text-neutral-600 text-base leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="flex items-center gap-3 mb-5 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {post.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {post.readTime}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Tag size={11} /> {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl text-neutral-900 mb-6 leading-[1.1]">
            {post.title}
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed mb-10 border-l-2 border-[var(--accent)]/40 pl-5">
            {post.excerpt}
          </p>
        </FadeIn>

        {/* Hero image */}
        <FadeIn delay={0.1}>
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </FadeIn>

        {/* Article content */}
        <FadeIn delay={0.15}>
          <article className="prose-custom">{renderContent(post.content)}</article>
        </FadeIn>

        {/* Share & Author */}
        <FadeIn delay={0.2}>
          <div className="mt-14 pt-8 border-t border-black/8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <span className="text-black font-bold text-sm font-display">
                  J
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Netiva Editorial</p>
                <p className="text-xs text-neutral-500">Designer & Creative Developer</p>
              </div>
            </div>
            <motion.button
              type="button"
              onClick={() => openContact()}
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-2 px-5 py-2.5 border border-black/10 text-neutral-600 text-sm rounded-full hover:border-black/25 hover:text-neutral-900 transition-all"
            >
              Work with me
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </FadeIn>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-20">
            <FadeIn>
              <h3 className="text-2xl text-neutral-900 mb-8">
                More articles
              </h3>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <Link href={`/blog/${p.id}`}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="group rounded-xl overflow-hidden bg-[var(--card)] border border-black/5"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 384px"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-neutral-400 mb-2">{p.date} · {p.readTime}</p>
                        <p className="text-sm text-neutral-800 group-hover:text-neutral-900 transition-colors leading-snug font-display">
                          {p.title}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
