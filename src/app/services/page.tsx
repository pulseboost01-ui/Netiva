import type { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Capabilities & Engagement",
  description:
    "Brand design, UI/UX, web development, CMS & architecture, and payments & financial integrations — how Netiva scopes, prices, and delivers engagements.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
