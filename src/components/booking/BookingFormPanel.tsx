"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  MessageSquare,
  Send,
  Check,
  Loader2,
} from "lucide-react";
import SchedulingEmbedFrame from "@/components/booking/SchedulingEmbedFrame";
import ManualBookingFallback from "@/components/booking/ManualBookingFallback";

type SlotEntry = { start: string; end?: string };
type SlotsMap = Record<string, SlotEntry[]>;

type CalendarMode = "slots" | "embed" | "manual";

export default function BookingFormPanel() {
  const [mode, setMode] = useState<CalendarMode>("manual");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [slots, setSlots] = useState<SlotsMap>({});
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlotStart, setSelectedSlotStart] = useState<string>("");
  const [booking, setBooking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configLoading, setConfigLoading] = useState(true);

  const timeZone = typeof window !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";

  const loadSlots = useCallback(async () => {
    setSlotsLoading(true);
    setSlotsError(null);
    try {
      const from = new Date();
      const to = new Date(from.getTime() + 14 * 86400000);
      const start = from.toISOString().slice(0, 10);
      const end = to.toISOString().slice(0, 10);
      const res = await fetch(
        `/api/calendar/slots?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&timeZone=${encodeURIComponent(timeZone)}`,
      );
      const data = (await res.json()) as { slots?: SlotsMap; error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Could not load times.");
      }
      setSlots(data.slots && typeof data.slots === "object" ? data.slots : {});
    } catch (e) {
      setSlotsError(e instanceof Error ? e.message : "Could not load availability.");
      setSlots({});
    } finally {
      setSlotsLoading(false);
    }
  }, [timeZone]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/calendar/config");
        const data = (await res.json()) as {
          mode?: CalendarMode;
          embedUrl?: string | null;
        };
        if (cancelled) return;
        const m = data.mode === "slots" || data.mode === "embed" ? data.mode : "manual";
        setMode(m);
        setEmbedUrl(typeof data.embedUrl === "string" ? data.embedUrl : null);
      } catch {
        if (!cancelled) setMode("manual");
      } finally {
        if (!cancelled) setConfigLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (mode === "slots") {
      void loadSlots();
    }
  }, [mode, loadSlots]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = async () => {
    if (!selectedSlotStart || !formData.name.trim() || !formData.email.trim()) {
      setError("Pick a time and enter your name and email.");
      return;
    }

    setBooking(true);
    setError(null);

    try {
      const res = await fetch("/api/calendar/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlotStart,
          name: formData.name.trim(),
          email: formData.email.trim(),
          notes: formData.message.trim(),
          timeZone,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Booking failed.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed.");
    } finally {
      setBooking(false);
    }
  };

  const availableDates = Object.keys(slots).sort();

  const formatSlotLabel = (isoStart: string) =>
    new Date(isoStart).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });

  if (configLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (mode === "embed" && embedUrl) {
    return (
      <div className="pb-4">
        <header className="mb-4">
          <h2 id="booking-drawer-title" className="text-xl font-bold text-neutral-900">
            Schedule a call
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Pick a time below. Your session stays on this site.
          </p>
        </header>
        <SchedulingEmbedFrame src={embedUrl} title="Book a consultation" />
      </div>
    );
  }

  if (mode === "manual") {
    return (
      <div>
        <header className="mb-4">
          <h2 id="booking-drawer-title" className="text-xl font-bold text-neutral-900">
            Schedule a call
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Request a slot—we will confirm by email shortly. Prefer instant booking? Configure the calendar integration in your
            deployment environment.
          </p>
        </header>
        <ManualBookingFallback />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-premium/10">
          <Check className="h-7 w-7 text-premium" />
        </div>
        <h2 id="booking-drawer-title" className="mb-2 text-2xl font-bold text-neutral-900">
          You&apos;re booked
        </h2>
        <p className="text-sm text-neutral-600">
          Check <span className="font-medium text-neutral-900">{formData.email}</span> for the calendar invite and
          links.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h2 id="booking-drawer-title" className="text-xl font-bold text-neutral-900">
          Schedule a call
        </h2>
        <p className="mt-1 text-sm text-neutral-600">Choose an open slot—all times are shown in your timezone.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <div>
            <label className={`${labelClass}`}>
              <User className="mr-2 inline h-4 w-4" />
              Full name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={fieldClass}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className={`${labelClass}`}>
              <Mail className="mr-2 inline h-4 w-4" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={fieldClass}
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className={`${labelClass}`}>
              <MessageSquare className="mr-2 inline h-4 w-4" />
              Agenda (optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={2}
              className={`${fieldClass} resize-none`}
              placeholder="What should we prepare for?"
            />
          </div>
        </div>

        <div>
          <label className={`${labelClass} mb-2`}>
            <Calendar className="mr-2 inline h-4 w-4" />
            Date *
          </label>
          {slotsLoading ? (
            <div className="flex items-center gap-2 py-6 text-sm text-neutral-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading availability…
            </div>
          ) : slotsError ? (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{slotsError}</p>
          ) : availableDates.length === 0 ? (
            <p className="text-sm text-neutral-500">No openings in the next two weeks. Try again later or use email.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {availableDates.slice(0, 12).map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlotStart("");
                  }}
                  className={`rounded-lg border p-2.5 text-center text-xs transition-colors ${
                    selectedDate === date
                      ? "border-premium bg-premium text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {new Date(date + "T12:00:00").toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedDate && slots[selectedDate]?.length ? (
          <div>
            <label className={`${labelClass} mb-2`}>
              <Clock className="mr-2 inline h-4 w-4" />
              Time *
            </label>
            <div className="grid max-h-[200px] grid-cols-2 gap-2 overflow-y-auto pr-1">
              {slots[selectedDate].map((slot) => (
                <button
                  key={slot.start}
                  type="button"
                  onClick={() => setSelectedSlotStart(slot.start)}
                  className={`rounded-lg border p-2.5 text-center text-xs transition-colors ${
                    selectedSlotStart === slot.start
                      ? "border-premium bg-premium text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {formatSlotLabel(slot.start)}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {error ? <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

        <button
          type="button"
          onClick={() => void handleBooking()}
          disabled={booking || !selectedSlotStart || !formData.name.trim() || !formData.email.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-premium py-3 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {booking ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Confirming…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Confirm booking
            </>
          )}
        </button>
      </div>
    </div>
  );
}

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700";
const fieldClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10";
