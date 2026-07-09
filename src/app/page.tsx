import type { Metadata } from "next";
import HomeLanding from "@/components/home/HomeLanding";
import { siteConfig } from "@/data";

export const metadata: Metadata = {
  title: "Netiva — Full-stack web developer",
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return <HomeLanding />;
}
