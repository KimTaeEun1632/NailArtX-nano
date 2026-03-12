import { useLanguage } from "../contexts/LanguageContext";

const PromptBox = ({
  keyword,
  setKeyword,
  selectedModel,
  setSelectedModel,
  onGenerate,
  loading,
  isPro,
}) => {
  const { t } = useLanguage();
  const isGenerateDisabled = !keyword.trim() || loading;

  const models = [
    {
      id: "gemini-2.5-flash-image",
      label: "Gemini 2.5 Flash",
      shortLabel: "Flash",
      isProOnly: false,
      icon: "⚡",
    },
    {
      id: "gemini-3-pro-image-preview",
      label: "Gemini 3 Pro",
      shortLabel: "Pro",
      isProOnly: true,
      icon: "✨",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-4xl p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* Input Area */}
        <textarea
          className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 pt-2 pb-14 resize-none min-h-[100px] outline-none text-slate-700 dark:text-slate-200"
          placeholder={t("generate.panel.placeholder")}
          rows={1}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isGenerateDisabled) {
              e.preventDefault();
              onGenerate();
            }
          }}
        />

        {/* Bottom Bar Tools */}
        <div className="absolute bottom-4 left-6 right-4 flex items-center justify-end">
          <div className="flex items-center gap-4">
            {/* Model Selection Label (Optional but helps clarity) */}
            <span className="hidden sm:block text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">
              Model
            </span>

            {/* Model Selector Pill */}
            <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-1">
              {models.map((m) => {
                const isActive = selectedModel === m.id;
                const isDisabled = m.isProOnly && !isPro;

                return (
                  <button
                    key={m.id}
                    disabled={isDisabled}
                    onClick={() => setSelectedModel(m.id)}
                    className={`px-4 py-1.5 rounded-xl text-[11px] font-black transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105 -translate-y-0.5"
                        : "text-slate-400 hover:text-slate-600 dark:text-slate-500"
                    } ${isDisabled ? "opacity-25 cursor-not-allowed grayscale" : ""}`}
                  >
                    <span
                      className={isActive ? "text-white" : "text-slate-300"}
                    >
                      {m.icon}
                    </span>
                    <span className="whitespace-nowrap">{m.shortLabel}</span>
                    {isDisabled && (
                      <span className="text-[7px] bg-slate-200 dark:bg-slate-800 px-1 rounded ml-0.5 text-slate-500">
                        PRO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Send (Generate) Button */}
            <button
              onClick={onGenerate}
              disabled={isGenerateDisabled}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                isGenerateDisabled
                  ? "bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600"
                  : "bg-primary text-white shadow-xl shadow-primary/25 hover:scale-110 active:scale-95"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 -rotate-45 translate-x-0.5 -translate-y-0.5"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
