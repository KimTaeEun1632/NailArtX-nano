import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Auth from "./Auth";
import LightMoon from "../assets/lightMoon.svg";
import DarkMoon from "../assets/moon.svg";
import BrushIcon from "../assets/icons/brush.svg?react";
import { useLanguage } from "../contexts/LanguageContext";

const Header = ({ dark, setDark }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [session, setSession] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (window.location.hash.includes("access_token")) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f3f0f4] dark:border-[#3a2a40] dark:text-white bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-20 transition-colors">
        <div className="flex items-center gap-4">
          <div className="size-9 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
            <BrushIcon />
          </div>
          <Link to="/" className="text-xl font-bold">
            NailArtX
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-9">
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("header.howItWorks")}
            </a>
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("header.features")}
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("header.gallery")}
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors uppercase"
                title={lang === "ko" ? "Switch to English" : "한국어로 변경"}
              >
                {lang === "ko" ? "EN" : "KO"}
              </button>
              <button
                onClick={() => setDark(!dark)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/60 dark:bg-slate-800/60 dark:border "
              >
                <span className="material-symbols-outlined flex items-center justify-center">
                  {dark ? (
                    <img src={LightMoon} alt="dark-mood" className="w-5 h-5"></img>
                  ) : (
                    <img src={DarkMoon} alt="white-mood" className="w-5 h-5" />
                  )}
                </span>
              </button>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            {session ? (
              <>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          productId: "bceb13a3-9999-438c-928c-e3935fcdb67e",
                        }),
                      });

                      if (!response.ok) {
                        const errorText = await response.text();
                        console.error("Server error:", errorText);
                        alert(
                          `Error: ${response.status}. Make sure you are using the Wrangler port (usually 8788).`,
                        );
                        return;
                      }

                      const data = await response.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        alert("Failed to start checkout. Please try again.");
                      }
                    } catch (err) {
                      console.error("Checkout error:", err);
                      alert(
                        "An error occurred. Check the console for details.",
                      );
                    }
                  }}
                  className="flex items-center justify-center h-10 px-6 rounded-xl border border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  {t("header.goPro")}
                </button>
                <Link
                  to="/mypage"
                  className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 flex items-center h-10"
                >
                  {t("header.profile")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 flex items-center h-10"
                >
                  {t("header.logout")}
                </button>
                <Link
                  to="/generate"
                  className="flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark"
                >
                  {t("header.startDesigning")}
                </Link>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark"
              >
                {t("header.getStarted")}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase transition-colors"
          >
            {lang === "ko" ? "EN" : "KO"}
          </button>
          <button
            onClick={() => setDark(!dark)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200/60 dark:bg-slate-800/60 transition-colors"
          >
            {dark ? (
              <img src={LightMoon} alt="light" className="w-4 h-4" />
            ) : (
              <img src={DarkMoon} alt="dark" className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-background-dark md:hidden pt-20 px-6 flex flex-col gap-6 transition-all duration-300">
          <nav className="flex flex-col gap-6">
            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              {t("header.howItWorks")}
            </a>
            <a
              href="#features"
              onClick={closeMenu}
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              {t("header.features")}
            </a>
            <a
              href="#gallery"
              onClick={closeMenu}
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              {t("header.gallery")}
            </a>
          </nav>

          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />

          <div className="flex flex-col gap-4">
            {session ? (
              <>
                <button
                  onClick={async () => {
                    try {
                      setIsMenuOpen(false);
                      const response = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          productId: "bceb13a3-9999-438c-928c-e3935fcdb67e",
                        }),
                      });

                      if (!response.ok) {
                        const errorText = await response.text();
                        console.error("Server error:", errorText);
                        alert(`Error: ${response.status}`);
                        return;
                      }

                      const data = await response.json();
                      if (data.url) {
                        window.location.href = data.url;
                      }
                    } catch (err) {
                      console.error("Checkout error:", err);
                    }
                  }}
                  className="flex items-center justify-center h-12 rounded-xl border border-primary text-primary font-bold"
                >
                  {t("header.goPro")}
                </button>
                <Link
                  to="/mypage"
                  onClick={closeMenu}
                  className="flex items-center justify-center h-12 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
                >
                  {t("header.profile")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center h-12 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
                >
                  {t("header.logout")}
                </button>
                <Link
                  to="/generate"
                  onClick={closeMenu}
                  className="flex items-center justify-center h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20"
                >
                  {t("header.startDesigning")}
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAuth(true);
                  closeMenu();
                }}
                className="flex items-center justify-center h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20"
              >
                {t("header.getStarted")}
              </button>
            )}
          </div>
        </div>
      )}

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default Header;
