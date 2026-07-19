import { NextResponse } from "next/server";
import { Resend } from "resend";
import { budgetRanges, quoteServices } from "@/data";
import { siteConfig } from "@/data";
import {
  buildBookingPlain,
  buildContactPlain,
  buildQuotePlain,
  buildWhatsAppHref,
  type BookingInquiryPayload,
  type ContactInquiryPayload,
  type QuoteInquiryPayload,
} from "@/lib/inquiryMessaging";
import { buildBookingEmail, buildContactEmail, buildQuoteEmail } from "@/lib/inquiryEmail";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY?.trim();

const inbox =
  typeof process.env.INQUIRY_INBOX_EMAIL === "string" && process.env.INQUIRY_INBOX_EMAIL.trim()
    ? process.env.INQUIRY_INBOX_EMAIL.trim()
    : siteConfig.email;

async function sendInquiryEmail(
  subject: string,
  content: { html: string; text: string },
  replyTo: string,
): Promise<boolean> {
  if (!resendApiKey) return false;
  const resend = new Resend(resendApiKey);
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.INQUIRY_FROM_EMAIL?.trim() ||
    "Netiva Forms <onboarding@resend.dev>";
  try {
    const { error } = await resend.emails.send({
      from,
      to: [inbox],
      subject,
      html: content.html,
      text: content.text,
      replyTo,
    });
    if (error) {
      console.error("[inquiries] Resend error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[inquiries] Resend exception:", e);
    return false;
  }
}

export async function POST(req: Request) {
  let json: Record<string, unknown>;
  try {
    json = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (typeof json.honeypot === "string" && json.honeypot.trim() !== "") {
    return NextResponse.json({ ok: true, muted: true });
  }

  const type = json.type === "quote" ? "quote" : json.type === "booking" ? "booking" : "contact";

  if (type === "booking") {
    const name = String(json.name ?? "").trim().slice(0, 240);
    const email = String(json.email ?? "").trim().slice(0, 254);
    const date = String(json.date ?? "").trim().slice(0, 40);
    const time = String(json.time ?? "").trim().slice(0, 40);
    const message = typeof json.message === "string" ? json.message.trim().slice(0, 15000) : "";

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !date || !time) {
      return NextResponse.json({ error: "Please provide a valid name, email, date, and time." }, { status: 400 });
    }

    const payload: BookingInquiryPayload = { name, email, date, time, message: message || undefined };
    const subject = `[${siteConfig.name}] Booking request — ${name}`;
    const emailSent = await sendInquiryEmail(subject, buildBookingEmail(payload), email);

    const whatsAppUrl = buildWhatsAppHref(siteConfig.phone.whatsappDigits, buildBookingPlain(payload));
    return NextResponse.json({ ok: true, emailSent, whatsAppUrl });
  }

  if (type === "contact") {
    const variant = json.variant === "drawer" ? "drawer" : "page";
    const name = String(json.name ?? "").trim().slice(0, 240);
    const email = String(json.email ?? "").trim().slice(0, 254);
    const company = typeof json.company === "string" ? json.company.trim().slice(0, 240) : "";
    const message = String(json.message ?? "").trim().slice(0, 15000);
    const budgetId = typeof json.budgetId === "string" ? json.budgetId.trim() : "";

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 4) {
      return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
    }

    if (variant === "drawer" && !budgetId) {
      return NextResponse.json({ error: "Please choose a budget range." }, { status: 400 });
    }

    const budgetLabel =
      budgetId && budgetRanges.find((b) => b.id === budgetId) ? budgetRanges.find((b) => b.id === budgetId)!.label : undefined;

    const payload: ContactInquiryPayload = {
      variant,
      name,
      email,
      company: company || undefined,
      message,
      budgetId: budgetId || undefined,
      budgetLabel,
    };

    const subject = `[${siteConfig.name}] Contact — ${name}`;
    const emailSent = await sendInquiryEmail(subject, buildContactEmail(payload), email);

    const whatsAppUrl = buildWhatsAppHref(siteConfig.phone.whatsappDigits, buildContactPlain(payload));
    return NextResponse.json({ ok: true, emailSent, whatsAppUrl });
  }

  const selectedRaw = json.selectedServices;
  if (!Array.isArray(selectedRaw)) {
    return NextResponse.json({ error: "Quote services missing." }, { status: 400 });
  }

  const selectedServiceIds = selectedRaw.filter((id): id is string => typeof id === "string").slice(0, 24);

  const budgetId = typeof json.budgetId === "string" ? json.budgetId.trim() : "";
  const budgetRec = budgetRanges.find((b) => b.id === budgetId);

  const d = typeof json.details === "object" && json.details !== null ? (json.details as Record<string, unknown>) : {};
  const name = String(d.name ?? "").trim().slice(0, 240);
  const email = String(d.email ?? "").trim().slice(0, 254);
  const company = typeof d.company === "string" ? d.company.trim().slice(0, 240) : "";
  const timeline = typeof d.timeline === "string" ? d.timeline.trim().slice(0, 500) : "";
  const description = String(d.description ?? "").trim().slice(0, 15000);

  if (selectedServiceIds.length === 0 || !budgetRec || name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || description.length < 4) {
    return NextResponse.json(
      { error: "Quote needs services, budget, name, email, and description." },
      { status: 400 },
    );
  }

  const serviceLabels = selectedServiceIds
    .map((id) => quoteServices.find((s) => s.id === id)?.label ?? id)
    .filter(Boolean);

  const payload: QuoteInquiryPayload = {
    selectedServiceIds,
    serviceLabels,
    budgetId,
    budgetLabel: budgetRec.label,
    name,
    email,
    company: company || undefined,
    timeline: timeline || undefined,
    description,
  };

  const subject = `[${siteConfig.name}] Quote — ${name}`;
  const emailSent = await sendInquiryEmail(subject, buildQuoteEmail(payload), email);
  const whatsAppUrl = buildWhatsAppHref(siteConfig.phone.whatsappDigits, buildQuotePlain(payload));

  return NextResponse.json({ ok: true, emailSent, whatsAppUrl });
}
