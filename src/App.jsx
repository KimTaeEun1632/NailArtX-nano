import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "./contexts/LanguageContext";
import Landing from "./Landing";
import Generate from "./Generate";
import MyPage from "./pages/MyPage";
import ResetPassword from "./pages/ResetPassword";
import Layout from "./components/Layout";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { t } = useLanguage();

  // URL 해시를 체크하여 초기 상태 결정 (useEffect 내 동기적 setState 방지)
  const [showVerifyToast, setShowVerifyToast] = useState(() => {
    return window.location.hash && window.location.hash.includes("type=signup");
  });

  useEffect(() => {
    if (showVerifyToast) {
      // Clean up the hash from the URL
      window.history.replaceState(null, "", window.location.pathname);

      // Auto-hide toast after 5 seconds
      const timer = setTimeout(() => {
        setShowVerifyToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showVerifyToast]);

  return (
    <>
      {showVerifyToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-200 w-[90%] max-w-md bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex justify-between items-center animate-bounce">
          <span className="font-bold">{t("auth.emailVerified")}</span>
          <button
            onClick={() => setShowVerifyToast(false)}
            className="ml-4 hover:opacity-70"
          >
            ✕
          </button>
        </div>
      )}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/generate" element={<Generate />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/mypage" element={<MyPage />} />
          </Route>

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
        </Route>
      </Routes>
    </>
  );
}
