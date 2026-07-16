"use client";

import { Calendar, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

type InquiryDeliveryActionsProps = {
  whatsAppUrl: string;
  /** True when `/api/inquiries` delivered structured mail via Resend. */
  emailDelivered: boolean;
};

/**
 * Secondary channels after enquiry submission — WhatsApp (always prepared), in-app scheduling, mailto fallback.
 */
export default function InquiryDeliveryActions({ whatsAppUrl, emailDelivered }: InquiryDeliveryActionsProps) {
  const { openBooking } = useContactDrawer();
  const inbox = siteConfig.email;
  const mailtoFollowUp = `mailto:${inbox}?subject=${encodeURIComponent("Re: enquiry follow-up via netiva.tech")}&body=${encodeURIComponent("I would like to add context to my recent enquiry.\n")}`;

  return (
    <div className="mt-8 w-full max-w-md space-y-5 text-center">
      {!emailDelivered ? (
        <p className="rounded-xl border border-amber-300/55 bg-amber-100/85 px-4 py-3 text-left text-[12px] leading-relaxed text-amber-950">
          We couldn&apos;t relay this through server email yet (<code className="rounded bg-black/5 px-1 text-[11px]">RESEND_API_KEY</code>{""}
          missing). The same briefing is summarized for WhatsApp—tap below. For production installs, provision Resend plus a
          verified <code className="text-[11px]">RESEND_FROM_EMAIL</code>.
        </p>
      ) : (
        <p className="text-[13px] leading-relaxed text-neutral-600">
          Delivered structured copy to <strong className="text-neutral-900">{inbox}</strong>. You can keep going on WhatsApp for
          thread velocity.
        </p>
      )}

      <div className="flex flex-col gap-2.5">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-premium px-6 py-[0.7rem] text-[13px] font-semibold text-white shadow-[0_16px_40px_-22px_rgba(5,118,71,1)] transition-colors hover:bg-emerald-700"
        >
          <MessageCircle size={17} aria-hidden strokeWidth={2} />
          Send via WhatsApp
        </a>
        <button
          onClick={() => openBooking()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-950 bg-neutral-950 px-6 py-[0.7rem] text-[13px] font-semibold text-white hover:bg-neutral-800"
        >
          <Calendar size={16} aria-hidden strokeWidth={2} />
          Schedule Call
        </button>
        <a
          href={`tel:${siteConfig.phone.tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-transparent px-6 py-[0.65rem] text-[13px] font-semibold text-neutral-800 hover:border-black/25"
          aria-label="Call Netiva studio"
        >
          Call <span className="font-mono">{siteConfig.phone.display}</span>
        </a>
        <a
          href={mailtoFollowUp}
          className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-neutral-600 underline decoration-black/25 underline-offset-4 hover:text-neutral-950"
        >
          <Mail size={15} aria-hidden strokeWidth={1.75} />
          Email fallback
        </a>
      </div>
    </div>
  );
}
