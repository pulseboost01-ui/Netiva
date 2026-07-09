"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Tag } from "lucide-react";
import { blogPosts, siteConfig } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import ContentImage from "@/components/ui/ContentImage";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import { isContentPlaceholder } from "@/lib/content";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { open: openContact } = useContactDrawer();
  const post = blogPosts.find((p) => p.id === params.slug);

  if (!post || post.draft || isContentPlaceholder(post.title)) notFound();

  const related = blogPosts
    .filter((p) => p.id !== post.id && !p.draft && !isContentPlaceholder(p.title))
    .slice(0, 2);

  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <h3 key={i} className="mb-4 mt-8 text-xl text-neutral-900">
            {trimmed.slice(2, -2)}
          </h3>
        );
      }
      return (
        <p key={i} className="mb-4 text-base leading-relaxed text-neutral-600">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="pb-24 pt-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mb-5 flex items-center gap-3 text-xs text-neutral-400">
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
          <h1 className="mb-6 text-4xl leading-[1.1] text-neutral-900 md:text-5xl">{post.title}</h1>
          <p className="mb-10 border-l-2 border-[var(--accent)]/40 pl-5 text-lg leading-relaxed text-neutral-500">
            {post.excerpt}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl">
            <ContentImage
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <article className="prose-custom">{renderContent(post.content)}</article>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-black/8 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]">
                <span className="font-display text-sm font-bold text-black">N</span>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{siteConfig.legalName}</p>
                <p className="text-xs text-neutral-500">{siteConfig.title}</p>
              </div>
            </div>
            <motion.button
              type="button"
              onClick={() => openContact()}
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm text-neutral-600 transition-all hover:border-black/25 hover:text-neutral-900"
            >
              Work with me
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </FadeIn>

        {related.length > 0 ? (
          <div className="mt-20">
            <FadeIn>
              <h3 className="mb-8 text-2xl text-neutral-900">More articles</h3>
            </FadeIn>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <Link href={`/blog/${p.id}`}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="group overflow-hidden rounded-xl border border-black/5 bg-[var(--card)]"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <ContentImage
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 384px"
                        />
                      </div>
                      <div className="p-5">
                        <p className="mb-2 text-xs text-neutral-400">
                          {p.date} · {p.readTime}
                        </p>
                        <p className="font-display text-sm leading-snug text-neutral-800 transition-colors group-hover:text-neutral-900">
                          {p.title}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
