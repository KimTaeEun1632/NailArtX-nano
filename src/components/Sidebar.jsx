import LevelSelector from "./LevelSelector";
import Technical from "../assets/icons/technical.svg?react";
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
}) => {
  const { t } = useLanguage();

  return (
    <aside className="h-full flex flex-col space-y-4 pr-2 overflow-y-auto">
      <div className="p-2 border-b border-gray-100 dark:border-gray-800 mb-4">
        <h2 className="text-xl font-bold">{t("generate.sidebar.title")}</h2>
      </div>

      {/* Prompt Options */}
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
            {t("generate.sidebar.shape")} & {t("generate.sidebar.length")}
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
        <div className="px-2 mt-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t("generate.sidebar.artStyles")}
          </h3>
          <ArtStyleSelector artStyles={artStyles} setArtStyles={setArtStyles} />
        </div>
      </div>

      {/* Level */}
      <div className="px-2 mt-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          {t("generate.sidebar.level")}
        </h3>
        <LevelSelector level={level} setLevel={setLevel} />
      </div>
    </aside>
  );
};

export default Sidebar;
