import test1 from "/step1.png";
import step3 from "/겨울 하운트 체크 네일.jpg";
import CheckIcon from "../assets/icons/check.svg?react";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="px-6 py-20 lg:px-20 bg-background-light dark:bg-background-dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[#151118] dark:text-white text-3xl lg:text-4xl font-bold mb-4">
              From Idea to Reality
            </h2>
            <p className="text-[#4a454e] dark:text-gray-300 text-lg">
              Three simple steps to your dream manicure. No artistic skills
              required.
            </p>
          </div>

          <p className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Start Tutorial
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          <Step
            step="1"
            title="Input your idea"
            desc="Describe the colors, patterns, texture, or style you want to see."
            example="“Blue marble with gold flakes”"
            img={test1}
          />

          <Step
            step="2"
            title="AI Generation"
            desc="Our AI instantly creates multiple high-fidelity design variations."
            isMiddle
          />

          <Step
            step="3"
            title="Save & Replicate"
            desc="Download the reference and show it to your nail artist."
            success
          />
        </div>
      </div>
    </section>
  );
}

function Step({ step, title, desc, example, isMiddle, success, img }) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      {isMiddle && (
        <div className="hidden md:block absolute top-[120px] -left-1/2 w-full h-0.5 bg-linear-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      )}

      {/* Card */}
      <div className="w-full aspect-video bg-white dark:bg-surface-dark rounded-2xl mb-6 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center relative">
        <div className="absolute inset-0 bg-linear-to-tr from-purple-50 to-pink-50 dark:from-surface-dark dark:to-surface-dark opacity-25" />

        {example && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-mono border border-gray-200 shadow-sm text-gray-800">
            {example}
          </div>
        )}

        {isMiddle && (
          <div className="grid grid-cols-2 gap-2 w-3/4">
            <div className="aspect-square bg-gray-200 rounded animate-pulse" />
            <div className="aspect-square bg-gray-200 rounded animate-pulse delay-75" />
            <div className="aspect-square bg-gray-200 rounded animate-pulse delay-100" />
            <div className="aspect-square bg-gray-200 rounded animate-pulse delay-150" />
            <div className="bg-primary text-white p-3 rounded-full shadow-lg animate-bounce absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
            </div>
          </div>
        )}

        {success && (
          <div>
            <img src={step3} alt="Save & Replicate" />
            <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full shadow-md">
              <CheckIcon />
            </div>
          </div>
        )}

        {img && <img src={img} alt="step one Input your idea" />}
      </div>

      {/* Step Number */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3 bg-primary/10 text-primary">
        {step}
      </div>

      {/* Text */}
      <h3 className="text-lg font-bold text-[#151118] dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#7c6388] dark:text-gray-400 max-w-xs">
        {desc}
      </p>
    </div>
  );
}
