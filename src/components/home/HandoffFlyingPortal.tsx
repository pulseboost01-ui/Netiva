"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CardDef } from "@/components/home/heroCardGeometry";
import {
  HERO_CARD_LAYOUT,
  poseAt,
  rectImageInStage,
  lerpRect,
  smoothstep,
  lerp,
} from "@/components/home/heroCardGeometry";
import { projects } from "@/data";

const MORPH_END = 0.4;

type ProjectItem = (typeof projects)[number];

function computeSlideRect(
  progress: number,
  stageEl: HTMLElement | null,
  projectId: string,
  layout: CardDef,
  imageAspect: number,
) {
  if (!stageEl || typeof progress !== "number")
    return { left: -10000, top: 0, width: 0, height: 0 };

  const pr = Math.min(1, Math.max(0, progress));

  const stage = stageEl.getBoundingClientRect();
  const morphT = Math.min(1, pr / MORPH_END);
  const pose = poseAt(morphT, layout);
  const rStage = rectImageInStage(stage, pose, imageAspect);

  if (pr <= MORPH_END + 1e-8) return rStage;

  const anchor = document.querySelector(
    `[data-handoff-slot="${projectId}"]`,
  ) as HTMLElement | null;
  if (!anchor) return rStage;

  const g = anchor.getBoundingClientRect();
  const slideRaw = Math.min(1, (pr - MORPH_END) / (1 - MORPH_END));
  return lerpRect(rStage, { left: g.left, top: g.top, width: g.width, height: g.height }, slideRaw);
}

function useMdUp() {
  const [md, setMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setMd(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return md;
}

function HandoffCard({
  project,
  layoutDef,
  progress,
  stageRef,
  imageAspectRatio,
  priority,
}: {
  project: ProjectItem;
  layoutDef: CardDef;
  progress: MotionValue<number>;
  stageRef: React.RefObject<HTMLDivElement | null>;
  imageAspectRatio: number;
  priority: boolean;
}) {
  const left = useTransform(progress, (pr) =>
    computeSlideRect(pr, stageRef.current, project.id, layoutDef, imageAspectRatio).left,
  );
  const top = useTransform(progress, (pr) =>
    computeSlideRect(pr, stageRef.current, project.id, layoutDef, imageAspectRatio).top,
  );
  const width = useTransform(progress, (pr) =>
    computeSlideRect(pr, stageRef.current, project.id, layoutDef, imageAspectRatio).width,
  );
  const height = useTransform(progress, (pr) =>
    computeSlideRect(pr, stageRef.current, project.id, layoutDef, imageAspectRatio).height,
  );

  const rotate = useTransform(progress, (v) => {
    const pr = Math.min(1, Math.max(0, v));
    if (pr <= MORPH_END + 1e-8) {
      const morphT = Math.min(1, pr / MORPH_END);
      return poseAt(morphT, layoutDef).rotate;
    }
    const endRot = poseAt(1, layoutDef).rotate;
    const slideT = Math.min(1, (pr - MORPH_END) / (1 - MORPH_END));
    return lerp(endRot, 0, smoothstep(slideT));
  });

  const scale = useTransform(progress, (v) => {
    const pr = Math.min(1, Math.max(0, v));
    if (pr <= MORPH_END + 1e-8) {
      const morphT = Math.min(1, pr / MORPH_END);
      return poseAt(morphT, layoutDef).scale;
    }
    const endS = poseAt(1, layoutDef).scale;
    const slideT = Math.min(1, (pr - MORPH_END) / (1 - MORPH_END));
    return lerp(endS, 1, smoothstep(slideT));
  });

  return (
    <motion.div
      className="pointer-events-none fixed origin-top-left"
      style={{
        left,
        top,
        width,
        height,
        rotate,
        scale,
        zIndex: layoutDef.z,
      }}
    >
      <Link href={`/work/${project.id}`} className="pointer-events-auto block h-full group">
        <motion.article
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-[var(--card)] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.15)]"
        >
          <div className="relative h-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 90vw, 45vw"
              priority={priority}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
              <div>
                <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/50">
                  {project.category}
                </p>
                <p className="font-display text-sm font-medium text-white">{project.title}</p>
              </div>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export default function HandoffFlyingPortal({
  progress,
  featured,
  stageRef,
  active,
}: {
  progress: MotionValue<number>;
  featured: ProjectItem[];
  stageRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const mdUp = useMdUp();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !mdUp || !active) return null;

  const layer = (
    <div className="pointer-events-none fixed inset-0 z-[42]" style={{ isolation: "isolate" }}>
      {featured.map((project, i) => (
        <HandoffCard
          key={project.id}
          project={project}
          layoutDef={HERO_CARD_LAYOUT[i]!}
          progress={progress}
          stageRef={stageRef}
          imageAspectRatio={i === 0 ? 16 / 9 : 4 / 3}
          priority={i === 0}
        />
      ))}
    </div>
  );

  return createPortal(layer, document.body);
}
