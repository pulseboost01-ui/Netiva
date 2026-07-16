"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorStyle = () => {
      const el = document.elementFromPoint(position.x, position.y);
      if (el) {
        const style = window.getComputedStyle(el).cursor;
        setIsPointer(style === "pointer");
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateCursorStyle);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateCursorStyle);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [position.x, position.y]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neutral-900 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHidden ? 0 : 0.85,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neutral-900/35 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          opacity: isHidden ? 0 : 0.5,
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
      />
    </>
  );
}
