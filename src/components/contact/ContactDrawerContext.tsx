"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DrawerContextValue = {
  contactOpen: boolean;
  quoteOpen: boolean;
  bookingOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  openQuote: () => void;
  closeQuote: () => void;
  openBooking: () => void;
  closeBooking: () => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

/** Contact + quote drawers are mutually exclusive; shared backdrop lock and Escape handling. */
export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const closeContact = useCallback(() => setContactOpen(false), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const openContact = useCallback(() => {
    setQuoteOpen(false);
    setBookingOpen(false);
    setContactOpen(true);
  }, []);

  const openQuote = useCallback(() => {
    setContactOpen(false);
    setBookingOpen(false);
    setQuoteOpen(true);
  }, []);

  const openBooking = useCallback(() => {
    setContactOpen(false);
    setQuoteOpen(false);
    setBookingOpen(true);
  }, []);

  const anyOpen = contactOpen || quoteOpen || bookingOpen;

  useEffect(() => {
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeContact();
        closeQuote();
        closeBooking();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyOpen, closeBooking, closeContact, closeQuote]);

  useEffect(() => {
    if (!anyOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [anyOpen]);

  const value = useMemo(
    () => ({
      contactOpen,
      quoteOpen,
      bookingOpen,
      openContact,
      closeContact,
      openQuote,
      closeQuote,
      openBooking,
      closeBooking,
    }),
    [contactOpen, quoteOpen, bookingOpen, openContact, closeContact, openQuote, closeQuote, openBooking, closeBooking],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useContactDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("useContactDrawer must be used within ContactDrawerProvider");
  }
  return {
    isOpen: ctx.contactOpen,
    open: ctx.openContact,
    close: ctx.closeContact,
    openBooking: ctx.openBooking,
  };
}

export function useBookingDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("useBookingDrawer must be used within ContactDrawerProvider");
  }
  return {
    isOpen: ctx.bookingOpen,
    open: ctx.openBooking,
    close: ctx.closeBooking,
  };
}

export function useQuoteDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("useQuoteDrawer must be used within ContactDrawerProvider");
  }
  return {
    isOpen: ctx.quoteOpen,
    open: ctx.openQuote,
    close: ctx.closeQuote,
  };
}
