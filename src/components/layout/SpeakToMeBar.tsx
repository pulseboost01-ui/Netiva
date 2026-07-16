"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data";

export default function SpeakToMeBar() {
  const whatsAppQuick = `https://wa.me/${siteConfig.phone.whatsappDigits}?text=${encodeURIComponent(
    "*Netiva site visitor*\nI would like routing help on a briefing.",
  )}`;

  return (
    <a
      href={whatsAppQuick}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-premium text-white shadow-[0_16px_40px_-14px_rgba(5,150,105,0.55)] transition-transform hover:scale-105 md:bottom-8 md:right-8"
      aria-label="Chat with Netiva on WhatsApp"
      title="Chat with us"
    >
      <MessageCircle size={22} strokeWidth={1.75} />
    </a>
  );
}
