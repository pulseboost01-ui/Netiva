/**
 * Server-only: optional iframe URL for embedded scheduling inside the booking drawer.
 * Set `SCHEDULER_EMBED_URL` in the deployment environment (e.g. your provider’s embed link with `embed=true`).
 */
export function getSchedulerEmbedSrc(): string | null {
  const raw = process.env.SCHEDULER_EMBED_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.searchParams.has("embed")) {
      url.searchParams.set("embed", "true");
    }
    return url.toString();
  } catch {
    return null;
  }
}
