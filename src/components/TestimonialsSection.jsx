import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const testimonials = t("testimonials.items");

  return (
    <section className="px-6 py-24 lg:px-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-[#151118] dark:text-white">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-[#4a454e] dark:text-gray-400 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(testimonials) && testimonials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-6 p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-[#151118] dark:text-white">{item.name}</h4>
                  <p className="text-sm text-[#7c6388] dark:text-gray-400">{item.role}</p>
                </div>
              </div>
              
              <div className="relative">
                <svg className="absolute -top-2 -left-2 w-8 h-8 text-primary/10" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v8h6v-8h-6zm12 0v8h6v-8h-6zM4 18v8h6v-8h-6zm12 0v8h6v-8h-6z" />
                </svg>
                <p className="text-[#4a454e] dark:text-gray-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
