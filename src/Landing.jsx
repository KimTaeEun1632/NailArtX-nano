import FeaturesSection from "./components/FeaturesSection.jsx";
import GallerySection from "./components/GallerySection.jsx";
import HowItWorksSection from "./components/HowItWorksSection.jsx";
import HeroSection from "./components/HeroSection.jsx";
import CTASection from "./components/CTASection.jsx";
import ComparisonSection from "./components/ComparisonSection.jsx";
import PricingSection from "./components/PricingSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";

export default function Landing() {
  return (
    <div className="light font-display bg-background-light dark:bg-background-dark text-[#151118] dark:text-white antialiased selection:bg-primary/30 selection:text-primary-dark">
      <div className="relative flex min-h-screen w-full flex-col">
        <main className="grow">
          <HeroSection />
          <FeaturesSection />
          <ComparisonSection />
          <HowItWorksSection />
          <GallerySection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </main>
      </div>
    </div>
  );
}
