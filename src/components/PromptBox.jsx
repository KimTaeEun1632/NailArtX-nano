import { useLanguage } from "../contexts/LanguageContext";

const PromptBox = ({ keyword, setKeyword, onGenerate, loading }) => {
  const { t } = useLanguage();
  const isGenerateDisabled = !keyword.trim() || loading;

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark/50 p-4 sm:p-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Text Input */}
        <div className="flex-1">
          <label className="flex w-full flex-col">
            <p className="pb-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
              {t("howItWorks.steps.0.title")}
            </p>
            <div className="relative flex w-full items-center">
              <input
                className="form-input h-14 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder={t("generate.panel.placeholder")}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Generate Button */}
        <div className="md:self-end">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerateDisabled}
            className="flex h-14 w-full md:w-48 items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
          >
            {loading ? t("common.loading") : t("generate.panel.generateBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
