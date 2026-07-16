import type { Metadata } from "next";
import HomeLanding from "@/components/home/HomeLanding";

export const metadata: Metadata = {
  title: "Netiva — Digital Alchemy Across Brand, UX & Code",
};

export default function HomePage() {
  return <HomeLanding />;
}
