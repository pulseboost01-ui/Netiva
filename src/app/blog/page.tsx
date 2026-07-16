import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/BlogPageClient";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on design, business, and building a creative practice — from the Netiva team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
