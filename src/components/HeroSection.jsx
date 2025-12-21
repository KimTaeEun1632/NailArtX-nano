import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative px-6 py-12 lg:px-20 lg:py-24 bg-radial-[at_100%_10%] from-purple-200 via-transparent to-transparent)  dark:from-purple-900/20">
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
        <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative z-10">
          <div className="space-y-4 pt-12">
            <div className="aspect-3/4 rounded-4xl overflow-hidden shadow-log transform transition hover:scale-[1.02]">
              <img className="w-full h-full object-cover" src="/그라34.jpeg" />
            </div>
            <div className="aspect-square rounded-4xl overflow-hidden shadow-log transform transition hover:scale-[1.02]">
              <img className="w-full h-full object-cover" src="/산타11.jpeg" />
            </div>
          </div>
          <div className="space-y-4">
            <img
              className="aspect-square rounded-4xl overflow-hidden shadow-log transform transition hover:scale-[1.02]"
              src="/대리석11.jpeg"
            />
            <img
              className="aspect-3/4 rounded-4xl overflow-hidden shadow-log transform transition hover:scale-[1.02]"
              src="/벚꽃34.jpeg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
