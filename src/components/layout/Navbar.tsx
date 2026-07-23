"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig, isContactDrawerLink, isBookingDrawerLink } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import { Menu, X, MoreHorizontal } from "lucide-react";

const SCROLL_TOP_EXPAND_PX = 56;
const SCROLL_DIRECTION_THRESHOLD = 2;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compactMenuOpen, setCompactMenuOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { open: openContact, openBooking } = useContactDrawer();

  const pageLinks = navLinks.filter((l) => !isContactDrawerLink(l) && !isBookingDrawerLink(l));
  const contactLink = navLinks.find(isContactDrawerLink);
  const bookingLink = navLinks.find(isBookingDrawerLink);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsMdUp(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setCompactNav(false);
    setCompactMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= SCROLL_TOP_EXPAND_PX) {
        setCompactNav(false);
        lastScrollY.current = y;
        return;
      }
      const delta = y - lastScrollY.current;
      if (delta > SCROLL_DIRECTION_THRESHOLD) setCompactNav(true);
      else if (delta < -SCROLL_DIRECTION_THRESHOLD) setCompactNav(false);
      lastScrollY.current = y;
    };
    lastScrollY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCompactMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const locked = mobileOpen || compactMenuOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, compactMenuOpen]);

  const showExpandedDesktop = isMdUp && !compactNav;
  const showCompactDesktopMenu = isMdUp && compactNav && compactMenuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-4 print:hidden md:pt-5"
      >
        <nav
          className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full border border-neutral-200/90 bg-white/95 py-1.5 pl-2 pr-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.14)] backdrop-blur-xl md:gap-0.5 md:pl-2 md:pr-2"
          aria-label="Main"
        >
          <Link
            href="/"
            className="flex shrink-0 flex-col justify-center rounded-full py-1 pl-1 pr-2 md:pl-2 md:pr-4"
          >
            <span className="font-mono text-[12px] font-bold tracking-[0.45em] text-neutral-950">
              {siteConfig.name.toUpperCase()}
            </span>
          </Link>

          {showExpandedDesktop && (
            <div className="mx-1 flex items-center md:mx-2">
              {pageLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" &&
                    !link.href.includes("#") &&
                    pathname.startsWith(link.href));
                const isHash = link.href.includes("#");
                const isServicesPricing = link.href === "/services#pricing";
                const hashActive =
                  isHash &&
                  isServicesPricing &&
                  pathname === "/services";
                return (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`block rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        isActive || hashActive ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {showExpandedDesktop && bookingLink && (
            <button
              type="button"
              onClick={() => openBooking()}
              className="ml-1 shrink-0 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
            >
              {bookingLink.label}
            </button>
          )}

          {showExpandedDesktop && contactLink && (
            <button
              type="button"
              onClick={() => openContact()}
              className="ml-1 shrink-0 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
            >
              {contactLink.label}
            </button>
          )}

          {isMdUp && compactNav && (
            <button
              type="button"
              onClick={() => setCompactMenuOpen((o) => !o)}
              className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
              aria-label={compactMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={compactMenuOpen}
            >
              {compactMenuOpen ? <X size={18} /> : <MoreHorizontal size={18} />}
            </button>
          )}

          {!isMdUp && (
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="ml-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-black/[0.04]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </nav>
      </motion.header>

      <AnimatePresence>
        {showCompactDesktopMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[4.25rem] z-40 w-[min(calc(100vw-1.5rem),20rem)] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white/98 py-2 shadow-xl backdrop-blur-xl"
          >
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setCompactMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-black/[0.03] hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
            {bookingLink && (
              <button
                type="button"
                onClick={() => {
                  setCompactMenuOpen(false);
                  openBooking();
                }}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-neutral-900 hover:bg-black/[0.03]"
              >
                {bookingLink.label}
              </button>
            )}
            {contactLink && (
              <button
                type="button"
                onClick={() => {
                  setCompactMenuOpen(false);
                  openContact();
                }}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-neutral-900 hover:bg-black/[0.03]"
              >
                {contactLink.label}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCompactDesktopMenu && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Dismiss menu"
            className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[2px]"
            onClick={() => setCompactMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--background)]/96 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.06, duration: 0.35 }}
              className="flex h-full flex-col items-center justify-center gap-5 px-6"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                >
                  {isContactDrawerLink(link) ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openContact();
                      }}
                      className="font-display text-3xl font-light text-neutral-700 transition-colors hover:text-neutral-900"
                    >
                      {link.label}
                    </button>
                  ) : isBookingDrawerLink(link) ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openBooking();
                      }}
                      className="font-display text-3xl font-light text-neutral-700 transition-colors hover:text-neutral-900"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl font-light text-neutral-700 transition-colors hover:text-neutral-900"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                onClick={() => {
                  setMobileOpen(false);
                  openContact();
                }}
                className="mt-2 rounded-full bg-accent px-8 py-3 text-base font-semibold text-white"
              >
                Message us
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
