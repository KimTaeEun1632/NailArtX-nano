import { ART_STYLES } from "../constants/artStyles";
import { useLanguage } from "../contexts/LanguageContext";

const ArtStyleSelector = ({ artStyles, setArtStyles }) => {
  const { t } = useLanguage();
  const toggleStyle = (key) => {
    setArtStyles((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key],
    );
  };

  return (
    <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        {t("generate.sidebar.artTechniques")}
      </h3>

      <div className="flex flex-wrap gap-2">
        {Object.entries(ART_STYLES).map(([key, s]) => {
          const active = artStyles?.includes(key);

          return (
            <button
              key={key}
              onClick={() => toggleStyle(key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border
                ${
                  active
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-slate-100 dark:bg-surface-light-dark border-transparent hover:border-primary/20 hover:text-primary"
                }`}
            >
              {t(s.label)}
            </button>
          );
        })}
      </div>
      {artStyles.length >= 4 && (
        <p className="mt-2 text-[10px] text-amber-600 dark:text-amber-400">
          {t("generate.sidebar.artStylesList.warning")}
        </p>
      )}
    </div>
  );
};

export default ArtStyleSelector;
