import type { MetadataRoute } from "next";
import { blogPosts, projects, siteConfig } from "@/data";
import { isContentPlaceholder } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/quote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => !post.draft && !isContentPlaceholder(post.title))
    .map((post) => ({
      url: `${base}/blog/${post.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
