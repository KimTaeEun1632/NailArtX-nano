const GeneratorLayout = ({
  sidebar,
  main,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      {/* Top Navigation (Header) - To be implemented in Header component later, or integrated here if needed. 
          Assuming Header is rendered separately in App.jsx or Layout.jsx. 
          If this layout handles everything below the header, we'll focus on the flex body.
      */}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Configuration */}
        <aside
          className={`
            w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark overflow-y-auto custom-scrollbar transition-all duration-300 z-30
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 absolute lg:relative h-full"}
          `}
        >
          {sidebar}
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
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
