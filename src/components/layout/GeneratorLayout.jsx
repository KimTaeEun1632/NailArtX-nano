const GeneratorLayout = ({
  sidebar,
  main,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <div className="flex h-[calc(100dvh-60px)] lg:h-[calc(100dvh-64px)] flex-col overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar: Configuration */}
        <aside
          className={`
            fixed lg:relative top-[52px] lg:top-0 left-0 h-[calc(100dvh-52px)] lg:h-full bg-white dark:bg-background-dark border-slate-200 dark:border-slate-800 transition-all duration-300 z-30 overflow-hidden shrink-0
            ${isSidebarOpen ? "w-80 border-r translate-x-0" : "w-0 border-none -translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="w-80 h-full overflow-y-auto custom-scrollbar">
            {sidebar}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Canvas Area */}
        <main className="flex-1 relative bg-slate-100 dark:bg-slate-950 flex flex-col min-w-0 overflow-hidden">
          {main}
        </main>
      </div>
    </div>
  );
};

export default GeneratorLayout;
