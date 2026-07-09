"use client";

import type { ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  variant?: "browser" | "phone";
};

export function DeviceFrame({ children, className = "", label, variant = "browser" }: FrameProps) {
  if (variant === "phone") {
    return (
      <div
        className={`mx-auto w-[min(100%,300px)] overflow-hidden rounded-[2.25rem] border border-border-strong bg-surface p-2.5 shadow-lift ${className}`}
      >
        <div className="mb-2.5 flex justify-center">
          <span className="h-1 w-20 rounded-full bg-border-strong" />
        </div>
        <div className="relative overflow-hidden rounded-[1.65rem] border border-border bg-background ring-1 ring-accent/10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-luxury border border-border-strong bg-surface shadow-lift ${className}`}>
      <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-4 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-dim/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-dim/40" />
        {label ? (
          <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted-dim">{label}</span>
        ) : null}
      </div>
      <div className="relative bg-background ring-1 ring-inset ring-border">{children}</div>
    </div>
  );
}
