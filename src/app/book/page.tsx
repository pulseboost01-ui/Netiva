"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingDrawer } from "@/components/contact/ContactDrawerContext";

/** `/book` opens the scheduling drawer (no standalone calendar page). */
export default function BookPage() {
  const { open } = useBookingDrawer();
  const router = useRouter();

  useEffect(() => {
    open();
    router.replace("/");
  }, [open, router]);

  return <div className="min-h-[40vh] pt-32" aria-hidden />;
}
