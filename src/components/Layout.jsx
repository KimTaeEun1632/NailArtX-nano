import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header dark={dark} setDark={setDark} />
      <main className="flex-1 pt-[60px] lg:pt-[64px]">
        <Outlet context={{ dark, setDark }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
