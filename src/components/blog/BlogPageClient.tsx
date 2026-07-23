"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "@/data";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import CTASection from "@/components/sections/CTASection";

const categories = ["All", "Process", "Business", "Design Systems"];

export default function BlogPageClient() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <>
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-3">
          Insights
        </p>
        <h1 className="text-5xl md:text-7xl text-neutral-900 mb-6">
          Writing that
          <br />
          <em>helps you grow</em>
        </h1>
        <p className="text-neutral-600 text-base max-w-md leading-relaxed mb-12">
          Thoughts on design, business, and building a creative practice that sustains you.
        </p>
      </FadeIn>

      {/* Filter */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-white text-black"
                  : "border border-black/10 text-neutral-500 hover:border-black/20 hover:text-neutral-700"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      {/* Featured post */}
      {active === "All" && filtered[0] && (
        <FadeIn delay={0.1} className="mb-5">
          <Link href={`/blog/${filtered[0].id}`}>
            <motion.article
              whileHover={{ y: -4 }}
              className="group rounded-2xl overflow-hidden bg-[var(--card)] border border-black/5 cursor-pointer grid md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <Image
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full border border-[var(--accent)]/20">
                    Featured
                  </span>
                  <span className="text-xs text-neutral-400">{filtered[0].category}</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-neutral-900 group-hover:text-neutral-900 transition-colors mb-4 leading-snug">
                  {filtered[0].title}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">{filtered[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span>{filtered[0].date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {filtered[0].readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[var(--accent)] group-hover:gap-2 transition-all">
                    Read <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </motion.article>
          </Link>
        </FadeIn>
      )}

      {/* Other posts */}
      <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(active === "All" ? filtered.slice(1) : filtered).map((post) => (
          <StaggerItem key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group rounded-2xl overflow-hidden bg-[var(--card)] border border-black/5 cursor-pointer h-full flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-neutral-600 text-xs rounded-full border border-black/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 text-xs text-neutral-400">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base text-neutral-900 group-hover:text-neutral-900 transition-colors mb-2 leading-snug flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">{post.excerpt}</p>
                </div>
              </motion.article>
            </Link>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
    <CTASection />
    </>
  );
}
