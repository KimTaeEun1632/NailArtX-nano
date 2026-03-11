import ImageCanvas from "./canvas/ImageCanvas";
import PromptBox from "./PromptBox";
import SideToggle from "../assets/icons/sideToggle.svg?react";
import { useLanguage } from "../contexts/LanguageContext";

const MainPanel = ({
  img,
  loading,
  keyword,
  setKeyword,
  selectedModel,
  setSelectedModel,
  onGenerate,
  setIsSidebarOpen,
  isSidebarOpen,
  isPro,
  onRefund,
}) => {
  const { t } = useLanguage();

  const models = [
    { id: "gemini-2.5-flash-image", label: "Gemini 2.5 Flash", isProOnly: false },
    { id: "gemini-3-pro-image-preview", label: "Gemini 3 Pro", isProOnly: true },
  ];

  return (
    <section className="h-full flex flex-col gap-4 w-full">
      {/* top bar */}
      <div className="flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-surface-light-dark transition-all shadow-sm z-30"
          >
            <SideToggle className="w-7 h-7" />
          </button>
          
          {/* Model Selector Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {models.map((m) => {
              const isActive = selectedModel === m.id;
              const isDisabled = m.isProOnly && !isPro;
              
              return (
                <button
                  key={m.id}
                  disabled={isDisabled}
                  onClick={() => setSelectedModel(m.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive 
                      ? "bg-white dark:bg-surface-dark shadow-sm text-primary" 
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  } ${isDisabled ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
                >
                  {m.isProOnly && "✨"} {m.label}
                  {isDisabled && <span className="text-[9px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded ml-1">PRO</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pro Status & Refund */}
        {isPro && (
          <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-xl border border-primary/20">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              ✨ PRO ACTIVE
            </span>
            <button
              onClick={onRefund}
              className="text-[10px] text-slate-400 hover:text-red-500 underline transition-colors"
            >
              {t("generate.panel.refundBtn")}
            </button>
          </div>
        )}
      </div>
      {/* Image Result */}
      <div className="flex-1 min-h-0">
        <ImageCanvas img={img} loading={loading} />
      </div>

      {/* Prompt Area */}
      <div className="flex items-center justify-center">
        <PromptBox
          keyword={keyword}
          setKeyword={setKeyword}
          onGenerate={onGenerate}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default MainPanel;
