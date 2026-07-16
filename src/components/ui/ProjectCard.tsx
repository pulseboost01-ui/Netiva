import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { projects } from "@/data";

type Project = (typeof projects)[number];

export function ProjectCardContent({
  project,
  subtitle,
  aspectClassName = "aspect-[4/3] md:aspect-[16/10]",
}: {
  project: Project;
  subtitle: string;
  aspectClassName?: string;
}) {
  return (
    <>
      <div className={`relative overflow-hidden rounded-[28px] ${aspectClassName}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute right-3 top-3 inline-flex h-10 w-10 -translate-y-1 scale-90 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="pt-4">
        <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
        <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
      </div>
    </>
  );
}

export function ProjectCardLink({
  project,
  subtitle,
  aspectClassName,
  className = "",
}: {
  project: Project;
  subtitle: string;
  aspectClassName?: string;
  className?: string;
}) {
  return (
    <Link href={`/work/${project.id}`} className={`group block touch-manipulation ${className}`}>
      <article>
        <ProjectCardContent project={project} subtitle={subtitle} aspectClassName={aspectClassName} />
      </article>
    </Link>
  );
}
