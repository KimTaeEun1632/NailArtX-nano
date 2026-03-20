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
  const [isPro, setIsPro] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      // 1. 유저 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }
      setUser(user);

      // 2. Supabase DB에서 프로필 정보 가져오기
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setIsPro(profile.is_pro);
        setUsageCount(profile.usage_count);
      } else if (error && error.code === "PGRST116") {
        // 프로필이 없는 경우 (기존 유저 등) 생성 시도
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert([{ id: user.id, email: user.email }])
          .select()
          .single();
        if (newProfile) {
          setIsPro(newProfile.is_pro);
          setUsageCount(newProfile.usage_count);
        }
      }

      setLoading(false);
    };
    checkStatus();
  }, [navigate]);

  const validatePassword = (password) => {
    return password && password.length >= 10;
  };

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

  const handleManageSubscription = async () => {
    if (!user?.email) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/customer-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to get customer session");
      }

      const { token } = await response.json();
      // 유저가 제공한 실제 작동하는 URL 구조를 기반으로 생성
      const orgSlug = "kimtaeeun1632s-org";
      const portalUrl = `https://polar.sh/${orgSlug}/portal/overview?customer_session_token=${token}&email=${encodeURIComponent(user.email)}`;

      window.open(portalUrl, "_blank");
    } catch (err) {
      console.error("Portal access error:", err);
      alert(
        "구독 관리 페이지에 접속할 수 없습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleUpgrade = async () => {
    setUpdating(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "bceb13a3-9999-438c-928c-e3935fcdb67e",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An error occurred during checkout. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmInput = t("mypage.confirmDeleteInput");
    if (confirmText !== confirmInput) {
      alert(
        t("mypage.deleteConfirmHint").replace(
          "{confirmText}",
          `'${confirmInput}'`,
        ),
      );
      return;
    }

    if (window.confirm(t("mypage.deleteConfirmAlert"))) {
      setUpdating(true);
      try {
        // 1. Supabase RPC 호출하여 계정 삭제
        const { error: rpcError } = await supabase.rpc("delete_self");

        if (rpcError) {
          throw new Error(
            rpcError.message || "Failed to delete account via RPC",
          );
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-background-dark dark:text-white">
        {t("common.loading")}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark py-12 px-4 lg:px-20 transition-colors">
      <div className="max-w-2xl mx-auto bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          {t("mypage.title")}
        </h1>

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-3xl font-black overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{(user?.email?.[0] || "U").toUpperCase()}</span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white mb-1">
              {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user?.email}
            </p>
          </div>
        </div>

        {/* 내 정보 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-slate-200">
            {t("mypage.myInfo")}
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t("mypage.email")}
            </p>
            <p className="font-medium dark:text-white">{user?.email}</p>
          </div>
        </section>

        {/* 구독 관리 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-slate-200">
            {t("mypage.subscription.title")}
          </h2>
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {t("mypage.subscription.status")}
                </p>
                {isPro && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">
                    Pro
                  </span>
                )}
              </div>
              <p className="text-xl font-bold dark:text-white">
                {isPro
                  ? t("mypage.subscription.pro")
                  : t("mypage.subscription.free")}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {t("mypage.subscription.limitInfo")
                  .replace("{count}", usageCount)
                  .replace("{limit}", isPro ? 80 : 5)}
              </p>
            </div>

            <div className="flex gap-3">
              {isPro ? (
                <button
                  onClick={handleManageSubscription}
                  className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  {t("mypage.subscription.manageBtn")}
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                >
                  {t("mypage.subscription.upgradeBtn")}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 비밀번호 재설정 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-slate-200">
            {t("mypage.changePassword")}
          </h2>
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
                autocomplete="new-password"
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
                autocomplete="new-password"
                className={`w-full px-4 py-3 rounded-xl border dark:bg-slate-900 dark:text-white focus:ring-2 outline-none transition-all ${
                  confirmPassword && newPassword !== confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-200 dark:border-slate-800 focus:ring-primary"
                }`}
                required
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {t("auth.passwordMismatch")}
                </p>
              )}
            </div>
            <button
              disabled={
                updating || !newPassword || newPassword !== confirmPassword
              }
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50"
            >
              {updating ? t("mypage.updating") : t("mypage.updateBtn")}
            </button>
          </form>
        </section>

        {/* 계정 관리 섹션 */}
        <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-4 text-red-500">
            {t("mypage.dangerZone")}
          </h2>
          <div className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            <p className="mb-2">{t("mypage.deleteDesc")}</p>
            <p>
              {t("mypage.deleteConfirmHint").split("{confirmText}")[0]}
              <span className="font-bold text-red-500 mx-1">
                {t("mypage.confirmDeleteInput")}
              </span>
              {t("mypage.deleteConfirmHint").split("{confirmText}")[1]}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={t("mypage.deletePlaceholder").replace(
                "{confirmText}",
                t("mypage.confirmDeleteInput"),
              )}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-red-100 dark:border-red-900/30 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={
                updating || confirmText !== t("mypage.confirmDeleteInput")
              }
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
