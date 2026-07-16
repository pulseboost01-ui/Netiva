import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data";
import BlogPostClient from "@/components/blog/BlogPostClient";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.id === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!blogPosts.find((p) => p.id === params.slug)) notFound();
  return <BlogPostClient slug={params.slug} />;
}
