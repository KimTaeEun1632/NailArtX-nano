import { useState } from "react";
import { NAIL_SPEC } from "../constants/nailSpec";
import { useLanguage } from "../contexts/LanguageContext";

const ShapeLengthSelector = ({ shape, setShape, length, setLength }) => {
  const { t } = useLanguage();
  const [uxMessage, setUxMessage] = useState("");

  const handleShapeSelect = (shapeKey) => {
    const rule = NAIL_SPEC.shapes[shapeKey];
    setShape(shapeKey);
    setLength(rule.recommended);
    
    const recommendedLabel = t(NAIL_SPEC.lengths[rule.recommended].label);
    setUxMessage(
      t("generate.sidebar.nailSpec.uxMessage").replace("{recommended}", recommendedLabel)
    );
  };

  return (
    <>
      {/* Nail Shape */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-visible">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {t("generate.sidebar.shape")}
          </h3>
          <div className="group relative">
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 w-5 h-5 rounded-full flex items-center justify-center cursor-help font-bold border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white transition-colors">?</span>
            <div className="absolute bottom-full right-0 mb-3 w-56 p-3 bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all z-[100] shadow-2xl border border-white/10 leading-relaxed pointer-events-none">
              <p className="font-bold mb-1 text-primary">{t("generate.sidebar.tooltips.nailArch")}</p>
              {t("generate.sidebar.tooltips.shapeInfo")}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(NAIL_SPEC.shapes).map(([key, s]) => (
            <div key={key} className="group/btn relative">
              <button
                onClick={() => handleShapeSelect(key)}
                className={`w-full p-3 rounded-xl text-left transition-all border
                  ${
                    shape === key
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20 scale-[1.02] shadow-sm shadow-primary/10"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
              >
                <span
                  className={`text-[10px] font-black uppercase tracking-tight ${
                    shape === key ? "text-primary" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {t(s.label)}
                </span>
              </button>

              {/* Shape Tooltip - Improved visibility */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 p-2.5 bg-primary dark:bg-primary text-white text-[10px] font-medium rounded-lg opacity-0 translate-y-2 invisible group-hover/btn:opacity-100 group-hover/btn:translate-y-0 group-hover/btn:visible transition-all z-[100] shadow-xl pointer-events-none text-center leading-snug border border-white/20">
                {t(`generate.sidebar.tooltips.shape.${key.toLowerCase()}`) || t(s.label)}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Nail Length */}
      {shape && (
        <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            {t("generate.sidebar.length")}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(NAIL_SPEC.lengths).map(([key, l]) => {
              const allowed = NAIL_SPEC.shapes[shape].allowed.includes(key);

              return (
                <button
                  key={key}
                  disabled={!allowed}
                  onClick={() => {
                    setLength(key);
                    const rule = NAIL_SPEC.shapes[shape];
                    if (key === rule.recommended) {
                      const recommendedLabel = t(NAIL_SPEC.lengths[rule.recommended].label);
                      setUxMessage(
                        t("generate.sidebar.nailSpec.uxMessage").replace("{recommended}", recommendedLabel)
                      );
                    } else {
                      setUxMessage("");
                    }
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all
                    ${
                      !allowed
                        ? "opacity-30 cursor-not-allowed"
                        : length === key
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:bg-primary/5"
                    }`}
                >
                  <div className="text-[11px] font-bold">{t(l.label)}</div>
                  <div className="text-[10px] text-slate-400">{l.mm}</div>
                </button>
              );
            })}
          </div>

          {uxMessage && (
            <p className="mt-3 text-[11px] text-primary font-medium">
              {uxMessage}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ShapeLengthSelector;
