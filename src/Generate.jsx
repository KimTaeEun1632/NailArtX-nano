import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { supabase } from "./supabase";
import GeneratorLayout from "./components/layout/GeneratorLayout";
import Sidebar from "./components/Sidebar";
import { buildPrompt } from "./utils/buildPrompt";
import MainPanel from "./components/MainPanel";
import { useLanguage } from "./contexts/LanguageContext";

const API_URL = "/api/generate";

export default function Generate() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  // DB에서 프로필 정보 로드
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      // 프로필이 없는 경우 (기존 유저 등) 생성 시도
      if (error && error.code === "PGRST116") {
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user.id, email: user.email }])
          .select()
          .single();
        
        if (!insertError) {
          profile = newProfile;
        }
      }

      if (profile) {
        setIsPro(profile.is_pro);
        setUsageCount(profile.usage_count);

        // 월간 초기화 로직 (DB 기반)
        const now = new Date();
        const lastReset = new Date(profile.last_reset_date);
        if (
          now.getMonth() !== lastReset.getMonth() ||
          now.getFullYear() !== lastReset.getFullYear()
        ) {
          const { data: updatedProfile } = await supabase
            .from("profiles")
            .update({ usage_count: 0, last_reset_date: now.toISOString() })
            .eq("id", user.id)
            .select()
            .single();
          if (updatedProfile) {
            setUsageCount(0);
          }
        }
      }
    };
    loadProfile();
  }, []);

  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [level, setLevel] = useState(null);
  const [shape, setShape] = useState(null);
  const [length, setLength] = useState(null);
  const [artStyles, setArtStyles] = useState([]);
  const [selectedQuickStyles, setSelectedQuickStyles] = useState([]);
  const [selectedTrendColors, setSelectedTrendColors] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const verifyPayment = useCallback(
    async (checkoutId) => {
      try {
        const res = await axios.post("/api/verify", { checkoutId });
        if (res.data.success) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase
              .from("profiles")
              .update({ is_pro: true })
              .eq("id", user.id);
            setIsPro(true);
            setOrderId(res.data.orderId);
            localStorage.setItem("pro_order_id", res.data.orderId);
            alert(t("generate.alerts.paymentVerified"));
          }
        }
      } catch (err) {
        console.error("Verification failed", err);
      }
    },
    [t],
  );

  useEffect(() => {
    const checkoutId = searchParams.get("checkout_id");
    if (checkoutId) {
      verifyPayment(checkoutId);
    }
  }, [searchParams, verifyPayment]);

  async function handleRefund() {
    const currentOrderId = orderId || localStorage.getItem("pro_order_id");
    if (!currentOrderId) return;
    if (!window.confirm(t("generate.alerts.refundConfirm"))) return;

    try {
      const res = await axios.post("/api/refund", { orderId: currentOrderId });
      if (res.data.id) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("profiles")
            .update({ is_pro: false })
            .eq("id", user.id);
          setIsPro(false);
          setOrderId(null);
          localStorage.removeItem("pro_order_id");
          alert(t("generate.alerts.refundSuccess"));
        }
      }
    } catch (err) {
      console.error("Refund failed", err);
      alert(t("generate.alerts.error"));
    }
  }

  async function generate() {
    const limit = isPro ? 80 : 5;
    if (usageCount >= limit) {
      alert(
        isPro
          ? t("generate.alerts.limitReachedPro")
          : t("generate.alerts.limitReachedFree"),
      );
      return;
    }

    try {
      setLoading(true);
      setImg(null);

      const prompt = buildPrompt({
        keyword,
        level,
        selectedQuickStyles,
        selectedTrendColors,
        artStyles,
        shape,
        length,
      });

      const { data: { session } } = await supabase.auth.getSession();
      const response = await axios.post(
        API_URL,
        { prompt, level, isPro, usageCount },
        { 
          responseType: "arraybuffer", 
          transformResponse: [],
          headers: {
            Authorization: `Bearer ${session?.access_token}`
          }
        },
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "image/png",
      });

      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      setImg(dataUrl);

      // DB 사용량 업데이트
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const newCount = usageCount + 1;
        await supabase
          .from("profiles")
          .update({ usage_count: newCount })
          .eq("id", user.id);
        setUsageCount(newCount);
      }
    } catch (err) {
      if (err.response?.data instanceof ArrayBuffer) {
        const text = new TextDecoder().decode(err.response.data);
        console.error("Error content:", text);
        try {
          const errorJson = JSON.parse(text);
          alert(errorJson.error || t("generate.alerts.error"));
        } catch (e) {
          console.error(e);
          alert(t("generate.alerts.error"));
        }
      } else {
        console.error(err);
        alert(t("generate.alerts.error"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <GeneratorLayout
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      sidebar={
        <Sidebar
          level={level}
          setLevel={setLevel}
          shape={shape}
          setShape={setShape}
          length={length}
          setLength={setLength}
          artStyles={artStyles}
          setArtStyles={setArtStyles}
          selectedQuickStyles={selectedQuickStyles}
          setSelectedQuickStyles={setSelectedQuickStyles}
          selectedTrendColors={selectedTrendColors}
          setSelectedTrendColors={setSelectedTrendColors}
          isSidebarOpen={isSidebarOpen}
        />
      }
      main={
        <MainPanel
          img={img}
          loading={loading}
          keyword={keyword}
          setKeyword={setKeyword}
          onGenerate={generate}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isPro={isPro}
          onRefund={handleRefund}
        />
      }
    />
  );
}
