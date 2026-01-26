import React from "react";

const ImageCanvas = ({ img, loading }) => {
  return (
    <div className="lg:col-span-8 xl:col-span-9 h-full">
      <div className="h-full bg-white dark:bg-slate-900 rounded-[2.5rem] border shadow-2xl overflow-hidden relative">
        <div className="flex-1 flex items-center justify-center p-12 bg-slate-50 dark:bg-slate-950/50">
          {loading && (
            <p className="text-slate-400 text-lg font-bold animate-pulse">
              Generating…
            </p>
          )}

          {!loading && img && (
            <img
              src={img}
              alt="Generated Nail Art"
              className="w-full h-full object-contain rounded-2xl"
            />
          )}

          {!loading && !img && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-400">
                Canvas Ready
              </h2>
              <p className="text-slate-400 mt-3">
                Adjust the parameters and click generate
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCanvas;
