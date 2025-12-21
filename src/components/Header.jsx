import { Link } from "react-router-dom";
import LightMoon from "../assets/lightMoon.svg";
import DarkMoon from "../assets/moon.svg";
import BrushIcon from "../assets/icons/brush.svg?react";
const Header = ({ dark, setDark }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f3f0f4] dark:border-[#3a2a40] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-20 transition-colors">
      <div className="flex items-center gap-4">
        <div className="size-9 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
          <BrushIcon />
        </div>
        <a href="/" className="text-xl font-bold">
          NailArtX
        </a>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-9">
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </a>
          <a href="#gallery" className="text-sm font-medium hover:text-primary">
            Gallery
          </a>

          <button
            onClick={() => setDark(!dark)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/60 dark:bg-slate-800/60 dark:border "
          >
            <span className="material-symbols-outlined">
              {dark ? (
                <img src={LightMoon} alt="dark-mood"></img>
              ) : (
                <img src={DarkMoon} alt="white-mood" />
              )}
            </span>
          </button>
        </nav>
        <div className="flex gap-2">
          <Link
            to="/generate"
            className="flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark"
          >
            Start Designing
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
