"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import InquiryDeliveryActions from "@/components/inquiry/InquiryDeliveryActions";
import { quoteServices, budgetRanges, siteConfig } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

const steps = ["Services", "Budget", "Details", "Done"];

type Variant = "page" | "drawer";

export default function QuoteRequestForm({
  variant = "page",
  onClose,
}: {
  variant?: Variant;
  /** Drawer: optional close after success (e.g. parent drawer). */
  onClose?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    timeline: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [delivery, setDelivery] = useState<{ whatsAppUrl: string; emailSent: boolean } | null>(null);
  const [quoteTrap, setQuoteTrap] = useState("");
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isDrawer = variant === "drawer";

  const toggleService = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    setQuoteError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          honeypot: quoteTrap,
          selectedServices: selected,
          budgetId: budget,
          details,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        whatsAppUrl?: string;
        emailSent?: boolean;
      };
      if (!res.ok || !data.ok || !data.whatsAppUrl) {
        throw new Error(data.error || "Submission failed.");
      }
      setDelivery({ whatsAppUrl: data.whatsAppUrl, emailSent: !!data.emailSent });
      setSubmitted(true);
    } catch (e) {
      setQuoteError(e instanceof Error ? e.message : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    if (isDrawer) {
      return (
        <div className="py-6 text-center font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
              <Check size={26} className="text-neutral-900" strokeWidth={2} />
            </div>
            <h2 id="quote-drawer-title" className="text-lg font-semibold text-neutral-950">
              Quote request received
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Thanks {details.name}! You&apos;ll hear from {siteConfig.email} with a phased quote—usually within two business
              days.
            </p>
            {delivery ? (
              <InquiryDeliveryActions
                whatsAppUrl={delivery.whatsAppUrl}
                emailDelivered={delivery.emailSent}
              />
            ) : null}
            <button
              type="button"
              onClick={() => onClose?.()}
              className="mt-6 w-full rounded-full bg-neutral-950 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Done
            </button>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center mx-auto mb-6"
          >
            <Check size={32} className="text-[var(--accent)]" />
          </motion.div>
          <h1 className="text-4xl text-neutral-900 mb-4">Quote request received!</h1>
          <p className="text-neutral-600 text-base leading-relaxed mb-6">
            Thanks {details.name}! We&apos;ll review the brief collectively and reply with pricing + phased roll-out within two
            business days to {details.email}.
          </p>
          {delivery ? (
            <InquiryDeliveryActions
              whatsAppUrl={delivery.whatsAppUrl}
              emailDelivered={delivery.emailSent}
            />
          ) : null}
          <div className="mt-8 p-5 rounded-2xl bg-[var(--card)] border border-black/5 text-left">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">What happens next</p>
            {[
              "Producers distill requirements + constraints",
              "You receive phased scope & pricing dossier",
              "Alignment call locks timeline + dependencies",
              "Engagement activates on signed agreement",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-black/5 last:border-0">
                <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold text-[var(--accent)]">{i + 1}</span>
                </div>
                <p className="text-sm text-neutral-600">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  const formCard = (
    <div className={`${isDrawer ? "font-sans" : "p-7 rounded-2xl bg-[var(--card)] border border-black/5"} relative`}>
      <div className="pointer-events-none absolute -left-[900px] top-0 h-px w-px overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="quote-hp">Trap</label>
        <input
          id="quote-hp"
          tabIndex={-1}
          autoComplete="off"
          value={quoteTrap}
          onChange={(e) => setQuoteTrap(e.target.value)}
        />
      </div>
      {quoteError ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-900">{quoteError}</p>
      ) : null}
      {!isDrawer ? null : (
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Get a Quote</p>
          <h2 id="quote-drawer-title" className="mt-2 text-xl font-bold tracking-tight text-neutral-950">
            Your project
          </h2>
          <p className="mt-1 text-sm text-neutral-600">Step {step + 1} of 3 — personalised quote in 48 hours.</p>
        </div>
      )}

      {!isDrawer ? null : (
        <div className="mb-6 flex items-center gap-1.5">
          {steps.slice(0, 3).map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${
                  i < step
                    ? "bg-accent text-white"
                    : i === step
                      ? "border border-neutral-300 bg-white text-neutral-900"
                      : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {i < step ? <Check size={10} strokeWidth={3} /> : i + 1}
              </div>
              {i < 2 && <div className="h-px w-4 bg-neutral-200" />}
            </div>
          ))}
        </div>
      )}

      <div className={isDrawer ? "pb-24" : ""}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="services"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mb-1 text-lg text-neutral-900 font-display">What do you need?</h2>
            <p className="mb-4 text-sm text-neutral-500">Select all that apply.</p>
            <div className={`grid gap-2.5 ${isDrawer ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2"}`}>
              {quoteServices.map((service) => {
                const isSelected = selected.includes(service.id);
                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition-all ${
                      isSelected
                        ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.06] text-neutral-900"
                        : "border-black/8 bg-white/[0.02] text-neutral-500 hover:border-black/15 hover:text-neutral-700"
                    }`}
                  >
                    {service.label}
                    {isSelected && <Check size={14} className="text-[var(--accent)]" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mb-1 text-lg text-neutral-900 font-display">What&apos;s your budget?</h2>
            <p className="mb-4 text-sm text-neutral-500">This helps us tailor our proposal.</p>
            <div className="space-y-2.5">
              {budgetRanges.map((range) => (
                <motion.button
                  key={range.id}
                  type="button"
                  onClick={() => setBudget(range.id)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${
                    budget === range.id
                      ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.06] text-neutral-900"
                      : "border-black/8 bg-white/[0.02] text-neutral-500 hover:border-black/15 hover:text-neutral-700"
                  }`}
                >
                  {range.label}
                  {budget === range.id && <Check size={14} className="text-[var(--accent)]" />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div>
              <h2 className="mb-1 text-lg text-neutral-900 font-display">Project details</h2>
              <p className="mb-4 text-sm text-neutral-500">Almost done.</p>
            </div>
            {[
              { key: "name", label: "Your name", placeholder: "John Doe", type: "text" },
              { key: "email", label: "Email", placeholder: "john@company.com", type: "email" },
              { key: "company", label: "Company (optional)", placeholder: "Acme Corp", type: "text" },
              { key: "timeline", label: "Ideal timeline", placeholder: "e.g. Start ASAP, 6 weeks", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-sm font-medium text-neutral-800">{field.label}</label>
                <input
                  type={field.type}
                  value={details[field.key as keyof typeof details]}
                  onChange={(e) => setDetails({ ...details, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
                />
              </div>
            ))}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-800">Project description</label>
              <textarea
                rows={isDrawer ? 3 : 4}
                value={details.description}
                onChange={(e) => setDetails({ ...details, description: e.target.value })}
                placeholder="Goals, requirements, links…"
                className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <div
        className={`mt-6 flex items-center justify-between border-t border-black/5 bg-white pt-5 ${
          isDrawer ? "sticky bottom-0 -mx-6 px-6 pb-1" : "mt-7 pt-6"
        }`}
      >
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-700 disabled:opacity-0"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {step < 2 ? (
          <motion.button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 0 ? selected.length === 0 : !budget}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
            <ChevronRight size={16} />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!details.name || !details.email || loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.95, repeat: Infinity, ease: "linear" }}
                  className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                />
                Sending…
              </>
            ) : (
              "Submit quote request"
            )}
          </motion.button>
        )}
      </div>
    </div>
  );

  if (isDrawer) {
    return formCard;
  }

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-6">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-3">Get a Quote</p>
        <h1 className="text-4xl md:text-5xl text-neutral-900 mb-4">
          Tell me about
          <br />
          <em>your project</em>
        </h1>
        <p className="text-neutral-600 text-sm mb-10">
          Fill out the details below and we&apos;ll send a personalised quote within 48 hours.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all ${
                  i < step
                    ? "bg-[var(--accent)] text-black"
                    : i === step
                      ? "border border-black/20 bg-black/5 text-neutral-900"
                      : "bg-black/5 text-neutral-400"
                }`}
              >
                {i < step ? <Check size={12} /> : i + 1}
              </div>
              <span className={`text-xs ${i === step ? "text-neutral-700" : "text-neutral-400"}`}>{s}</span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-black/5" />}
            </div>
          ))}
        </div>
      </FadeIn>

      {formCard}
    </div>
  );
}
