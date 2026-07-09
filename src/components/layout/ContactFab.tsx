"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Calendar, Phone, MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { open: openContact, openBooking } = useContactDrawer();
  const whatsAppQuick = `https://wa.me/${siteConfig.phone.whatsappDigits}?text=${encodeURIComponent(
    "Hello Netiva — I would like to discuss a project.",
  )}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2 md:bottom-6 md:right-6"
      aria-label="Contact shortcuts"
    >
      {open ? (
        <div className="mb-1 flex w-[min(calc(100vw-2.5rem),16rem)] flex-col gap-1 rounded-2xl border border-border bg-surface p-2 shadow-soft">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openContact();
            }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Mail size={16} />
            Email form
          </button>
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Phone size={16} />
            Call
          </a>
          <a
            href={whatsAppQuick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Calendar size={16} />
            Schedule call
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent text-white shadow-[0_8px_28px_-8px_var(--accent-glow)] transition-transform hover:scale-105"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
