"use client";

import HeroProjectsBridge from "@/components/home/HeroProjectsBridge";
import StatsStrip from "@/components/sections/StatsStrip";
import CaseStudyShowcase from "@/components/sections/CaseStudyShowcase";
import FeaturedQuoteSection from "@/components/sections/FeaturedQuoteSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import HomePricingSection from "@/components/sections/HomePricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import EdtechSection from "@/components/sections/EdtechSection";
import FAQSection from "@/components/sections/FAQSection";
import BlogSection from "@/components/sections/BlogSection";

export default function HomeLanding() {
  return (
    <>
      <HeroProjectsBridge />
      <div className="mx-auto w-full max-w-7xl border-x border-border">
        <StatsStrip />
        <CaseStudyShowcase />
        <FeaturedQuoteSection />
        <ServicesSection />
        <AboutSection />
        <EdtechSection />
        <HomePricingSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </div>
    </>
  );
}
