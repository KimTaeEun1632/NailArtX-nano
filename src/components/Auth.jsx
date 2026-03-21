import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "../supabase";
import { useLanguage } from "../contexts/LanguageContext";
import Turnstile from "react-turnstile";

export default function Auth({ onClose, returnUrl, initialIsSignUp = false }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const validatePassword = (pw) => {
    if (!pw) return false;
    if (pw.length < 10) return false;
    if (!/[a-z]/.test(pw)) return false;
    if (!/[A-Z]/.test(pw)) return false;
    if (!/[0-9]/.test(pw)) return false;
    if (!/[^A-Za-z0-9]/.test(pw)) return false;
    return true;
  };

  const handleAuth = async (data) => {
    setErrorMessage("");
    
    if (!isForgotPassword && !captchaToken) {
      setErrorMessage("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);
    const { email, password } = data;

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
          captchaToken,
        });
        if (error) throw error;
        alert("Password reset email sent! Check your inbox.");
        setIsForgotPassword(false);
        reset();
      } else if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { captchaToken }
        });
        if (error) throw error;
        
        // If enumeration protection is OFF, we might get an error above.
        // If it's ON, Supabase returns a user but with no session and identities might be empty if already exists.
        // However, the most reliable way to show "Email already in use" is to handle the error thrown by Supabase
        // when enumeration protection is disabled in the dashboard.
        
        if (data?.user && data.user.identities && data.user.identities.length === 0) {
          setErrorMessage(t("auth.emailInUse"));
          setLoading(false);
          return;
        }

        alert(t("auth.checkEmail"));
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
          options: { captchaToken }
        });
        if (error) throw error;
        
        if (returnUrl) {
          navigate(returnUrl);
        }
        onClose();
      }
    } catch (error) {
      console.error("Auth error:", error);
      let msg = t("auth.genericError");
      
      if (error.message === "Invalid login credentials") {
        msg = t("auth.invalidCredentials");
      } else if (error.message === "User already registered") {
        msg = t("auth.emailInUse");
      } else if (error.status === 422 || error.message?.includes("email")) {
        msg = t("auth.invalidEmail");
      } else {
        msg = error.message || t("auth.genericError");
      }
      
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const redirectTo = returnUrl 
        ? `${window.location.origin}${returnUrl}`
        : window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      });
      if (error) throw error;
    } catch (error) {
      setErrorMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
    setErrorMessage("");
    reset();
  };

  const switchToForgotPassword = () => {
    setIsForgotPassword(true);
    setErrorMessage("");
    reset();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            {isForgotPassword
              ? t("auth.resetPassword")
              : isSignUp
                ? t("auth.createAccount")
                : t("auth.welcome")}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {!isForgotPassword && (
          <>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t("auth.google")}
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                or
              </span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit(handleAuth)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t("auth.email")}
            </label>
            <input
              type="email"
              {...register("email", { 
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("auth.invalidEmail")
                }
              })}
              className={`w-full px-4 py-3 rounded-xl border dark:bg-slate-900 dark:text-white focus:ring-2 outline-none ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-800 focus:ring-primary"
              }`}
              placeholder="name@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          {!isForgotPassword && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t("auth.password")}
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    validate: isSignUp ? validatePassword : undefined
                  })}
                  className={`w-full px-4 py-3 rounded-xl border dark:bg-slate-900 dark:text-white focus:ring-2 outline-none ${
                    isSignUp && password && !validatePassword(password)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-200 dark:border-slate-800 focus:ring-primary"
                  }`}
                  placeholder={t("auth.passwordHint")}
                />
                {isSignUp && (
                  <p className={`mt-1 text-[11px] ${
                    password && !validatePassword(password)
                      ? "text-red-500 font-medium"
                      : "text-slate-500 dark:text-slate-400"
                  }`}>
                    * {t("auth.passwordHint")}
                  </p>
                )}
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t("auth.confirmPassword")}
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: isSignUp,
                      validate: (val) => {
                        if (isSignUp && watch("password") !== val) {
                          return t("auth.passwordMismatch");
                        }
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl border dark:bg-slate-900 dark:text-white focus:ring-2 outline-none ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-slate-200 dark:border-slate-800 focus:ring-primary"
                    }`}
                    placeholder={t("auth.confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>
              )}
            </>
          )}

          <div className="flex justify-center py-2">
            <Turnstile
              sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY || ""}
              onVerify={(token) => setCaptchaToken(token)}
              theme="light"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500 text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || (!isForgotPassword && !captchaToken)}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            {loading
              ? t("auth.processing")
              : isForgotPassword
                ? t("auth.sendReset")
                : isSignUp
                  ? t("auth.signup")
                  : t("auth.login")}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3 text-center">
          {!isForgotPassword && !isSignUp && (
            <button
              onClick={switchToForgotPassword}
              className="text-sm text-slate-500 hover:text-primary font-medium"
            >
              {t("auth.forgotPassword")}
            </button>
          )}
          <button
            onClick={toggleMode}
            className="text-sm text-primary hover:underline font-medium"
          >
            {isForgotPassword
              ? t("auth.backToLogin")
              : isSignUp
                ? t("auth.hasAccount")
                : t("auth.noAccount")}
          </button>
        </div>
      </div>
    </div>
  );
}
