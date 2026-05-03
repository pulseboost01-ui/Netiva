"use client";

import { useCallback, useState } from "react";
import HeroProjectsBridge from "@/components/home/HeroProjectsBridge";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FeaturedQuoteSection from "@/components/sections/FeaturedQuoteSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import HomePricingSection from "@/components/sections/HomePricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import BlogSection from "@/components/sections/BlogSection";

/**
 * Owns hero → projects handoff: first three grid tiles stay visually hidden while
 * portaled flying cards slide into their anchors; then tiles appear.
 */
export default function HomeLanding() {
  const [handoffComplete, setHandoffComplete] = useState(false);

  /** Bidirectional: portal + deferred tiles track scroll — down completes handoff, up brings flying cards back. */
  const onHandoffProgress = useCallback((v: number) => {
    setHandoffComplete((prev) => {
      if (v >= 0.965) return true;
      if (v <= 0.8) return false;
      return prev;
    });
  }, []);

  return (
    <>
      <HeroProjectsBridge
        onHandoffProgress={onHandoffProgress}
        handoffTilesRevealed={handoffComplete}
      />
      <div className="mx-auto w-full max-w-6xl border-x border-neutral-300/90">
        <ProjectsSection suppressFirstThreeUntilHandoff={!handoffComplete} />
        <FeaturedQuoteSection />
        <ServicesSection />
        <AboutSection />
        <HomePricingSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </div>
    </>
  );
}
