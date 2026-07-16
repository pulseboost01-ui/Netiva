import type { Metadata } from "next";
import TeamPageClient from "@/components/team/TeamPageClient";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind Netiva — a small core team spanning design, backend, and frontend engineering, based in Kampala, Uganda.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return <TeamPageClient />;
}
