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
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
  const [history, setHistory] = useState([]); // 이미지 히스토리 배열
  const [currentIndex, setCurrentIndex] = useState(-1); // 현재 선택된 이미지 인덱스
  const [level, setLevel] = useState(null);
  const [shape, setShape] = useState(null);
  const [length, setLength] = useState(null);
  const [artStyles, setArtStyles] = useState([]);
  const [selectedQuickStyles, setSelectedQuickStyles] = useState([]);
  const [selectedTrendColors, setSelectedTrendColors] = useState([]);
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash-image");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  // 현재 표시할 이미지 선택
  const currentImg = currentIndex >= 0 ? history[currentIndex] : null;

  // Pro 사용자라면 기본 모델을 Pro로 설정
  useEffect(() => {
    if (isPro) {
      setSelectedModel("gemini-3-pro-image-preview");
    }
  }, [isPro]);

  const verifyPayment = useCallback(
    async (checkoutId) => {
      try {
        const res = await axios.post("/api/verify", { checkoutId });
        if (res.data.success) {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            // GA4 Purchase Event
            if (window.gtag) {
              window.gtag("event", "purchase", {
                transaction_id: res.data.orderId || checkoutId,
                value: 14.99, // 실제 가격으로 조정 필요
                currency: "USD",
                items: [
                  {
                    item_id: "pro_subscription",
                    item_name: "Pro Subscription",
                  },
                ],
              });
            }

            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                is_pro: true,
                polar_customer_id: res.data.customerId, // Polar ID 저장
              })
              .eq("id", user.id);

            if (updateError) {
              console.error("DB Update Error:", updateError);
            } else {
              setIsPro(true);
              setOrderId(res.data.orderId);
              localStorage.setItem("pro_order_id", res.data.orderId);
              alert(t("generate.alerts.paymentVerified"));
            }
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
        const {
          data: { user },
        } = await supabase.auth.getUser();
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

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert(
          t("auth.loginRequired") ||
            "인증 세션이 만료되었습니다. 다시 로그인해주세요.",
        );
        setLoading(false);
        return;
      }

      const prompt = buildPrompt({
        keyword,
        level,
        selectedQuickStyles,
        selectedTrendColors,
        artStyles,
        shape,
        length,
        isPro,
      });

      const response = await axios.post(
        API_URL,
        { prompt, level, isPro, usageCount, model: selectedModel },
        {
          responseType: "arraybuffer",
          transformResponse: [],
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
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

      // 히스토리에 추가
      const newHistory = [...history, dataUrl];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);

      // GA4 Generate Success Event
      if (window.gtag) {
        window.gtag("event", "generate_success", {
          level: level,
          styles_count: artStyles.length,
          is_pro: isPro,
        });
      }

      // 사용량 상태만 로컬에서 업데이트 (백엔드에서 이미 DB 처리 완료)
      setUsageCount((prev) => prev + 1);
    } catch (err) {
      console.error("Generation Error:", err);

      // 서버에서 보내준 상세 에러 메시지 확인 (ArrayBuffer 처리)
      if (err.response && err.response.data) {
        try {
          const decoder = new TextDecoder("utf-8");
          const errorText = decoder.decode(err.response.data);
          const errorJson = JSON.parse(errorText);
          if (errorJson.error) {
            let msg = `${t("generate.alerts.error")}\n\n사유: ${errorJson.error}`;
            if (errorJson.detail) msg += `\n상세: ${errorJson.detail}`;
            if (errorJson.status) msg += ` (HTTP ${errorJson.status})`;
            alert(msg);
            return;
          }
        } catch (e) {
          console.error("Failed to parse error response:", e);
        }
      }

      alert(t("generate.alerts.error"));
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(userMessage) {
    if (!currentImg) return;
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await axios.post(
        "/api/edit",
        { userMessage, baseImage: currentImg },
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
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

      // 수정된 이미지도 히스토리에 추가 (베리에이션)
      const newHistory = [...history, dataUrl];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    } catch (err) {
      console.error("Edit failed", err);
      alert(t("generate.alerts.error"));
    } finally {
      setLoading(false);
    }
  }

  const handleNew = () => {
    setCurrentIndex(-1);
    setKeyword("");
    // 필요하다면 스타일들도 초기화할 수 있지만, 여기서는 프롬프트와 선택만 초기화합니다.
  };

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
          setIsSidebarOpen={setIsSidebarOpen}
          isPro={isPro}
        />
      }
      main={
        <MainPanel
          img={currentImg}
          history={history}
          currentIndex={currentIndex}
          onSelectHistory={setCurrentIndex}
          loading={loading}
          keyword={keyword}
          setKeyword={setKeyword}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onGenerate={generate}
          onEdit={handleEdit}
          onNew={handleNew}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isPro={isPro}
          onRefund={handleRefund}
        />
      }
    />
  );
}
