"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="w-full px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-dim">
              FAQ · 009
            </p>
            <h2 className="mt-4 text-[clamp(2.1rem,4vw,2.9rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-foreground md:text-[2.9rem]">
              Operating manual
              <br />
              <span className="text-muted-dim">translated.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Have a specific question? I usually reply the same day from Kampala (GMT+3).
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="divide-y divide-black/10">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span
                      className={`text-base font-medium transition-colors ${
                        open === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 ml-4 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-black/20 transition-colors">
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
                        <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
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
