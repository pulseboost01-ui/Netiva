import type { Metadata } from "next";
import WorkPageClient from "@/components/work/WorkPageClient";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Case studies from Netiva's live production work — a marketplace, a streaming platform, a school management system, and a counseling practice site.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
