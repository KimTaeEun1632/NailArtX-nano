import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import Auth from "./Auth";
import LightMoon from "../assets/lightMoon.svg";
import DarkMoon from "../assets/moon.svg";
import BrushIcon from "../assets/icons/brush.svg?react";

const Header = ({ dark, setDark }) => {
  const [session, setSession] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f3f0f4] dark:border-[#3a2a40] dark:text-white bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-20 transition-colors">
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
            <a
              href="#gallery"
              className="text-sm font-medium hover:text-primary"
            >
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
            {session ? (
              <>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          productId: "f8c3170e-329a-4cd6-955f-0dd2ae2fdb90",
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
                  Go Pro
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4"
                >
                  Logout
                </button>
                <Link
                  to="/generate"
                  className="flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark"
                >
                  Start Designing
                </Link>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </header>
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default Header;
