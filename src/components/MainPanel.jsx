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
  isPro,
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
    <div className="flex-1 relative bg-slate-100 dark:bg-slate-950 p-6 flex flex-col gap-6 h-full overflow-hidden">
      {/* Canvas Toolbar Removed */}

      {/* Main Generated Image Display */}
      <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group bg-white dark:bg-slate-900">
        <ImageCanvas img={img} loading={loading} />

        {/* Gradient Overlay for Chat Readability */}
        {img && !loading && (
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        )}

        {/* Chat Integration Overlay */}
        {img && isPro && !loading && (
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-4 z-20">
            {/* Example Message Thread (Static for design, could be dynamic) */}
            <div className="max-w-2xl mx-auto w-full space-y-3 hidden sm:block">
              {/* This area can show recent chat history bubbles */}
            </div>

            {/* Chat Input Prominent */}
            <div className="max-w-3xl mx-auto w-full relative animate-in fade-in slide-in-from-bottom-4 duration-700">
              <form
                onSubmit={handleEditSubmit}
                className="flex items-center gap-2 p-2 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 transition-all focus-within:ring-2 focus-within:ring-primary/50"
              >
                <button
                  type="button"
                  className="p-2 text-slate-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">image</span>
                </button>
                <input
                  type="text"
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 text-slate-900 dark:text-white placeholder:text-slate-400"
                  placeholder={
                    t("generate.panel.editPlaceholder") ||
                    "Ask your Design Assistant to refine this..."
                  }
                />
                <button
                  type="submit"
                  className="bg-primary text-white size-10 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Quick Variation Strip */}
      {isPro && history.length > 0 && (
        <div className="h-28 flex items-center gap-4 overflow-x-auto custom-scrollbar shrink-0 px-4 py-2">
          {history.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => onSelectHistory(idx)}
              className={`
                h-20 aspect-square rounded-xl overflow-hidden shrink-0 cursor-pointer transition-all duration-300
                ${
                  idx === currentIndex
                    ? "border-2 border-primary ring-4 ring-primary/20 scale-110 shadow-xl z-10"
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
            onClick={onGenerate}
            disabled={loading}
            className="h-20 aspect-square rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 cursor-pointer border-2 border-dashed border-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group"
          >
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:scale-110 transition-transform">
              add
            </span>
          </button>
        </div>
      )}

      {/* Default Prompt Box if no image */}
      {!img && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-2xl animate-in fade-in zoom-in-95 duration-700 mb-12">
            <div className="text-center mb-10 space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-6 shadow-inner">
                <span className="text-3xl">🎨</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                Ready to Design?
              </h2>
              <p className="text-slate-500 font-medium text-sm">
                스타일을 선택하고 생성 버튼을 눌러보세요.
              </p>
            </div>
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
        </div>
      )}
    </div>
  );
};

export default MainPanel;
