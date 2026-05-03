"use client";

import { Mail, Calendar, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

export default function SpeakToMeBar() {
  const { open, openBooking } = useContactDrawer();
  const whatsAppQuick = `https://wa.me/${siteConfig.phone.whatsappDigits}?text=${encodeURIComponent(
    "*Netiva site visitor*\nI would like routing help on a briefing.",
  )}`;

  return (
    <div
      className="fixed bottom-5 left-1/2 z-[45] w-[min(calc(100vw-1rem),34rem)] -translate-x-1/2 px-3 md:bottom-7"
      aria-label="Contact shortcuts"
    >
      <div className="flex items-center justify-between gap-4 rounded-[14px] border border-white/50 bg-white/80 px-3 py-2.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-4 md:py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900">Signal desk</p>
          <p className="truncate text-[11px] text-neutral-600 md:text-xs">{siteConfig.phone.display}</p>
          <p className="truncate font-mono text-[10px] text-neutral-500 md:text-[11px]">{siteConfig.email}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => open()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 transition-colors hover:bg-neutral-50 md:h-10 md:w-10"
            aria-label="Open enquiry form"
            title="Enquiry form"
          >
            <Mail size={16} strokeWidth={1.75} />
          </button>
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 transition-colors hover:bg-neutral-50 md:h-10 md:w-10"
            aria-label={`Call ${siteConfig.phone.display}`}
            title="Call"
          >
            <Phone size={16} strokeWidth={1.75} />
          </a>
          <a
            href={whatsAppQuick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700/35 bg-emerald-600 text-white shadow-sm transition-colors hover:bg-emerald-700 md:h-10 md:w-10"
            aria-label="Open WhatsApp with Netiva"
            title="WhatsApp"
          >
            <MessageCircle size={17} strokeWidth={1.75} />
          </a>
          <button
            onClick={() => openBooking()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 transition-colors hover:bg-neutral-50 md:h-10 md:w-10"
            aria-label="Schedule a call with Netiva"
            title="Schedule Call"
          >
            <Calendar size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
