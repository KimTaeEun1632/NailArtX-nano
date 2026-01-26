import React from "react";

const LevelSelector = ({ level, setLevel }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Difficulty Level
      </h3>
      <div className="flex gap-2">
        {[
          { id: "beginner", label: "Beginner" },
          { id: "salon", label: "Salon" },
          { id: "advanced", label: "Advanced" },
        ].map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all
                ${
                  level === l.id
                    ? "bg-primary text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
