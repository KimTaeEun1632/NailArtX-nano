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

  return (
    <section className="h-full flex flex-col gap-4 w-full">
      {/* top bar */}
      <div className="flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-surface-light-dark transition-all shadow-sm z-30"
          >
            <SideToggle className="w-7 h-7" />
          </button>
          {!isSidebarOpen && (
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">
              {isSidebarOpen ? "" : "Menu"}
            </span>
          )}
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
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onGenerate={onGenerate}
          loading={loading}
          isPro={isPro}
        />
      </div>
    </section>
  );
};

export default MainPanel;
