const GeneratorLayout = ({
  sidebar,
  main,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <main className="relative max-w-[1800px] mx-auto px-4 lg:px-6 py-6 h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex gap-0 lg:gap-6 h-full w-full">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <div
          className={`
            /* 공통 */
            h-full transition-all duration-300 ease-in-out z-50
            
            /* 모바일/태블릿: 오버레이 방식 */
            fixed inset-y-0 left-0 bg-white dark:bg-slate-900 shadow-2xl p-6
            lg:relative lg:bg-transparent lg:shadow-none lg:p-0
            
            /* 열림/닫힘 상태 제어 */
            ${
              isSidebarOpen
                ? "translate-x-0 w-[300px] opacity-100"
                : "-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden"
            }
            
            /* 데스크탑에서만 마진 적용 */
            ${isSidebarOpen ? "xl:mr-15" : "lg:mr-0"}
          `}
        >
          <div className="w-[260px] lg:w-[320px] xl:w-[380px] h-full">
            {sidebar}
          </div>
        </div>
        <div className="flex-1 h-full min-w-0 transition-all duration-300">
          {main}
        </div>
      </div>
    </main>
  );
};

export default GeneratorLayout;
