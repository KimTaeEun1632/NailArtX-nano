import FeaturesIcon from "./FeaturesIcons";
import { useLanguage } from "../contexts/LanguageContext";

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = t("features.items");

  return (
    <section
      id="features"
      className="px-6 py-20 lg:px-20 bg-white dark:bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center max-w-[720px] mx-auto">
          <h2 className="text-[#151118] dark:text-white text-3xl lg:text-4xl font-bold mb-4">
            {t("features.title")}
          </h2>
          <p className="text-[#4a454e] dark:text-gray-300 text-lg">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(features) && features.map(({ title, desc }, index) => (
            <div
              key={title}
              className="
                group flex flex-col gap-5 p-8 rounded-2xl
                bg-background-light dark:bg-[#121212]
                border border-[#f3f0f4] dark:border-gray-600
                hover:border-primary/30
                transition-all
              "
            >
              {/* Icon Box */}
              <div
                className="
                  w-14 h-14 flex items-center justify-center rounded-3xl
                  bg-white dark:bg-white/10
                  text-primary
                  group-hover:bg-primary
                  transition-colors shadow-sm
                "
              >
                <FeaturesIcon
                  name={ICON_LIST[index]}
                  className="
                    w-6 h-6
                    text-primary
                    group-hover:text-white
                    transition-colors duration-300
                  "
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[#151118] dark:text-white text-xl font-bold mb-2">
                  {title}
                </h3>
                <p className="text-[#7c6388] dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ICON_LIST = ["blot", "fingerprint", "camera"];
