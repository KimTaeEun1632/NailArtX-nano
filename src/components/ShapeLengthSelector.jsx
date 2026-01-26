import { useState } from "react";
import { NAIL_SPEC } from "../constants/nailSpec";

const ShapeLengthSelector = ({ shape, setShape, length, setLength }) => {
  const [uxMessage, setUxMessage] = useState("");

  const handleShapeSelect = (shapeKey) => {
    const rule = NAIL_SPEC.shapes[shapeKey];
    setShape(shapeKey);
    setLength(rule.recommended);
    setUxMessage(
      `선택한 쉐입은 ${rule.recommended} 길이가 가장 예쁘게 표현돼요.`,
    );
  };

  return (
    <>
      {/* Nail Shape */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
          Nail Shape
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(NAIL_SPEC.shapes).map(([key, s]) => (
            <button
              key={key}
              onClick={() => handleShapeSelect(key)}
              className={`p-2.5 rounded-xl text-left transition-all border
                ${
                  shape === key
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 dark:border-slate-700 hover:bg-primary/5"
                }`}
            >
              <span
                className={`text-[11px] font-bold ${
                  shape === key ? "text-primary" : ""
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Nail Length */}
      {shape && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Nail Length
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(NAIL_SPEC.lengths).map(([key, l]) => {
              const allowed = NAIL_SPEC.shapes[shape].allowed.includes(key);

              return (
                <button
                  key={key}
                  disabled={!allowed}
                  onClick={() => {
                    setLength(key);
                    const rule = NAIL_SPEC.shapes[shape];
                    if (key === rule.recommended) {
                      setUxMessage(
                        `선택한 쉐입은 ${rule.recommended} 길이가 가장 예쁘게 표현돼요.`,
                      );
                    } else {
                      setUxMessage("");
                    }
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all
                    ${
                      !allowed
                        ? "opacity-30 cursor-not-allowed"
                        : length === key
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:bg-primary/5"
                    }`}
                >
                  <div className="text-[11px] font-bold">{l.label}</div>
                  <div className="text-[10px] text-slate-400">{l.mm}</div>
                </button>
              );
            })}
          </div>

          {uxMessage && (
            <p className="mt-3 text-[11px] text-primary font-medium">
              {uxMessage}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ShapeLengthSelector;
