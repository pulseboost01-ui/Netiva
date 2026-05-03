"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import ContactFormPanel from "@/components/contact/ContactFormPanel";

export default function ContactDrawer() {
  const { isOpen, close } = useContactDrawer();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close contact"
            className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-[18px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-drawer-title"
            className="fixed inset-y-0 right-0 z-[100] flex h-full w-full max-w-[min(100%,max(340px,min(460px,35vw)))] flex-col bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),-28px_0_80px_-24px_rgba(0,0,0,0.18)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 340 }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 z-10 p-2 text-neutral-400 transition-colors hover:text-neutral-900"
              aria-label="Close"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-[4.25rem]">
              <ContactFormPanel variant="drawer" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
