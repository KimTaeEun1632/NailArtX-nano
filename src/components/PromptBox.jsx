const PromptBox = ({ keyword, setKeyword, onGenerate, loading }) => {
  const isGenerateDisabled = !keyword.trim() || loading;

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Text Input */}
        <div className="lg:col-span-3">
          <label className="flex w-full flex-col">
            <p className="pb-2 text-sm font-medium">Describe your vision</p>
            <div className="relative flex w-full items-center">
              <input
                className="form-input h-12 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent pl-4"
                placeholder="e.g., snowflake nail art with chrome"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Generate Button */}
        <div className="lg:self-end">
          <button
            onClick={onGenerate}
            disabled={isGenerateDisabled}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90"
          >
            <span className="material-symbols-outlined">Auto awesome</span>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
