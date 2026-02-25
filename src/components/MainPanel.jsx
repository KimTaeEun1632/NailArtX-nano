import ImageCanvas from "./canvas/ImageCanvas";
import PromptBox from "./PromptBox";
import SideToggle from "../assets/icons/sideToggle.svg?react";

const MainPanel = ({
  img,
  loading,
  keyword,
  setKeyword,
  onGenerate,
  setIsSidebarOpen,
  isSidebarOpen,
}) => {
  return (
    <section className="h-full flex flex-col gap-4 w-full">
      {/* toggle button */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-surface-light-dark transition-all shadow-sm z-30"
        >
          <SideToggle className="w-7 h-7" />
        </button>
        {!isSidebarOpen && (
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">
            {isSidebarOpen ? "Close Menu" : "Menu"}
          </span>
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
