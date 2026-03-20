import { useState } from "react";
import ImageCanvas from "./canvas/ImageCanvas";
import PromptBox from "./PromptBox";
import SideToggle from "../assets/icons/sideToggle.svg?react";
import { useLanguage } from "../contexts/LanguageContext";

const MainPanel = ({
  img,
  history = [],
  currentIndex = -1,
  onSelectHistory,
  loading,
  keyword,
  setKeyword,
  selectedModel,
  setSelectedModel,
  onGenerate,
  onEdit,
  onNew,
  isPro,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { t } = useLanguage();
  const [editMessage, setEditMessage] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editMessage.trim() || loading) return;
    onEdit(editMessage);
    setEditMessage("");
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Left/Top: Main Content Area (Canvas + Prompt) */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 min-w-0 overflow-y-auto custom-scrollbar">
        {/* Toolbar / Header - Full width positioning */}
        <div className="flex items-center justify-between w-full shrink-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all group"
                  title="스타일 설정 열기"
                >
                  <SideToggle className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
                </button>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight hidden sm:block">
                  Settings
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4"></div>{" "}
        </div>

        {/* Main Generated Image Display */}
        <div className="flex-1 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white dark:border-slate-800 group bg-white dark:bg-slate-900 min-h-[300px]">
          <ImageCanvas img={img} loading={loading} />

          {/* Empty State Overlay */}
          {!img && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center pointer-events-none animate-in fade-in zoom-in-95 duration-700">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-6 shadow-inner">
                <span className="text-3xl">🎨</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                Ready to Design?
              </h2>
              <p className="text-slate-500 font-medium text-sm mt-2">
                스타일을 선택하고 생성 버튼을 눌러보세요.
              </p>
            </div>
          )}

          {/* Gradient Overlay for Chat Readability (Optional, kept for aesthetic) */}
          {img && !loading && (
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          )}
        </div>

        {/* Prompt Input Area - Bottom of Canvas */}
        <div className="shrink-0 w-full max-w-4xl mx-auto z-10">
          {img ? (
            <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700 pb-2">
              <form
                onSubmit={handleEditSubmit}
                className="flex items-center gap-2 p-1.5 sm:p-2 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-primary/50"
              >
                <button
                  type="button"
                  className="p-2 text-slate-400 hover:text-primary transition-colors hidden sm:block"
                >
                  <span className="material-symbols-outlined">image</span>
                </button>
                <input
                  type="text"
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-slate-900 dark:text-white placeholder:text-slate-400"
                  placeholder={
                    t("generate.panel.editPlaceholder") ||
                    "Ask your Design Assistant to refine this..."
                  }
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white size-9 sm:size-10 rounded-lg sm:rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-xl sm:text-2xl">
                    send
                  </span>
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-700">
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
          )}
        </div>
      </div>

      {/* Right/Bottom: History Sidebar (Responsive) */}
      {history.length > 0 && (
        <div
          className={`
          flex shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 p-4 transition-all
          w-full h-auto flex-row overflow-x-auto border-t gap-3
          lg:w-28 xl:w-32 lg:h-full lg:flex-col lg:overflow-y-auto lg:border-t-0 lg:border-l lg:gap-4 lg:items-center
          custom-scrollbar
        `}
        >
          <p className="hidden lg:block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            History
          </p>
          {history.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => onSelectHistory(idx)}
              className={`
                aspect-square rounded-lg sm:rounded-xl overflow-hidden shrink-0 cursor-pointer transition-all duration-300
                w-16 h-16 sm:w-20 sm:h-20 lg:w-full lg:h-auto
                ${
                  idx === currentIndex
                    ? "border-2 border-primary ring-2 sm:ring-4 ring-primary/20 scale-105 shadow-lg z-10 opacity-100 grayscale-0"
                    : "border border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
                }
              `}
            >
              <img
                src={thumb}
                alt={`Variation ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}

          {/* Add New Variation Button */}
          <button
            onClick={onNew}
            disabled={loading}
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-full lg:aspect-square rounded-lg sm:rounded-xl bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center shrink-0 cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group"
          >
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:scale-110 transition-transform">
              add
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPanel;
