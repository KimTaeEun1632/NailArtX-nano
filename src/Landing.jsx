import FeaturesSection from "./components/FeaturesSection.jsx";
import GallerySection from "./components/GallerySection.jsx";
import HowItWorksSection from "./components/HowItWorksSection ";
import HeroSection from "./components/HeroSection.jsx";
import CTASection from "./components/CTASection.jsx";
// ToDo
// 회원가입, 로그인 기능, 갤러리 기능 추가

// 색, 팁 길이, 팁 모양 등 버튼을 추가하여 세밀한 작업할 수 있도록 Technical button 추가  (완료)
// Generate.jsx → 상태 + API (완료)
// 하위 컴포넌트 → UI + 이벤트 전달 (완료)

// 모바일 버전 css 수정

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
