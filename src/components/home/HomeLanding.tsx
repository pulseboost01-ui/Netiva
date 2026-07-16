import HeroSection from "@/components/sections/HeroSection";
import WorkCategoriesSection from "@/components/sections/WorkCategoriesSection";
import FeaturedQuoteSection from "@/components/sections/FeaturedQuoteSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ClientTestimonialsSection from "@/components/sections/ClientTestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import BlogSection from "@/components/sections/BlogSection";

export default function HomeLanding() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl border-x border-neutral-300/90">
        <HeroSection />
        <WorkCategoriesSection />
        <FeaturedQuoteSection />
        <AboutSection />
        <TestimonialsSection />
        <ClientTestimonialsSection />
        <FAQSection />
        <BlogSection />
      </div>
    </>
  );
}
