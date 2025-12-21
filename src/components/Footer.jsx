import React from "react";
import BrushIcon from "../assets/icons/brush.svg?react";
const Footer = () => {
  return (
    <footer className="border-t border-[#f3f0f4] dark:border-gray-800 px-6 py-12 lg:px-20d dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 font-bold">
          <div className="size-9 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
            <BrushIcon />
          </div>
          NailArtX
        </div>
        <div className="flex gap-8 text-sm text-[#7c6388] dark:text-gray-400">
          <a>Terms</a>
          <a>Privacy</a>
          <a>Support</a>
          <a>Instagram</a>
        </div>
        <div className="text-sm text-gray-500">© 2024 NailAI Inc.</div>
      </div>
    </footer>
  );
};

export default Footer;
