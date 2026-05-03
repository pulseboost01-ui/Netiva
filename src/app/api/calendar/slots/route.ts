import { NextResponse } from "next/server";
import {
  CAL_SLOTS_API_VERSION,
  calHeaders,
  getCalBookingConfig,
} from "@/lib/calcom/server";

export const runtime = "nodejs";

const CAL_BASE = "https://api.cal.com";

type SlotEntry = { start: string; end?: string };

/**
 * Proxies Cal.com v2 slots — keeps the API key on the server.
 */
export async function GET(req: Request) {
  const cal = getCalBookingConfig();
  if (!cal.slotsConfigured || !cal.apiKey) {
    return NextResponse.json({ error: "Calendar API is not configured." }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const timeZone = searchParams.get("timeZone") || "UTC";

  if (!start?.trim() || !end?.trim()) {
    return NextResponse.json({ error: "Missing start or end (ISO date)." }, { status: 400 });
  }

  const qs = new URLSearchParams({
    start: start.trim(),
    end: end.trim(),
    timeZone,
    format: "range",
  });

  if (cal.eventTypeId != null) {
    qs.set("eventTypeId", String(cal.eventTypeId));
  } else if (cal.username && cal.eventTypeSlug) {
    qs.set("username", cal.username);
    qs.set("eventTypeSlug", cal.eventTypeSlug);
    if (cal.organizationSlug) {
      qs.set("organizationSlug", cal.organizationSlug);
    }
  }

  const url = `${CAL_BASE}/v2/slots?${qs.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: calHeaders(CAL_SLOTS_API_VERSION, cal.apiKey),
    cache: "no-store",
  });

  const json = (await res.json()) as {
    status?: string;
    data?: Record<string, SlotEntry[]>;
    error?: { message?: string };
  };

  if (!res.ok) {
    console.error("[calendar/slots]", res.status, JSON.stringify(json).slice(0, 500));
    return NextResponse.json(
      { error: json?.error?.message || "Could not load availability." },
      { status: res.status >= 500 ? 502 : res.status },
    );
  }

  const data = json.data && typeof json.data === "object" ? json.data : {};
  return NextResponse.json({ slots: data });
}
