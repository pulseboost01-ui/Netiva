const CAL_BASE = "https://api.cal.com";

export const CAL_SLOTS_API_VERSION = "2024-09-04";
export const CAL_BOOKINGS_API_VERSION = "2026-02-25";

export function getCalApiKey(): string | undefined {
  const k = process.env.CALCOM_API_KEY?.trim();
  return k || undefined;
}

export function getCalBookingConfig() {
  const username = process.env.CALCOM_USERNAME?.trim();
  const eventTypeSlug = process.env.CALCOM_EVENT_SLUG?.trim();
  const organizationSlug = process.env.CALCOM_ORGANIZATION_SLUG?.trim();
  const eventTypeIdRaw = process.env.CALCOM_EVENT_TYPE_ID?.trim();
  const eventTypeId = eventTypeIdRaw ? Number.parseInt(eventTypeIdRaw, 10) : NaN;
  const organizerEmail = process.env.CALCOM_ORGANIZER_EMAIL?.trim();

  const apiKey = getCalApiKey();
  const slotsConfigured =
    !!apiKey &&
    (Number.isFinite(eventTypeId) ||
      (typeof username === "string" &&
        username.length > 0 &&
        typeof eventTypeSlug === "string" &&
        eventTypeSlug.length > 0));

  return {
    apiKey,
    username,
    eventTypeSlug,
    organizationSlug: organizationSlug || undefined,
    eventTypeId: Number.isFinite(eventTypeId) ? eventTypeId : undefined,
    organizerEmail: organizerEmail || undefined,
    slotsConfigured,
  };
}

export function calHeaders(apiVersion: string, apiKey?: string): HeadersInit {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    "cal-api-version": apiVersion,
  };
  if (apiKey) {
    h.Authorization = `Bearer ${apiKey}`;
  }
  return h;
}
