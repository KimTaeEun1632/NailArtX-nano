import React from "react";

const GeneratorLayout = ({ sidebar, canvas }) => {
  return (
    <main className="max-w-[1800px] mx-auto px-6 py-6 h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 h-full">
        {sidebar}
        {canvas}
      </div>
    </main>
  );
};

export default GeneratorLayout;
