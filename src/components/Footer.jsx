import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[#f3f0f4] dark:border-gray-800 px-6 py-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 font-bold">
          <span className="material-symbols-outlined text-primary">brush</span>
          NailAI
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
