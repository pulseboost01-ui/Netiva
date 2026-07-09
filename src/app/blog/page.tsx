"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { hasPublishedBlogPosts } from "@/lib/content";

export default function BlogPage() {
  const published = hasPublishedBlogPosts(blogPosts);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <FadeIn>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">Writing</p>
        <h1 className="mb-6 text-5xl text-neutral-900 md:text-7xl">
          Notes from
          <br />
          <em>production builds</em>
        </h1>
        {published ? (
          <p className="mb-12 max-w-md text-base leading-relaxed text-neutral-600">
            Technical posts drawn from real implementation work—not generic design content.
          </p>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/10 bg-[var(--card)] p-8 md:p-10">
            <p className="text-sm leading-relaxed text-neutral-600">
              Posts are in progress on topics I can write from experience: mobile-money reconciliation,
              multi-tenant billing, and payment workflow design. Check back soon.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:underline"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
          </div>
        )}
      </FadeIn>
    </div>
  );
}
