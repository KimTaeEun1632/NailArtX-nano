import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useLanguage } from "../contexts/LanguageContext";

const MyPage = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pw) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return regex.test(pw);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/"); // 로그인 안 되어 있으면 홈으로
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, [navigate]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      alert(t("auth.passwordHint"));
      return;
    }

    if (newPassword !== confirmPassword) {
      alert(t("auth.passwordMismatch"));
      return;
    }

    setUpdating(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(t("mypage.deleteError") + error.message);
    } else {
      alert(t("mypage.successPassword"));
      setNewPassword("");
      setConfirmPassword("");
    }
    setUpdating(false);
  };

  const handleDeleteAccount = async () => {
    const confirmInput = t("mypage.confirmDeleteInput");
    if (confirmText !== confirmInput) {
      alert(t("mypage.deleteConfirmHint").replace("{confirmText}", `'${confirmInput}'`));
      return;
    }

    if (
      window.confirm(
        t("mypage.deleteConfirmAlert"),
      )
    ) {
      setUpdating(true);
      try {
        // 1. Supabase RPC 호출하여 계정 삭제
        const { error: rpcError } = await supabase.rpc("delete_self");

        if (rpcError) {
          throw new Error(rpcError.message || "Failed to delete account via RPC");
        }

        // 2. 로컬 세션 로그아웃
        await supabase.auth.signOut();
        alert(t("mypage.deleteSuccess"));
        navigate("/");
      } catch (error) {
        console.error("Delete account error:", error);
        alert(t("mypage.deleteError") + error.message);
      } finally {
        setUpdating(false);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-background-dark dark:text-white">{t("common.loading")}</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark py-12 px-4 lg:px-20 transition-colors">
      <div className="max-w-2xl mx-auto bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">{t("mypage.title")}</h1>

        {/* 내 정보 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-slate-200">{t("mypage.myInfo")}</h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t("mypage.email")}</p>
            <p className="font-medium dark:text-white">{user?.email}</p>
          </div>
        </section>

        {/* 비밀번호 재설정 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-slate-200">{t("mypage.changePassword")}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {t("auth.passwordHint")}
          </p>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t("mypage.newPassword")}
              </label>
              <input
                type="password"
                placeholder={t("auth.passwordHint")}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t("mypage.confirmPassword")}
              </label>
              <input
                type="password"
                placeholder={t("mypage.confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border dark:bg-slate-900 dark:text-white focus:ring-2 outline-none transition-all ${
                  confirmPassword && newPassword !== confirmPassword 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-slate-200 dark:border-slate-800 focus:ring-primary"
                }`}
                required
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{t("auth.passwordMismatch")}</p>
              )}
            </div>
            <button
              disabled={updating || !newPassword || newPassword !== confirmPassword}
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50"
            >
              {updating ? t("mypage.updating") : t("mypage.updateBtn")}
            </button>
          </form>
        </section>

        {/* 계정 관리 섹션 */}
        <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-4 text-red-500">{t("mypage.dangerZone")}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            {t("mypage.deleteDesc")}
            <br />
            {t("mypage.deleteConfirmHint").replace("{confirmText}", <span className="font-bold text-red-500">{t("mypage.confirmDeleteInput")}</span>)}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={t("mypage.deletePlaceholder").replace("{confirmText}", t("mypage.confirmDeleteInput"))}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-red-100 dark:border-red-900/30 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={updating || confirmText !== t("mypage.confirmDeleteInput")}
              className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {t("mypage.deleteBtn")}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;
