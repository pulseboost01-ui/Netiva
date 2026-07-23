import HeroSection from "@/components/sections/HeroSection";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ClientTestimonialsSection from "@/components/sections/ClientTestimonialsSection";
import CTASection from "@/components/sections/CTASection";

/**
 * Homepage. CLAUDE.md §4 mandates six sections including a "Services" section — removed here
 * by explicit instruction (2026-07-23), overriding §4. ServicesSection.tsx is unused but kept
 * in place (not deleted) in case it's wanted again; its 4-discipline content still lives on
 * /services. AboutSection is an explicit 7th-section addition (also 2026-07-23), copy rewritten
 * to drop the §1B-forbidden "signal"/"output log" phrasing and its stock Unsplash image swapped
 * for a real product screenshot per §3. FAQSection/BlogSection remain off the homepage; their
 * content is still live on /work and /blog respectively.
 */
export default function HomeLanding() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl border-x border-black/6">
        <HeroSection />
        <SelectedWorkSection />
        <AboutSection />
        <TestimonialsSection />
        <ClientTestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
