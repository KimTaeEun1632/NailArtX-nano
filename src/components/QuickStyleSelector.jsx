import { QUICK_STYLE_MAP } from "../constants/quickStyleMap";

const QuickStyleSelector = ({
  selectedQuickStyles,
  setSelectedQuickStyles,
}) => {
  const toggleStyle = (styleId) => {
    setSelectedQuickStyles((prev) => {
      // 토글 선택, 제거
      if (prev.includes(styleId)) {
        return prev.filter((id) => id !== styleId);
      }

      // 새로 추가하려는 경우
      const newStyleConflicts = QUICK_STYLE_MAP[styleId]?.conflicts || [];

      // 1. 새 스타일의 conflicts에 있는 것들 제거
      let updated = prev.filter((id) => !newStyleConflicts.includes(id));

      // 2. 기존 선택된 스타일들 중에서 새 스타일과 충돌하는 것 제거 (양방향 보장)
      updated = updated.filter((id) => {
        const existingConflicts = QUICK_STYLE_MAP[id]?.conflicts || [];
        return !existingConflicts.includes(styleId);
      });

      // 최종 새 스타일 추가 (작동 확인)
      return [...updated, styleId];
    });
  };

  return (
    <div className="space-y-4">
      <span className="text-[12px] text-slate-400 uppercase font-bold">
        Quick Styles
      </span>

      <div className="flex flex-wrap gap-2">
        {Object.entries(QUICK_STYLE_MAP).map(([id, s]) => {
          const active = selectedQuickStyles.includes(id);

          return (
            <button
              key={id}
              onClick={() => toggleStyle(id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-primary/10"
                }`}
            >
              {s.emoji} {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickStyleSelector;
