import LevelSelector from "./LevelSelector";
import ShapeLengthSelector from "./ShapeLengthSelector";
import ArtStyleSelector from "./ArtStyleSelector";
import QuickStyleSelector from "./QuickStyleSelector";
import ColorSelector from "./ColorSelector";
import { useLanguage } from "../contexts/LanguageContext";

const Sidebar = ({
  level,
  setLevel,
  shape,
  setShape,
  length,
  setLength,
  artStyles,
  setArtStyles,
  selectedQuickStyles,
  setSelectedQuickStyles,
  selectedTrendColors,
  setSelectedTrendColors,
  setIsSidebarOpen,
}) => {
  const { t } = useLanguage();
  const handleClose = () => {
    if (typeof setIsSidebarOpen === "function") {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col relative bg-white dark:bg-slate-900 overflow-visible">
      {/* Sidebar Close Button (X) */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors z-[100] rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        title={t("generate.sidebar.close")}
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Sidebar Title / Brand */}
      <div className="flex items-center gap-2 mb-8 shrink-0">
        <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined block text-xl">
            auto_fix_high
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
            {t("generate.sidebar.title")}
          </h2>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {t("generate.sidebar.subtitle")}
          </span>
        </div>
      </div>

      {/* Technical Specs Only - Removed overflow-y-auto to prevent clipping, now relies on parent scroll */}
      <section className="space-y-8 flex-1 pr-1 overflow-visible">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="material-symbols-outlined text-primary text-xl">
            settings_input_component
          </span>
          <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500">
            {t("generate.sidebar.config")}
          </h3>
        </div>

        {/* Quick Styles */}
        <div className="space-y-3 relative z-[10]">
          <label className="text-xs font-semibold text-slate-400">
            {t("generate.sidebar.styles")}
          </label>
          <div className="flex flex-wrap gap-2">
            <QuickStyleSelector
              selectedQuickStyles={selectedQuickStyles}
              setSelectedQuickStyles={setSelectedQuickStyles}
              isCompact={true}
            />
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-3 relative z-[20]">
          <label className="text-xs font-semibold text-slate-400">
            {t("generate.sidebar.palette")}
          </label>
          <ColorSelector
            selectedTrendColors={selectedTrendColors}
            setSelectedTrendColors={setSelectedTrendColors}
          />
        </div>

        {/* Shape & Length */}
        <div className="space-y-3 relative z-[30]">
          <ShapeLengthSelector
            shape={shape}
            setShape={setShape}
            length={length}
            setLength={setLength}
          />
        </div>

        {/* Art Styles */}
        <div className="space-y-3 relative z-[40]">
          <label className="text-xs font-semibold text-slate-400">
            {t("generate.sidebar.artStyle")}
          </label>
          <ArtStyleSelector artStyles={artStyles} setArtStyles={setArtStyles} />
        </div>

        {/* Level */}
        <div className="space-y-3 pb-8 relative z-[50]">
          <label className="text-xs font-semibold text-slate-400">
            {t("generate.sidebar.intensity")}
          </label>
          <LevelSelector level={level} setLevel={setLevel} />
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
