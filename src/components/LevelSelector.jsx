import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LevelSelector = ({ level, setLevel }) => {
  const { t } = useLanguage();

  const levels = [
    { id: "beginner", label: "Beginner" },
    { id: "salon", label: "Salon" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-visible">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          {t("generate.sidebar.level")}
        </h3>
        <div className="group relative">
           <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 w-5 h-5 rounded-full flex items-center justify-center cursor-help font-bold border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white transition-colors">?</span>
           <div className="absolute bottom-full right-0 mb-3 w-56 p-3 bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all z-[100] shadow-2xl border border-white/10 leading-relaxed pointer-events-none">
             <p className="font-bold mb-1 text-primary">{t("generate.sidebar.tooltips.proTip")}</p>
             {t("generate.sidebar.tooltips.levelInfo")}
           </div>
        </div>
      </div>

      <div className="flex gap-2">
        {levels.map((l) => (
          <div key={l.id} className="group/btn relative flex-1">
            <button
              onClick={() => setLevel(l.id)}
              className={`w-full py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter
                  ${
                    level === l.id
                      ? "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.4)] scale-[1.05] z-10"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
            >
              {l.label}
            </button>

            {/* Contextual Tooltip - Improved visibility */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 p-2.5 bg-primary dark:bg-primary text-white text-[10px] font-medium rounded-lg opacity-0 translate-y-[-10px] invisible group-hover/btn:opacity-100 group-hover/btn:translate-y-0 group-hover/btn:visible transition-all z-[100] shadow-xl pointer-events-none text-center leading-snug border border-white/20">
              {t(`generate.sidebar.tooltips.level.${l.id}`)}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>  );
};

export default LevelSelector;
