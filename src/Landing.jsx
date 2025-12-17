import { Link } from "react-router-dom";
import FeaturesSection from "./components/FeaturesSection.JSX";
import GallerySection from "./components/GallerySection.JSX";
import HowItWorksSection from "./components/HowItWorksSection ";
// ToDo: 랜딩페이지 컴포넌트 분리
export default function Landing() {
  return (
    <div className="light font-display bg-background-light dark:bg-background-dark text-[#151118] dark:text-white overflow-x-hidden antialiased selection:bg-primary/30 selection:text-primary-dark">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f3f0f4] dark:border-[#3a2a40] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-20 transition-colors">
          <div className="flex items-center gap-4">
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">brush</span>
            </div>
            <h2 className="text-xl font-bold">NailAI</h2>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-9">
              <a
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary"
              >
                How it works
              </a>
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </a>
              <a
                href="#gallery"
                className="text-sm font-medium hover:text-primary"
              >
                Gallery
              </a>
            </nav>
            <div className="flex gap-2">
              <Link
                to="/generate"
                className="flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark"
              >
                Start Designing
              </Link>
              <button className="flex items-center justify-center h-10 px-4 rounded-xl bg-[#f3f0f4] dark:bg-white/10 font-bold">
                Log In
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main className="grow">
          <section className="relative px-6 py-12 lg:px-20 lg:py-24 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent dark:from-purple-900/20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex flex-col gap-6 lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mx-auto lg:mx-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#b447eb"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>

                  <span className="text-xs font-bold uppercase">
                    AI-Powered Creativity
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-black leading-[1.1]">
                  Your Next Nail Art,{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400">
                    Imagined by AI.
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-[#4a454e] dark:text-gray-300 max-w-[600px] mx-auto lg:mx-0">
                  Generate unlimited, professional-quality nail art designs in
                  seconds.
                </p>

                <div className="mt-6">
                  <Link
                    to="/generate"
                    className="inline-flex items-center h-14 px-8 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark"
                  >
                    Start Designing Free
                  </Link>
                </div>
              </div>

              {/* Hero Images */}
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <img className="rounded-2xl" src="/hero1.jpg" />
                <img className="rounded-2xl" src="/hero1.jpg" />
                <img className="rounded-2xl" src="/hero1.jpg" />
                <img className="rounded-2xl" src="/hero1.jpg" />
              </div>
            </div>
          </section>

          <FeaturesSection />
          <HowItWorksSection />
          <GallerySection />

          {/* CTA */}
          <section className="px-6 py-20 lg:px-20 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto">
              <div className="rounded-3xl bg-background-dark dark:bg-surface-dark px-8 py-16 text-center text-white">
                <h2 className="text-3xl lg:text-5xl font-black">
                  Ready to wear art on your fingertips?
                </h2>
                <p className="text-gray-300 mt-4">
                  Join thousands using NailAI to create their next viral look.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/generate"
                    className="h-14 px-8 rounded-xl bg-primary font-bold flex items-center justify-center"
                  >
                    Start Designing Free
                  </Link>
                  <button className="h-14 px-8 rounded-xl bg-white/10 border border-white/20">
                    View Pricing
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#f3f0f4] dark:border-gray-800 px-6 py-12 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 font-bold">
              <span className="material-symbols-outlined text-primary">
                brush
              </span>
              NailAI
            </div>
            <div className="flex gap-8 text-sm text-[#7c6388] dark:text-gray-400">
              <a>Terms</a>
              <a>Privacy</a>
              <a>Support</a>
              <a>Instagram</a>
            </div>
            <div className="text-sm text-gray-500">© 2024 NailAI Inc.</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
