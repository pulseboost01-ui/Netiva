/** Shared inquiry copy for WhatsApp + email pipelines (≤ ~1.8k WA URL safety). */

export type ContactInquiryPayload = {
  variant: "page" | "drawer";
  name: string;
  email: string;
  company?: string;
  message: string;
  budgetId?: string;
  budgetLabel?: string;
};

export type QuoteInquiryPayload = {
  selectedServiceIds: string[];
  /** Human-readable labels, same index order as IDs */
  serviceLabels: string[];
  budgetId: string;
  budgetLabel: string;
  name: string;
  email: string;
  company?: string;
  timeline?: string;
  description: string;
};

const SITE = "Netiva";

export function buildContactPlain(payload: ContactInquiryPayload): string {
  const lines = [
    `*${SITE} — contact form*`,
    "",
    `*Name:* ${payload.name}`,
    `*Email:* ${payload.email}`,
    payload.company ? `*Organization:* ${payload.company}` : null,
    payload.budgetLabel ? `*Budget band:* ${payload.budgetLabel}` : null,
    `*Submitted via:* ${payload.variant}`,
    "",
    "*Message:*",
    payload.message.trim(),
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

export function buildQuotePlain(payload: QuoteInquiryPayload): string {
  const lines = [
    `*${SITE} — quote request*`,
    "",
    `*Name:* ${payload.name}`,
    `*Email:* ${payload.email}`,
    payload.company ? `*Organization:* ${payload.company}` : null,
    `*Timeline:* ${payload.timeline?.trim() || "—"}`,
    `*Budget:* ${payload.budgetLabel}`,
    "",
    "*Services:*",
    payload.serviceLabels.map((s) => `• ${s}`).join("\n"),
    "",
    "*Brief:*",
    payload.description.trim(),
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

export function buildWhatsAppHref(whatsappDigitsSansPlus: string, body: string): string {
  const safe = typeof body === "string" ? body.trim() : "";
  const max = 1550;
  const text = safe.length > max ? `${safe.slice(0, max - 30)}\n\n… (${safe.length - max} more chars truncated)` : safe;
  return `https://wa.me/${whatsappDigitsSansPlus.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
