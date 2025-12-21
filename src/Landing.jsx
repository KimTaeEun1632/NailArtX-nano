import FeaturesSection from "./components/FeaturesSection.jsx";
import GallerySection from "./components/GallerySection.jsx";
import HowItWorksSection from "./components/HowItWorksSection ";
import HeroSection from "./components/HeroSection.jsx";
import CTASection from "./components/CTASection.jsx";
// ToDo: 랜딩페이지 컴포넌트 분리
// 회원가입, 로그인 기능, 갤러리 기능 추가

export default function Landing() {
  return (
    <div className="light font-display bg-background-light dark:bg-background-dark text-[#151118] dark:text-white antialiased selection:bg-primary/30 selection:text-primary-dark">
      <div className="relative flex min-h-screen w-full flex-col">
        <main className="grow">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <GallerySection />
          <CTASection />
        </main>
      </div>
    </div>
  );
}
