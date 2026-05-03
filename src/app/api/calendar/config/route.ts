import { NextResponse } from "next/server";
import { getSchedulerEmbedSrc } from "@/lib/schedulingEmbed";
import { getCalBookingConfig } from "@/lib/calcom/server";

export const runtime = "nodejs";

/**
 * Public capability flags for the booking drawer (no secrets).
 */
export async function GET() {
  const embedUrl = getSchedulerEmbedSrc();
  const cal = getCalBookingConfig();

  let mode: "slots" | "embed" | "manual" = "manual";
  if (cal.slotsConfigured) {
    mode = "slots";
  } else if (embedUrl) {
    mode = "embed";
  }

  return NextResponse.json({ mode, embedUrl });
}
