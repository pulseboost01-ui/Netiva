"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

/** /contact opens the drawer and returns to home (LaunchFolio-style: contact is a panel, not a route). */
export default function ContactPage() {
  const { open } = useContactDrawer();
  const router = useRouter();

  useEffect(() => {
    open();
    router.replace("/");
  }, [open, router]);

  return <div className="min-h-[40vh] pt-32" aria-hidden />;
}
