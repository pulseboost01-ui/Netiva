import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data";
import ProjectCaseStudy from "@/components/work/ProjectCaseStudy";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
