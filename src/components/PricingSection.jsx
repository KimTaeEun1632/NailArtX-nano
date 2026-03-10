import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const PricingSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkProStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkProStatus(session.user.id);
      } else {
        setIsPro(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkProStatus = async (userId) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_pro")
      .eq("id", userId)
      .single();
    
    if (profile) {
      setIsPro(profile.is_pro);
    }
  };

  const handleFreeAction = () => {
    navigate("/generate"); // ProtectedRoute handles redirect to /?auth=true if not logged in
  };

  const handleProAction = async () => {
    if (!session) {
      navigate("/generate"); // Redirect to login via ProtectedRoute
      return;
    }

    if (isPro) {
      alert(t("generate.alerts.alreadyPro"));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "bceb13a3-9999-438c-928c-e3935fcdb67e",
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert(t("generate.alerts.error"));
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      id: "free",
      name: t("pricing.free.name"),
      price: t("pricing.free.price"),
      period: t("pricing.free.period"),
      features: t("pricing.free.features"),
      cta: t("pricing.free.cta"),
      recommended: false,
      onClick: handleFreeAction,
    },
    {
      id: "pro",
      name: t("pricing.pro.name"),
      price: t("pricing.pro.price"),
      period: t("pricing.pro.period"),
      features: t("pricing.pro.features"),
      cta: t("pricing.pro.cta"),
      recommended: true,
      onClick: handleProAction,
    },
  ];

  return (
    <section className="px-6 py-24 lg:px-20 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-[#151118] dark:text-white">
            {t("pricing.title")}
          </h2>
          <p className="text-lg text-[#4a454e] dark:text-gray-400 max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative flex flex-col p-8 rounded-4xl
                ${plan.recommended 
                  ? "bg-primary text-white shadow-2xl shadow-primary/20 scale-105 z-10" 
                  : "bg-background-light dark:bg-white/5 border border-gray-100 dark:border-white/10"
                }
                transition-all duration-300
              `}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.recommended ? "text-white/80" : "text-[#7c6388] dark:text-gray-400"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-sm ${plan.recommended ? "text-white/60" : "text-gray-500"}`}>
                    / {plan.period}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-4 mb-8 grow">
                {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className={`size-5 ${plan.recommended ? "text-white" : "text-primary"}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className={plan.recommended ? "text-white/90" : "text-[#4a454e] dark:text-gray-300"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={plan.onClick}
                disabled={loading}
                className={`
                  inline-flex items-center justify-center h-14 rounded-2xl font-bold transition-all
                  ${plan.recommended 
                    ? "bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10" 
                    : "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20"
                  }
                  disabled:opacity-50
                `}
              >
                {loading && plan.id === "pro" ? t("common.loading") : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
