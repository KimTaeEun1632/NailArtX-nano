const ImageCanvas = ({ img, loading }) => {
  // 공유 기능 (모바일/지원 브라우저)
  const handleShare = async () => {
    if (!img || !navigator.share) return;
    try {
      const response = await fetch(img).catch(() => null);
      if (response) {
        const blob = await response.blob();
        const file = new File([blob], `nail-art-${Date.now()}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'NailArtX Design',
            text: '내가 디자인한 네일 아트야! 어때?',
          });
        }
      }
    } catch (err) {
      console.error('Share failed:', err);
      handleDownload(); // 공유 실패 시 다운로드로 대체
    }
  };

  // 다운로드 기능 (가장 확실한 저장 방식)
  const handleDownload = () => {
    if (!img) return;
    const link = document.createElement('a');
    link.href = img;
    link.download = `nail-art-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full relative group/canvas">
      <div
        className="h-full bg-white dark:bg-slate-950 rounded-[2.5rem]
        border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl transition-all duration-700"
      >
        <div
          className="flex items-center justify-center h-full
          bg-slate-50/50 dark:bg-slate-950/80 relative overflow-hidden"
        >
          {/* 배경 글로우 효과 */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/20 dark:bg-primary/40 rounded-full blur-[100px] opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-1000" />
          </div>

          {loading && (
            <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm px-8">
              <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-lg font-black text-slate-800 dark:text-slate-100 animate-pulse">
                Designing...
              </p>
            </div>
          )}

          {!loading && img && (
            <div className="relative z-10 w-full h-full group flex items-center justify-center p-6 sm:p-12">
              <img 
                src={img} 
                className="relative z-20 object-contain max-h-full max-w-full rounded-2xl shadow-2xl transition-all duration-700 hover:scale-[1.05] cursor-zoom-in" 
                alt="Generated Nail Art"
              />
              
              {/* 오른쪽 하단 버튼 그룹 - 아이콘 전용 정사각형 디자인 */}
              <div className="absolute bottom-6 right-6 z-30 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {/* 공유 버튼 (지원 기기에서만 표시) */}
                {navigator.share && (
                  <button
                    onClick={handleShare}
                    className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:scale-110 hover:shadow-xl transition-all active:scale-95 group/btn"
                    title="공유하기"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover/btn:text-primary transition-colors">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" />
                    </svg>
                  </button>
                )}
                
                {/* 다운로드 버튼 */}
                <button
                  onClick={handleDownload}
                  className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:scale-110 hover:shadow-xl transition-all active:scale-95 group/btn"
                  title="저장하기"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-700 dark:text-slate-200 group-hover/btn:text-primary transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-6-6M12 12.75l6-6M12 12.75V3" />
                  </svg>
                  {/* 다운로드 아이콘 SVG 교체 (화살표가 아래로 향하는 심플한 라인) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-6-6M12 12.75l6-6M12 12.75V3" />
                      </svg>
                  </div>
                </button>
              </div>
            </div>
          )}

          {!loading && !img && (
            <div className="relative z-10 text-center space-y-4 max-w-xs px-6">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-6">
                <span className="text-3xl">🎨</span>
              </div>
              <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Ready to Design?</h2>
              <p className="text-sm text-slate-500 font-medium">스타일을 선택하고 생성 버튼을 눌러보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCanvas;