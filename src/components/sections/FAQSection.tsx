"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-black/6 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
              FAQ · 009
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-tight text-neutral-900 md:text-[2.85rem]">
              Operating manual
              <br />
              <span className="text-neutral-400">translated.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-neutral-600">
              Need something sharper? Ping us—we usually reply same business day.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="divide-y divide-black/10">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span
                      className={`text-base font-medium transition-colors ${
                        open === i ? "text-neutral-900" : "text-neutral-600 group-hover:text-neutral-800"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 ml-4 w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-neutral-500 group-hover:border-black/20 transition-colors">
                      {open === i ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
