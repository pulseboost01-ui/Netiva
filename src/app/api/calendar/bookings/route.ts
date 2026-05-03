import { NextResponse } from "next/server";
import { siteConfig } from "@/data";
import {
  CAL_BOOKINGS_API_VERSION,
  calHeaders,
  getCalBookingConfig,
} from "@/lib/calcom/server";

export const runtime = "nodejs";

const CAL_BASE = "https://api.cal.com";

type Body = {
  start: string;
  name: string;
  email: string;
  notes?: string;
  timeZone?: string;
};

/**
 * Creates a Cal.com booking via API v2 — API key never leaves the server.
 */
export async function POST(req: Request) {
  const cal = getCalBookingConfig();
  if (!cal.slotsConfigured || !cal.apiKey) {
    return NextResponse.json({ error: "Calendar booking is not configured." }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const start = String(body.start ?? "").trim();
  const name = String(body.name ?? "").trim().slice(0, 240);
  const email = String(body.email ?? "").trim().slice(0, 254);
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 2000) : "";
  const timeZone =
    typeof body.timeZone === "string" && body.timeZone.trim()
      ? body.timeZone.trim()
      : "UTC";

  if (!start || name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid start time, name, and email are required." }, { status: 400 });
  }

  const payload: Record<string, unknown> = {
    start,
    attendee: {
      name,
      email,
      timeZone,
    },
    metadata: {
      source: `${siteConfig.name} web booking drawer`,
      ...(notes ? { notes } : {}),
      ...(cal.organizerEmail ? { organizerEmail: cal.organizerEmail } : {}),
    },
  };

  if (cal.eventTypeId != null) {
    payload.eventTypeId = cal.eventTypeId;
  } else if (cal.username && cal.eventTypeSlug) {
    payload.eventTypeSlug = cal.eventTypeSlug;
    payload.username = cal.username;
    if (cal.organizationSlug) {
      payload.organizationSlug = cal.organizationSlug;
    }
  }

  const res = await fetch(`${CAL_BASE}/v2/bookings`, {
    method: "POST",
    headers: calHeaders(CAL_BOOKINGS_API_VERSION, cal.apiKey),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const json = (await res.json()) as {
    status?: string;
    error?: { message?: string; code?: string };
    data?: { uid?: string; id?: number };
  };

  if (!res.ok) {
    console.error("[calendar/bookings]", res.status, JSON.stringify(json).slice(0, 800));
    const msg = json?.error?.message || "Booking failed.";
    return NextResponse.json({ error: msg }, { status: res.status >= 500 ? 502 : res.status });
  }

  return NextResponse.json({
    ok: true,
    uid: json.data?.uid,
    id: json.data?.id,
  });
}
