const ImageCanvas = ({ img, loading }) => {
  return (
    <div className="w-full h-full relative">
      <div
        className="h-full bg-white dark:bg-surface-dark rounded-[2.5rem]
        border border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner"
      >
        <div
          className="flex items-center justify-center h-full
          bg-slate-50/50 dark:bg-background-dark/30"
        >
          {loading && (
            <div className="relative flex flex-col items-center gap-6 w-full max-w-sm px-8">
              {/* Spinning Logo / Abstract Shape */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
                <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-primary/20 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  ✨
                </div>
              </div>

              {/* Progress Text with Animation */}
              <div className="text-center space-y-2">
                <p className="text-xl font-black text-slate-800 dark:text-slate-100 animate-pulse tracking-tight">
                  Designing Your Art...
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] pt-4">
                  8K Hyper-Realistic Rendering
                </p>
              </div>

              {/* Skeleton Background Effect */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 animate-pulse" />
              </div>
            </div>
          )}

          {!loading && img && (
            <div className="relative w-full h-full group">
              <img src={img} className="object-contain h-full w-full transition-transform duration-700 hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          )}

          {!loading && !img && (
            <div className="text-center space-y-4 max-w-xs px-6">
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 group-hover:rotate-0 transition-transform">
                <span className="text-4xl">🎨</span>
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                Ready to Design?
              </h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Choose your style and describe your dream nails below to start creating.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCanvas;
