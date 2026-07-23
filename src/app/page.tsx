import type { Metadata } from "next";
import HomeLanding from "@/components/home/HomeLanding";

export const metadata: Metadata = {
  title: "Netiva — Web Apps & Mobile Money Integrations",
};

export default function HomePage() {
  return <HomeLanding />;
}
