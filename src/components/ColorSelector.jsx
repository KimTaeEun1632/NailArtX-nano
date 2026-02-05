import { TREND_COLOR_MAP } from "../constants/trendColorMap";

const ColorSelector = ({ selectedTrendColors, setSelectedTrendColors }) => {
  const toggleColor = (colorId) => {
    setSelectedTrendColors((prev) => {
      // 토글 선택, 제거
      if (prev.includes(colorId)) {
        return prev.filter((id) => id !== colorId);
      }

      // 새로 추가하려는 경우
      const newStyleConflicts = TREND_COLOR_MAP[colorId]?.conflicts || [];

      // 1. 새 스타일의 conflicts에 있는 것들 제거
      let updated = prev.filter((id) => !newStyleConflicts.includes(id));

      // 2. 기존 선택된 스타일들 중에서 새 스타일과 충돌하는 것 제거 (양방향 보장)
      updated = updated.filter((id) => {
        const existingConflicts = TREND_COLOR_MAP[id]?.conflicts || [];
        return !existingConflicts.includes(colorId);
      });

      // 최종 새 스타일 추가 (작동 확인)
      return [...updated, colorId];
    });
  };

  return (
    <div className="space-y-3">
      <span className="text-[12px] text-slate-400 uppercase font-bold">
        2026 TREND COLORS
      </span>

      {/* Trend Colors */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(TREND_COLOR_MAP).map(([id, c]) => {
          const active = selectedTrendColors.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggleColor(id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all
                ${
                  active
                    ? "bg-primary text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-primary/10"
                }`}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
