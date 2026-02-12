const ImageCanvas = ({ img, loading }) => {
  return (
    <div className="w-full h-full relative">
      <div
        className="h-full bg-white dark:bg-slate-900 rounded-[2.5rem]
        border overflow-hidden"
      >
        <div
          className="flex items-center justify-center h-full
          bg-slate-50 dark:bg-slate-950/50"
        >
          {loading && <p className="animate-pulse text-3xl">Generating…</p>}

          {!loading && img && (
            <img src={img} className="object-contain h-full w-full" />
          )}

          {!loading && !img && (
            <div className="text-center text-slate-400">
              <h2 className="text-xl font-bold">Ready to Design?</h2>
              <p className="mt-2 text-sm">
                Configure your options or describe your dream nails below
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCanvas;
