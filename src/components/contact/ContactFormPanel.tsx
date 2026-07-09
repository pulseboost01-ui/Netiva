"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Calendar,
  Send,
  Check,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import InquiryDeliveryActions from "@/components/inquiry/InquiryDeliveryActions";
import { siteConfig, budgetRanges } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import { isContentPlaceholder, isValidExternalUrl } from "@/lib/content";

const socialIconMap = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
} as const;

const socialIcons = Object.entries(siteConfig.socials)
  .filter(([, href]) => isValidExternalUrl(href))
  .map(([key, href]) => ({
    icon: socialIconMap[key as keyof typeof socialIconMap] ?? Github,
    href,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

type Variant = "page" | "drawer";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-neutral-50 border border-border text-foreground text-sm placeholder-neutral-400 focus:outline-none focus:border-black/25 transition-colors";

const drawerFieldClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10";

const drawerLabelClass = "block text-sm font-medium text-neutral-800";

export default function ContactFormPanel({ variant = "page" }: { variant?: Variant }) {
  const { openBooking } = useContactDrawer();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
  });
  const [botTrap, setBotTrap] = useState("");
  const [delivery, setDelivery] = useState<{ whatsAppUrl: string; emailSent: boolean } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const contactWhatsAppIntro = `https://wa.me/${siteConfig.phone.whatsappDigits}?text=${encodeURIComponent(
    `Hello Netiva — I want to brief you on an upcoming initiative.`,
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          honeypot: botTrap,
          variant,
          name: formState.name.trim(),
          email: formState.email.trim(),
          company: formState.company.trim() || undefined,
          message: formState.message.trim(),
          budgetId: formState.budget || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        whatsAppUrl?: string;
        emailSent?: boolean;
      };

      if (!res.ok || !data.ok || !data.whatsAppUrl) {
        throw new Error(data.error || "We could not relay that message.");
      }

      setDelivery({ whatsAppUrl: data.whatsAppUrl, emailSent: !!data.emailSent });
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const formCard = (
    <div className="p-6 md:p-8 rounded-2xl bg-[var(--muted)] border border-border">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-14 h-14 rounded-full bg-[var(--accent)]/25 border border-border flex items-center justify-center mb-4"
            >
              <Check size={22} className="text-foreground" />
            </motion.div>
            <h3 className="font-display mb-2 text-xl text-foreground">
              Routed to my inbox
            </h3>
            <p className="mx-auto max-w-sm text-muted-foreground text-sm">
              Your briefing landed—mirror it on WhatsApp for faster async, or book a time from our schedule page.
            </p>
            {delivery ? (
              <InquiryDeliveryActions
                whatsAppUrl={delivery.whatsAppUrl}
                emailDelivered={delivery.emailSent}
              />
            ) : null}
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="relative space-y-4">
            <div className="absolute -left-[2000px] top-0 h-px w-px overflow-hidden opacity-0" aria-hidden>
              <label htmlFor="contact-trap-page">Company site</label>
              <input
                id="contact-trap-page"
                tabIndex={-1}
                autoComplete="off"
                value={botTrap}
                onChange={(e) => setBotTrap(e.target.value)}
              />
            </div>
            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-900">{error}</p>
            ) : null}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Company</label>
              <input
                type="text"
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                placeholder="Acme Corp"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Message *</label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tell me about your project, goals, and timeline..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01, backgroundColor: "#b8d600" } : {}}
              whileTap={!loading ? { scale: 0.99 } : {}}
              className="w-full py-4 bg-[var(--accent)] text-foreground font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <Send size={15} />
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-muted-foreground">I typically respond within 24 hours</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );

  if (variant === "drawer") {
    return (
      <div className="font-sans text-foreground">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-14 text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
                <Check size={24} className="text-foreground" strokeWidth={2} />
              </div>
              <p className="text-lg font-semibold text-foreground">Thanks — routed to my inbox.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                I typically respond within one business day. Continue on WhatsApp for quick context or schedule a call if that works better.
              </p>
              {delivery ? (
                <InquiryDeliveryActions
                  whatsAppUrl={delivery.whatsAppUrl}
                  emailDelivered={delivery.emailSent}
                />
              ) : null}
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
              <h2
                id="contact-drawer-title"
                className="pr-10 text-[1.625rem] font-bold leading-tight tracking-tight text-neutral-950"
              >
                Start a conversation
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Drop the brief below,{" "}
                <a
                  href={contactWhatsAppIntro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-neutral-950 underline underline-offset-2 decoration-neutral-400 hover:decoration-neutral-950"
                >
                  open WhatsApp
                </a>
                , or{" "}
                <button
                  onClick={() => openBooking()}
                  className="font-semibold text-neutral-950 underline underline-offset-2 decoration-neutral-400 hover:decoration-neutral-950"
                >
                  schedule a call
                </button>
                .
              </p>

              <div className="mt-8 flex items-center gap-3">
                {isContentPlaceholder(siteConfig.avatar) ? (
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-sm font-semibold text-muted-foreground"
                    aria-hidden
                  >
                    N
                  </div>
                ) : (
                  <Image
                    src={siteConfig.avatar}
                    alt={siteConfig.name}
                    width={48}
                    height={48}
                    className="shrink-0 rounded-full border border-neutral-200 object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-neutral-950">{siteConfig.name}</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-muted-foreground underline-offset-2 hover:text-neutral-950 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                  <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <a className="hover:text-neutral-950" href={`tel:${siteConfig.phone.tel}`}>
                      {siteConfig.phone.display}
                    </a>
                    <span aria-hidden>·</span>
                    <a
                      href={contactWhatsAppIntro}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-950"
                    >
                      WA
                    </a>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="relative mt-10 space-y-5">
                <div className="absolute -left-[2000px] top-0 h-px w-px overflow-hidden opacity-0" aria-hidden>
                  <label htmlFor="contact-trap-drawer">Trap</label>
                  <input
                    id="contact-trap-drawer"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botTrap}
                    onChange={(e) => setBotTrap(e.target.value)}
                  />
                </div>
                {error ? (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-900">{error}</p>
                ) : null}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="drawer-name" className={`${drawerLabelClass} mb-1.5`}>
                      Name
                    </label>
                    <input
                      id="drawer-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Name"
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={drawerFieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="drawer-email" className={`${drawerLabelClass} mb-1.5`}>
                      Email
                    </label>
                    <input
                      id="drawer-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={drawerFieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="drawer-message" className={`${drawerLabelClass} mb-1.5`}>
                    Send a message or describe your project
                  </label>
                  <textarea
                    id="drawer-message"
                    name="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder=" "
                    className={`${drawerFieldClass} min-h-[140px] resize-y`}
                  />
                </div>

                <div>
                  <label htmlFor="drawer-budget" className={`${drawerLabelClass} mb-1.5`}>
                    What&apos;s your budget?
                  </label>
                  <div className="relative">
                    <select
                      id="drawer-budget"
                      name="budget"
                      required
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className={`${drawerFieldClass} cursor-pointer appearance-none pr-10 ${formState.budget ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      {budgetRanges.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-dim"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 w-full rounded-full bg-neutral-950 py-[0.9rem] text-[15px] font-medium text-white transition-opacity hover:bg-neutral-800 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.95, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="pt-6 text-[13px] leading-relaxed text-muted-foreground">
                  By submitting this form, you acknowledge the{" "}
                  <Link
                    href={siteConfig.privacyPolicyHref}
                    className="font-semibold text-neutral-700 underline underline-offset-2 hover:text-neutral-950"
                  >
                    Privacy Policy
                  </Link>
                  {" "}and{" "}
                  <Link
                    href={siteConfig.termsHref}
                    className="font-semibold text-neutral-700 underline underline-offset-2 hover:text-neutral-950"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-16 items-start">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Contact</p>
        <h1 className="mb-6 text-5xl text-foreground md:text-6xl">
          Let&apos;s build
          <br />
          <em>something great</em>
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-sm">
          Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within
          24 hours.
        </p>

        <div className="space-y-4 mb-10">
          {[
            { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
            {
              icon: Phone,
              label: "Voice / GSM",
              value: siteConfig.phone.display,
              href: `tel:${siteConfig.phone.tel}`,
            },
            {
              icon: MessageCircle,
              label: "WhatsApp desk",
              value: siteConfig.phone.display,
              href: contactWhatsAppIntro,
              external: true,
            },
            {
              icon: Calendar,
              label: "Scheduling",
              value: "View availability",
              onClick: () => openBooking(),
            },
            { icon: MapPin, label: "Location", value: siteConfig.location, href: undefined },
            { icon: Clock, label: "Response time", value: "Within one business day", href: undefined },
          ].map(({ icon: Icon, label, value, href, onClick, external = false }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-border flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                {onClick ? (
                  <button
                    onClick={onClick}
                    className="text-sm text-neutral-700 hover:text-foreground transition-colors"
                  >
                    {value}
                  </button>
                ) : href ? (
                  external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-700 hover:text-foreground transition-colors"
                    >
                      {value}
                    </a>
                  ) : href.startsWith("/") ? (
                    <Link href={href} className="text-sm text-neutral-700 hover:text-foreground transition-colors">
                      {value}
                    </Link>
                  ) : (
                    <a href={href} className="text-sm text-neutral-700 hover:text-foreground transition-colors">
                      {value}
                    </a>
                  )
                ) : (
                  <p className="text-sm text-neutral-700">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {socialIcons.length > 0 ? (
          <>
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Follow along</p>
            <div className="flex items-center gap-2">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-black/20 hover:text-foreground"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </>
        ) : null}
      </div>
      {formCard}
    </div>
  );
}
