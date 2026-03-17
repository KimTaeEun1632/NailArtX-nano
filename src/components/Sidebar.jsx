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
  isSidebarOpen,
  isPro,
}) => {
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-8 h-full flex flex-col">
      {/* Sidebar Title / Brand (Mobile Only) */}
      <div className="flex items-center gap-2 mb-2 lg:hidden">
        <div className="bg-primary p-1.5 rounded-lg text-white">
          <span className="material-symbols-outlined block text-lg">auto_fix_high</span>
        </div>
        <h2 className="text-lg font-bold tracking-tight">NailArtX Pro</h2>
      </div>

      {/* Technical Specs Only */}
      <section className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">settings_input_component</span>
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Technical Specs</h3>
        </div>

        {/* Quick Styles (Decorations equivalent) */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400">STYLES & DECORATIONS</label>
          <div className="flex flex-wrap gap-2">
             <QuickStyleSelector
                selectedQuickStyles={selectedQuickStyles}
                setSelectedQuickStyles={setSelectedQuickStyles}
                isCompact={true} 
              />
          </div>
        </div>

        {/* Colors */}
         <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400">PALETTE</label>
          <ColorSelector
            selectedTrendColors={selectedTrendColors}
            setSelectedTrendColors={setSelectedTrendColors}
          />
        </div>

        {/* Shape & Length */}
        <div className="space-y-3">
           <ShapeLengthSelector
            shape={shape}
            setShape={setShape}
            length={length}
            setLength={setLength}
          />
        </div>

        {/* Art Styles */}
        <div className="space-y-3">
           <label className="text-xs font-semibold text-slate-400">ARTISTIC STYLE</label>
           <ArtStyleSelector artStyles={artStyles} setArtStyles={setArtStyles} />
        </div>

        {/* Level (Detail Intensity) */}
        <div className="space-y-3 pb-8">
          <label className="text-xs font-semibold text-slate-400">DETAIL INTENSITY</label>
          <LevelSelector level={level} setLevel={setLevel} />
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
