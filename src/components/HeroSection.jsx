import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const [activeTheme, setActiveTheme] = useState("gradient");
  const [isAnimating, setIsAnimating] = useState(false);

  const themes = [
    {
      id: "gradient",
      label: "Gradient",
      color: "from-primary to-purple-400",
      img: "/gradient-34.jpeg",
    },
    {
      id: "marble",
      label: "Marble",
      color: "from-blue-400 to-indigo-500",
      img: "/marble-11.jpeg",
    },
    {
      id: "Santa",
      label: "Santa",
      color: "from-red-500 to-amber-500",
      img: "/santa-11.jpeg",
    },
    {
      id: "Cherry blossoms",
      label: "Cherry blossoms",
      color: "from-pink-400 to-rose-500",
      img: "/cherry-blossom.jpeg",
    },
  ];

  const handleThemeChange = (id) => {
    if (id === activeTheme) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTheme(id);
      setIsAnimating(false);
    }, 200);
  };

  const currentTheme = themes.find((t) => t.id === activeTheme);

  return (
    <section className="relative px-6 py-12 lg:px-20 lg:py-24 overflow-hidden bg-radial-[at_100%_10%] from-purple-200/30 via-transparent to-transparent dark:from-purple-900/20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="flex flex-col gap-6 lg:w-1/2 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mx-auto lg:mx-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="size-5"
            >
              <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight text-slate-900 dark:text-white transition-all duration-500">
            {t("hero.title1")}{" "}
            <span
              className={`text-transparent bg-clip-text bg-linear-to-r transition-all duration-700 ${currentTheme.color}`}
            >
              {t("hero.title2")}
            </span>
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-[500px] mx-auto lg:mx-0 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Interactive Feature: Prompt Simulator */}
          <div className="mt-4 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-primary/5 max-w-[480px] mx-auto lg:mx-0">
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                    ${
                      activeTheme === theme.id
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.05]"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              to="/generate"
              className="group relative inline-flex items-center h-14 px-10 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("hero.cta")}
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Interactive Hero Image Display */}
        <div className="lg:w-1/2 relative w-full aspect-square sm:aspect-video lg:aspect-square flex items-center justify-center">
          <div className="relative w-full max-w-[500px] h-full">
            {/* Main Featured Image */}
            <div
              className={`absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 transform
              ${isAnimating ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"}`}
            >
              <img
                className="w-full h-full object-cover"
                src={currentTheme.img}
                alt={`${currentTheme.label} nail art`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* UI Mockup Overlay */}
            <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl pointer-events-none hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-sm">
                    auto_fix_high
                  </span>
                </div>
                <div className="flex-1">
                  <div className="h-2 w-24 bg-white/40 rounded-full mb-2" />
                  <div className="h-1.5 w-40 bg-white/20 rounded-full" />
                </div>
                <div className="px-3 py-1 bg-primary/20 rounded-full">
                  <span className="text-[8px] font-bold text-white uppercase tracking-tighter">
                    AI Processing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
