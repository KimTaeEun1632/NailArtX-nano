import LevelSelector from "./LevelSelector ";
import Technical from "../assets/icons/technical.svg?react";
import ShapeLengthSelector from "./ShapeLengthSelector";
import ArtStyleSelector from "./ArtStyleSelector";
import QuickStyleSelector from "./QuickStyleSelector";
import ColorSelector from "./ColorSelector";

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
}) => {
  return (
    <aside className="h-full flex flex-col space-y-4 pr-2 overflow-y-auto">
      {/* Prompt */}
      <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-4">
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
    </aside>
  );
};

export default Sidebar;
