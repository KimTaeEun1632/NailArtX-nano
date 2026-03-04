import React from "react";
import { Link } from "react-router-dom";
import BrushIcon from "../assets/icons/brush.svg?react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#f3f0f4] dark:border-gray-800 px-6 py-8 lg:px-20 dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 font-bold">
          <div className="size-9 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
            <BrushIcon />
          </div>
          NailArtX
        </div>
        <div className="flex gap-8 text-sm text-[#7c6388] dark:text-gray-400">
          <Link to="/terms" className="hover:text-primary transition-colors">
            {t("footer.terms")}
          </Link>
          <Link to="/refund" className="hover:text-primary transition-colors">
            {t("footer.refund")}
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            {t("footer.privacy")}
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 text-right">
          <p className="text-[10px] text-gray-400 max-w-[300px] leading-tight text-center md:text-right">
            {t("footer.description")}
          </p>
          <div className="text-sm text-gray-500">{t("footer.rights")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
