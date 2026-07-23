"use client";

import { useState } from "react";
import { Calendar, Clock, User, Mail, MessageSquare, Send } from "lucide-react";
import { siteConfig } from "@/data";

/**
 * Fallback when `SCHEDULER_EMBED_URL` is not set — still delivers via inbox + WhatsApp APIs.
 */
export default function ManualBookingFallback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });
  const [trap, setTrap] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          honeypot: trap,
          name: formData.name,
          email: formData.email,
          date: formData.date,
          time: formData.time,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-black/10 bg-[var(--card)] p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
          <Calendar className="h-7 w-7 text-accent" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-900">Request received</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          We will confirm your slot by email within one business day. If anything is urgent, reach us on{" "}
          <a href={`tel:${siteConfig.phone.tel}`} className="font-semibold text-neutral-900 underline-offset-2 hover:underline">
            {siteConfig.phone.display}
          </a>{" "}
          or{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-neutral-900 underline-offset-2 hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-[var(--card)] p-6 shadow-sm md:p-8">
      <p className="mb-6 text-sm leading-relaxed text-neutral-600">
        Pick a preferred window below. We match it against studio availability and confirm by email.
      </p>
      <form onSubmit={handleSubmit} className="relative space-y-6">
        <div className="absolute -left-[2000px] top-0 h-px w-px overflow-hidden opacity-0" aria-hidden>
          <label htmlFor="booking-trap">Website</label>
          <input id="booking-trap" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">
              <User className="mr-2 inline h-4 w-4" />
              Full name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black/25 focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">
              <Mail className="mr-2 inline h-4 w-4" />
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black/25 focus:outline-none"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">
              <Calendar className="mr-2 inline h-4 w-4" />
              Preferred date
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-black/25 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">
              <Clock className="mr-2 inline h-4 w-4" />
              Preferred time
            </label>
            <select
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-black/25 focus:outline-none"
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            <MessageSquare className="mr-2 inline h-4 w-4" />
            Context (optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full resize-none rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black/25 focus:outline-none"
            placeholder="Agenda, stakeholders, or links"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3.5 text-sm font-semibold text-white transition-opacity hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send request
            </>
          )}
        </button>
      </form>
    </div>
  );
}
