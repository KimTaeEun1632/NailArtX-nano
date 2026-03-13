import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ComparisonSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-24 lg:px-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-[#151118] dark:text-white">
            {t("comparison.title")}
          </h2>
          <p className="text-lg text-[#4a454e] dark:text-gray-400 max-w-2xl mx-auto">
            {t("comparison.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Free Side */}
          <div className="group flex flex-col gap-6 p-4 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/pochacco-free.png"
                alt="Pochacco themed nail art design - Standard AI Model result"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold backdrop-blur-md">
                {t("comparison.freeLabel")}
              </div>
            </div>
            <div className="px-2">
              <h3 className="text-xl font-bold mb-2 dark:text-white">{t("comparison.freeLabel")}</h3>
              <p className="text-[#4a454e] dark:text-gray-400">
                {t("comparison.freeDesc")}
              </p>
            </div>
          </div>

          {/* Pro Side */}
          <div className="group flex flex-col gap-6 p-4 rounded-3xl bg-white dark:bg-white/5 border-2 border-primary/20 dark:border-primary/30 shadow-xl shadow-primary/5 transition-all hover:scale-[1.02]">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/pochacco-paid.jpg"
                alt="Pochacco themed nail art design - Premium AI Model result"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg">
                {t("comparison.proLabel")}
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="px-2">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold dark:text-white">{t("comparison.proLabel")}</h3>
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                  Highly Detailed
                </span>
              </div>
              <p className="text-[#4a454e] dark:text-gray-400">
                {t("comparison.proDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
