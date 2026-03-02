import React from "react";
import { Link } from "react-router-dom";
import BrushIcon from "../assets/icons/brush.svg?react";

const Footer = () => {
  return (
    <footer className="border-t border-[#f3f0f4] dark:border-gray-800 px-6 py-3 lg:px-20d dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 font-bold">
          <div className="size-9 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
            <BrushIcon />
          </div>
          NailArtX
        </div>
        <div className="flex gap-8 text-sm text-[#7c6388] dark:text-gray-400">
          <Link to="/terms" className="hover:text-primary transition-colors">
            이용약관
          </Link>
          <Link to="/refund" className="hover:text-primary transition-colors">
            환불규정
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            개인정보처리방침
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 text-right">
          <p className="text-[10px] text-gray-400 max-w-[300px] leading-tight">
            NailArtX는 디지털 디자인 레퍼런스 도구입니다. 당사는 실물 제품이나 전문
            네일 샵 서비스를 직접 제공하지 않습니다.
          </p>
          <div className="text-sm text-gray-500">© 2026 NailArtX Inc.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
