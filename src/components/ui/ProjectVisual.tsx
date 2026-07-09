"use client";

import Image, { type ImageProps } from "next/image";
import { isContentPlaceholder } from "@/lib/content";

type ProjectLike = {
  title: string;
  category: string;
  color?: string;
  accent?: string;
  image: string;
};

type ProjectVisualProps = Omit<ImageProps, "src" | "alt"> & {
  project: ProjectLike;
  alt?: string;
  /** When false, placeholder is a flat brand panel (for device frames that already show the title). */
  showLabel?: boolean;
};

/** Real screenshot or a clean brand panel — never shows "coming soon" or similar copy. */
export default function ProjectVisual({
  project,
  alt,
  showLabel = true,
  className = "",
  fill,
  ...rest
}: ProjectVisualProps) {
  const label = alt ?? `${project.title} project`;

  if (isContentPlaceholder(project.image)) {
    const bg = project.color ?? "#f5f2eb";
    const accent = project.accent ?? "#b8943f";

    if (!showLabel) {
      return (
        <div
          className={`relative overflow-hidden ${fill ? "absolute inset-0" : ""} ${className}`}
          style={{
            backgroundColor: bg,
            backgroundImage: `linear-gradient(135deg, ${accent}1f 0%, transparent 65%)`,
          }}
          role="img"
          aria-label={label}
        >
          <div className="absolute inset-0 border border-black/5" />
          <div className="absolute inset-x-6 top-6 h-16 rounded-full border border-black/5 bg-white/50 blur-2xl" />
          <div className="absolute inset-y-0 left-5 w-px bg-accent/20" />
          <div className="absolute inset-y-0 right-5 w-px bg-accent/20" />
          <div className="absolute bottom-5 left-5 h-16 w-16 rounded-full border border-accent/20" />
        </div>
      );
    }

    return (
      <div
        className={`relative flex flex-col justify-end overflow-hidden p-6 md:p-8 ${fill ? "absolute inset-0" : ""} ${className}`}
        style={{ backgroundColor: bg }}
        role="img"
        aria-label={label}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background: `linear-gradient(145deg, ${accent}24 0%, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 border border-black/5" />
        <div className="absolute inset-x-6 top-6 h-16 rounded-full border border-black/5 bg-white/50 blur-2xl" />
        <div className="relative flex flex-col gap-2">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: accent }}>
            {project.category}
          </p>
          <p className="max-w-[12rem] font-display text-2xl leading-tight text-foreground md:text-3xl">{project.title}</p>
        </div>
      </div>
    );
  }

  return <Image src={project.image} alt={label} fill={fill} className={className} {...rest} />;
}
