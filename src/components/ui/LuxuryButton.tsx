"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

type Props = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  magnetic?: boolean;
};

const variants = {
  primary:
    "bg-accent text-white border border-accent/30 shadow-[0_20px_50px_-20px_var(--accent-glow)] hover:bg-[#a68435]",
  ghost: "bg-transparent text-foreground border border-border hover:border-border-strong hover:bg-surface-elevated",
  outline: "bg-surface text-foreground border border-border-strong hover:border-accent/40",
};

const sizes = {
  md: "px-6 py-3 text-[11px] tracking-[0.28em]",
  lg: "px-9 py-3.5 text-[11px] tracking-[0.32em]",
};

export default function LuxuryButton({
  children,
  variant = "primary",
  size = "md",
  magnetic = true,
  className = "",
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, ease: easeOutExpo }}
      className={`inline-flex items-center justify-center rounded-full font-semibold uppercase transition-[background-color,border-color,box-shadow] duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
