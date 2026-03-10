import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-24 lg:px-20 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="rounded-[3rem] bg-background-dark dark:bg-surface-dark px-8 py-20 text-center text-white relative overflow-hidden group shadow-2xl">
          {/* Internal Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Join the future of fashion
            </div>

            <h2 className="text-4xl lg:text-6xl font-black leading-tight">
              {t("cta.title")}
            </h2>
            <p className="text-gray-400 mt-6 text-lg lg:text-xl">
              {t("cta.subtitle")}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/generate"
                className="h-16 px-10 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center hover:bg-primary-dark hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
