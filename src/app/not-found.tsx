"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-[clamp(6rem,20vw,16rem)] font-light text-neutral-900/[0.04] leading-none select-none mb-0 font-display"
        >
          404
        </p>
        <div className="-mt-8 md:-mt-16">
          <h1 className="text-3xl md:text-4xl text-neutral-900 mb-4">
            Page not found
          </h1>
          <p className="text-neutral-500 text-sm mb-8 max-w-xs mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-black/10 text-neutral-600 text-sm rounded-full hover:border-black/25 hover:text-neutral-900 transition-all"
            >
              <ArrowLeft size={14} />
              Back home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
