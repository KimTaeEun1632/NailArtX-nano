import { useState, useEffect, useRef } from "react";
import { NAIL_SPEC } from "../constants/nailSpec";
import { useLanguage } from "../contexts/LanguageContext";

const ShapeLengthSelector = ({ shape, setShape, length, setLength }) => {
  const { t } = useLanguage();
  const [uxMessage, setUxMessage] = useState("");
  const [showMainTooltip, setShowMainTooltip] = useState(false);
  const [activeShapeTooltip, setActiveShapeTooltip] = useState(null);
  const containerRef = useRef(null);

  // 외부 클릭 시 툴팁 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowMainTooltip(false);
        setActiveShapeTooltip(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleShapeSelect = (shapeKey) => {
    if (shape === shapeKey) {
      setShape(null);
      setLength(null);
      setUxMessage("");
      setActiveShapeTooltip(null);
      return;
    }

    const rule = NAIL_SPEC.shapes[shapeKey];
    setShape(shapeKey);
    setLength(rule.recommended);

    const recommendedLabel = t(NAIL_SPEC.lengths[rule.recommended].label);
    setUxMessage(
      t("generate.sidebar.nailSpec.uxMessage").replace(
        "{recommended}",
        recommendedLabel,
      ),
    );

    // 모바일 터치 대응
    setActiveShapeTooltip(activeShapeTooltip === shapeKey ? null : shapeKey);
  };

  return (
    <div ref={containerRef} className="space-y-4 relative z-[30]">
      {/* Nail Shape */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-visible relative z-[32]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {t("generate.sidebar.shape")}
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowMainTooltip(!showMainTooltip)}
              className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border transition-all
                ${
                  showMainTooltip
                    ? "bg-primary text-white border-primary"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-primary/10"
                }`}
            >
              ?
            </button>
            <div
              className={`absolute bottom-full right-0 mb-3 w-56 p-3 bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-xl transition-all z-100 shadow-2xl border border-white/10 leading-relaxed pointer-events-none
              ${showMainTooltip ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}`}
            >
              <p className="font-bold mb-1 text-primary">
                {t("generate.sidebar.tooltips.nailArch")}
              </p>
              {t("generate.sidebar.tooltips.shapeInfo")}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(NAIL_SPEC.shapes).map(([key, s]) => (
            <div key={key} className="relative">
              <button
                onClick={() => handleShapeSelect(key)}
                onMouseEnter={() => setActiveShapeTooltip(key)}
                onMouseLeave={() => setActiveShapeTooltip(null)}
                className={`w-full p-3 rounded-xl text-left transition-all border
                  ${
                    shape === key
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20 scale-[1.02] shadow-sm shadow-primary/10"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
              >
                <span
                  className={`text-[10px] font-black uppercase tracking-tight ${
                    shape === key
                      ? "text-primary"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {t(s.label)}
                </span>
              </button>

              {/* Shape Tooltip - Mobile/Hover Compatible */}
              <div
                className={`absolute bottom-full mb-3 w-40 p-2.5 bg-primary dark:bg-primary text-white text-[10px] font-medium rounded-lg transition-all z-[9999] shadow-xl pointer-events-none text-center leading-snug border border-white/20
                ${Object.keys(NAIL_SPEC.shapes).indexOf(key) % 2 === 0 ? "left-0" : "right-0"}
                ${activeShapeTooltip === key ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}`}
              >
                {t(`generate.sidebar.tooltips.shape.${key.toLowerCase()}`) ||
                  t(s.label)}
                <div className={`absolute top-full border-[6px] border-transparent border-t-primary ${Object.keys(NAIL_SPEC.shapes).indexOf(key) % 2 === 0 ? "left-6" : "right-6"}`} />
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
                      const recommendedLabel = t(
                        NAIL_SPEC.lengths[rule.recommended].label,
                      );
                      setUxMessage(
                        t("generate.sidebar.nailSpec.uxMessage").replace(
                          "{recommended}",
                          recommendedLabel,
                        ),
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
    </div>
  );
};

export default ShapeLengthSelector;
