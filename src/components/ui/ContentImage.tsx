"use client";

import Image, { type ImageProps } from "next/image";
import { isContentPlaceholder } from "@/lib/content";

type ContentImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/** Blog/cover images only — empty muted panel when no asset, never "coming soon" copy. */
export default function ContentImage({
  src,
  alt,
  className = "",
  fill,
  ...rest
}: ContentImageProps) {
  if (isContentPlaceholder(src)) {
    return (
      <div
        className={`relative overflow-hidden bg-[linear-gradient(135deg,var(--surface-elevated),var(--muted))] ${fill ? "absolute inset-0" : ""} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(184, 148, 63, 0.2), transparent 42%), linear-gradient(135deg, rgba(20, 19, 16, 0.04), transparent 70%)" }} />
        <div className="absolute inset-0 border border-black/5" />
        <div className="absolute inset-x-5 top-5 h-16 rounded-full border border-black/5 bg-white/50 blur-2xl" />
        <div className="absolute inset-y-0 left-5 w-px bg-accent/20" />
        <div className="absolute inset-y-0 right-5 w-px bg-accent/20" />
      </div>
    );
  }

  return <Image src={src} alt={alt} fill={fill} className={className} {...rest} />;
}
