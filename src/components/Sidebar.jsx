import React from "react";
import GenerateButton from "./buttons/GenerateButton";
import LevelSelector from "./LevelSelector ";
import Technical from "../assets/icons/technical.svg?react";
import ShapeLengthSelector from "./ShapeLengthSelector";
import ArtStyleSelector from "./ArtStyleSelector";
import QuickStyleSelector from "./QuickStyleSelector";

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
          <div className="space-y-3">
            <QuickStyleSelector
              selectedQuickStyles={selectedQuickStyles}
              setSelectedQuickStyles={setSelectedQuickStyles}
            />

            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold w-full mb-1">
                Colors
              </span>
              <button className="group flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFE4E1]"></span>
                <span className="text-[11px] font-semibold group-hover:text-primary">
                  Nude
                </span>
              </button>
              <button className="group flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f3e5f5]"></span>
                <span className="text-[11px] font-semibold group-hover:text-primary">
                  Lavender
                </span>
              </button>
              <button className="group flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                <span className="w-2.5 h-2.5 rounded-full bg-linear-to-tr from-purple-400 to-pink-400"></span>
                <span className="text-[11px] font-semibold group-hover:text-primary">
                  Hologram
                </span>
              </button>
            </div>
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
