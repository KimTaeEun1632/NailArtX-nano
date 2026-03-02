import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const MyPage = () => {
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
      alert("비밀번호는 10자 이상이며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setUpdating(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert("Error updating password: " + error.message);
    } else {
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
    setUpdating(false);
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      alert("탈퇴 확인을 위해 'DELETE'를 정확히 입력해주세요.");
      return;
    }

    if (
      window.confirm(
        "정말로 계정을 삭제하시겠습니까? 모든 데이터가 즉시 삭제되며 이 작업은 되돌릴 수 없습니다.",
      )
    ) {
      setUpdating(true);
      try {
        // 1. Supabase RPC 호출하여 계정 삭제 (이름 변경: delete_self)
        const { error: rpcError } = await supabase.rpc("delete_self");

        if (rpcError) {
          throw new Error(rpcError.message || "Failed to delete account via RPC");
        }

        // 2. 로컬 세션 로그아웃
        await supabase.auth.signOut();
        alert("계정이 성공적으로 삭제되었습니다. 이용해 주셔서 감사합니다.");
        navigate("/");
      } catch (error) {
        console.error("Delete account error:", error);
        alert("오류가 발생했습니다: " + error.message);
      } finally {
        setUpdating(false);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-background-dark dark:text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark py-12 px-4 lg:px-20">
      <div className="max-w-2xl mx-auto bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">마이페이지</h1>

        {/* 내 정보 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-slate-200">내 정보</h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">이메일</p>
            <p className="font-medium dark:text-white">{user?.email}</p>
          </div>
        </section>

        {/* 비밀번호 재설정 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-slate-200">비밀번호 변경</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            비밀번호는 10자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.
          </p>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                새 비밀번호
              </label>
              <input
                type="password"
                placeholder="10자 이상, 대/소문자, 숫자, 특수문자 조합"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                비밀번호 확인
              </label>
              <input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border dark:bg-slate-900 dark:text-white focus:ring-2 outline-none ${
                  confirmPassword && newPassword !== confirmPassword 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-slate-200 dark:border-slate-800 focus:ring-primary"
                }`}
                required
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            <button
              disabled={updating || !newPassword || newPassword !== confirmPassword}
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50"
            >
              {updating ? "업데이트 중..." : "비밀번호 업데이트"}
            </button>
          </form>
        </section>

        {/* 계정 관리 섹션 */}
        <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-4 text-red-500">위험 구역</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            계정을 삭제하면 모든 디자인 기록과 결제 정보가 영구적으로 삭제됩니다.
            <br />
            확인을 위해 아래에 <span className="font-bold text-red-500">DELETE</span>를 입력해주세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="DELETE 입력"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-red-100 dark:border-red-900/30 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={updating || confirmText !== "DELETE"}
              className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
            >
              계정 탈퇴
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;
