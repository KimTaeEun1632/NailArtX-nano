import GenerateButton from "./buttons/GenerateButton";
import LevelSelector from "./LevelSelector ";
import Technical from "../assets/icons/technical.svg?react";
import ShapeLengthSelector from "./ShapeLengthSelector";
import ArtStyleSelector from "./ArtStyleSelector";
import QuickStyleSelector from "./QuickStyleSelector";
import ColorSelector from "./ColorSelector";

const Sidebar = ({
  keyword,
  setKeyword,
  level,
  setLevel,
  onGenerate,
  loading,
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
}) => {
  const isGenerateDisabled = !level || !keyword.trim() || loading;

  return (
    <aside className="lg:col-span-4 xl:col-span-3 flex flex-col h-full space-y-4 overflow-y-auto pr-2 custom-scrollbar">
      {/* Prompt */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            Describe your vision
          </label>
        </div>
        <div className="space-y-4">
          <input
            className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium min-h-[140px] focus:ring-2 focus:ring-primary/20 resize-none transition-all overflow-"
            placeholder="Describe your creative vision... e.g., iridescent holographic finish with 3D floral accents..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="space-y-5">
            {/* QuickStyle */}
            <QuickStyleSelector
              selectedQuickStyles={selectedQuickStyles}
              setSelectedQuickStyles={setSelectedQuickStyles}
            />

            {/* TrendColor */}
            <ColorSelector
              selectedTrendColors={selectedTrendColors}
              setSelectedTrendColors={setSelectedTrendColors}
            />
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <Technical />
          <h2 className="font-bold text-xs uppercase tracking-widest text-slate-500">
            Technical Specs
          </h2>
        </div>

        {/* Shape, Length */}
        <ShapeLengthSelector
          shape={shape}
          setShape={setShape}
          length={length}
          setLength={setLength}
        />

        {/* ArtStyle */}
        <ArtStyleSelector artStyles={artStyles} setArtStyles={setArtStyles} />
      </div>

      {/* Level */}
      <LevelSelector level={level} setLevel={setLevel} />

      {/* Generate */}
      <GenerateButton
        onClick={onGenerate}
        isGenerateDisabled={isGenerateDisabled}
      />
    </aside>
  );
};

export default Sidebar;
