import React from "react";

const GenerateButton = ({ onClick, isGenerateDisabled }) => {
  return (
    <div className="lg:self-end">
      <button
        onClick={onClick}
        disabled={isGenerateDisabled}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90"
      >
        <span className="material-symbols-outlined">Auto awesome</span>
        Generate
      </button>
    </div>
  );
};

export default GenerateButton;
