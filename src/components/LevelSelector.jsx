import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LevelSelector = ({ level, setLevel }) => {
  const { t } = useLanguage();
  const [showMainTooltip, setShowMainTooltip] = useState(false);
  const [activeBtnTooltip, setActiveBtnTooltip] = useState(null);
  const containerRef = useRef(null);

  // 외부 클릭 시 툴팁 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowMainTooltip(false);
        setActiveBtnTooltip(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const levels = [
    { id: "beginner", label: "Beginner" },
    { id: "salon", label: "Salon" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-visible"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          {t("generate.sidebar.level")}
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

          {/* 메인 툴팁 - 클릭/터치 대응 */}
          <div
            className={`absolute bottom-full right-0 mb-3 w-56 p-3 bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-xl transition-all z-100 shadow-2xl border border-white/10 leading-relaxed pointer-events-none
             ${showMainTooltip ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}`}
          >
            <p className="font-bold mb-1 text-primary">
              {t("generate.sidebar.tooltips.proTip")}
            </p>
            {t("generate.sidebar.tooltips.levelInfo")}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {levels.map((l, index) => (
          <div key={l.id} className="relative flex-1 z-50">
            <button
              onClick={() => {
                if (level === l.id) {
                  setLevel(null);
                  setActiveBtnTooltip(null);
                } else {
                  setLevel(l.id);
                  // 모바일에서 클릭 시 툴팁 잠시 보여주기
                  setActiveBtnTooltip(activeBtnTooltip === l.id ? null : l.id);
                }
              }}
              onMouseEnter={() => setActiveBtnTooltip(l.id)}
              onMouseLeave={() => setActiveBtnTooltip(null)}
              className={`w-full py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter
                  ${
                    level === l.id
                      ? "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.4)] scale-[1.05] z-10"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
            >
              {l.label}
            </button>

            {/* 버튼 툴팁 - Hover 및 클릭 대응 */}
            <div
              className={`absolute bottom-full mb-3 w-40 p-2.5 bg-primary dark:bg-primary text-white text-[10px] font-medium rounded-lg transition-all z-9999 shadow-xl pointer-events-none text-center leading-snug border border-white/20
              ${index === 0 ? "left-0" : index === levels.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"}
              ${activeBtnTooltip === l.id ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}`}
            >
              {t(`generate.sidebar.tooltips.level.${l.id}`)}
              <div
                className={`absolute top-full border-[6px] border-transparent border-t-primary 
                ${index === 0 ? "left-6" : index === levels.length - 1 ? "right-6" : "left-1/2 -translate-x-1/2"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
