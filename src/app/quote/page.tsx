import type { Metadata } from "next";
import QuoteRequestForm from "@/components/quote/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell us about your project — brand design, UI/UX, web development, CMS architecture, or payments integrations — and get a scoped response.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return <QuoteRequestForm variant="page" />;
}
