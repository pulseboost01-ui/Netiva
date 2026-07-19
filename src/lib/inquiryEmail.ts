/**
 * HTML + plain-text templates for inquiry notification emails. Deliberately separate from the
 * WhatsApp copy in inquiryMessaging.ts, which uses *asterisk* bold markers — those render as
 * literal asterisks in an email client, so email gets its own clean layout instead of reusing
 * that text verbatim.
 */
import type { BookingInquiryPayload, ContactInquiryPayload, QuoteInquiryPayload } from "./inquiryMessaging";

type EmailField = { label: string; value: string };

const ACCENT = "#059669";
const INK = "#141414";
const MUTED = "#6b7280";
const BORDER = "#e5e5e5";
const BG = "#f5f5f4";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function visibleFields(fields: EmailField[]): EmailField[] {
  return fields.filter((f) => f.value.trim().length > 0);
}

function fieldRowsHtml(fields: EmailField[]): string {
  return visibleFields(fields)
    .map(
      (f) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${MUTED};width:140px;vertical-align:top;">${esc(f.label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:14px;color:${INK};vertical-align:top;">${esc(f.value)}</td>
      </tr>`,
    )
    .join("");
}

function buildEmailHtml(opts: {
  eyebrow: string;
  heading: string;
  fields: EmailField[];
  bodyLabel?: string;
  bodyValue?: string;
  replyTo: string;
}): string {
  const { eyebrow, heading, fields, bodyLabel, bodyValue, replyTo } = opts;
  const bodyBlock = bodyValue?.trim()
    ? `
            <tr>
              <td style="padding:20px 32px 0;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${MUTED};">${esc(bodyLabel || "Message")}</p>
                <div style="background:${BG};border-radius:10px;padding:14px 16px;font-size:14px;line-height:1.6;color:${INK};white-space:pre-wrap;">${esc(bodyValue)}</div>
              </td>
            </tr>`
    : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BORDER};">
            <tr>
              <td style="padding:28px 32px 0;">
                <span style="display:inline-block;width:28px;height:28px;border-radius:8px;background:${ACCENT};text-align:center;line-height:28px;color:#fff;font-weight:700;font-size:13px;">N</span>
                <span style="margin-left:10px;font-size:13px;font-weight:700;letter-spacing:.14em;color:${INK};vertical-align:middle;">NETIVA</span>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 4px;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ACCENT};">${esc(eyebrow)}</p>
                <h1 style="margin:6px 0 0;font-size:20px;line-height:1.3;color:${INK};font-weight:700;">${esc(heading)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${fieldRowsHtml(fields)}
                </table>
              </td>
            </tr>
            ${bodyBlock}
            <tr>
              <td style="padding:28px 32px 28px;">
                <a href="mailto:${esc(replyTo)}" style="display:inline-block;background:${INK};color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:11px 22px;border-radius:999px;">Reply to this lead</a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;border-top:1px solid ${BORDER};">
                <p style="margin:0;font-size:11px;color:${MUTED};">Sent automatically from the netiva.tech inquiry form.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText(opts: { heading: string; fields: EmailField[]; bodyLabel?: string; bodyValue?: string }): string {
  const { heading, fields, bodyLabel, bodyValue } = opts;
  const lines = [heading, "", ...visibleFields(fields).map((f) => `${f.label}: ${f.value}`)];
  if (bodyValue?.trim()) {
    lines.push("", bodyLabel || "Message", bodyValue.trim());
  }
  return lines.join("\n");
}

export function buildContactEmail(payload: ContactInquiryPayload): { html: string; text: string } {
  const fields: EmailField[] = [
    { label: "Name", value: payload.name },
    { label: "Email", value: payload.email },
    { label: "Organization", value: payload.company || "" },
    { label: "Budget band", value: payload.budgetLabel || "" },
    { label: "Submitted via", value: payload.variant },
  ];
  return {
    html: buildEmailHtml({
      eyebrow: "New enquiry",
      heading: `${payload.name} sent a message`,
      fields,
      bodyLabel: "Message",
      bodyValue: payload.message,
      replyTo: payload.email,
    }),
    text: buildEmailText({ heading: "Netiva — new enquiry", fields, bodyLabel: "Message", bodyValue: payload.message }),
  };
}

export function buildQuoteEmail(payload: QuoteInquiryPayload): { html: string; text: string } {
  const fields: EmailField[] = [
    { label: "Name", value: payload.name },
    { label: "Email", value: payload.email },
    { label: "Organization", value: payload.company || "" },
    { label: "Timeline", value: payload.timeline || "" },
    { label: "Budget", value: payload.budgetLabel },
    { label: "Services", value: payload.serviceLabels.join(", ") },
  ];
  return {
    html: buildEmailHtml({
      eyebrow: "New quote request",
      heading: `${payload.name} requested a quote`,
      fields,
      bodyLabel: "Brief",
      bodyValue: payload.description,
      replyTo: payload.email,
    }),
    text: buildEmailText({ heading: "Netiva — new quote request", fields, bodyLabel: "Brief", bodyValue: payload.description }),
  };
}

export function buildBookingEmail(payload: BookingInquiryPayload): { html: string; text: string } {
  const fields: EmailField[] = [
    { label: "Name", value: payload.name },
    { label: "Email", value: payload.email },
    { label: "Preferred date", value: payload.date },
    { label: "Preferred time", value: payload.time },
  ];
  return {
    html: buildEmailHtml({
      eyebrow: "New booking request",
      heading: `${payload.name} wants to schedule a call`,
      fields,
      bodyLabel: "Context",
      bodyValue: payload.message,
      replyTo: payload.email,
    }),
    text: buildEmailText({ heading: "Netiva — new booking request", fields, bodyLabel: "Context", bodyValue: payload.message }),
  };
}
