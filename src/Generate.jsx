import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import GeneratorLayout from "./components/layout/GeneratorLayout";
import Sidebar from "./components/Sidebar";
import { buildPrompt } from "./utils/buildPrompt";
import MainPanel from "./components/MainPanel";
import { useLanguage } from "./contexts/LanguageContext";

const API_URL = "/api/generate";

export default function Generate() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(localStorage.getItem("pro_order_id"));
  const [isPro, setIsPro] = useState(!!localStorage.getItem("pro_order_id"));
  const [usageCount, setUsageCount] = useState(() => {
    const saved = localStorage.getItem("nailart_usage_count");
    const lastReset = localStorage.getItem("nailart_usage_reset_date");
    const now = new Date();

    // Reset count if it's a new month
    if (lastReset) {
      const resetDate = new Date(lastReset);
      if (
        now.getMonth() !== resetDate.getMonth() ||
        now.getFullYear() !== resetDate.getFullYear()
      ) {
        localStorage.setItem("nailart_usage_count", "0");
        localStorage.setItem("nailart_usage_reset_date", now.toISOString());
        return 0;
      }
    } else {
      localStorage.setItem("nailart_usage_reset_date", now.toISOString());
    }

    return saved ? parseInt(saved) : 0;
  });

  // Existing states restored
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

  useEffect(() => {
    const checkoutId = searchParams.get("checkout_id");
    if (checkoutId) {
      verifyPayment(checkoutId);
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem("nailart_usage_count", usageCount.toString());
  }, [usageCount]);

  async function verifyPayment(checkoutId) {
    try {
      const res = await axios.post("/api/verify", { checkoutId });
      if (res.data.success) {
        setIsPro(true);
        setOrderId(res.data.orderId);
        localStorage.setItem("pro_order_id", res.data.orderId);
        alert(t("generate.alerts.paymentVerified"));
      }
    } catch (err) {
      console.error("Verification failed", err);
    }
  }

  async function handleRefund() {
    if (!orderId) return;
    if (!window.confirm(t("generate.alerts.refundConfirm"))) return;

    try {
      const res = await axios.post("/api/refund", { orderId });
      if (res.data.id) {
        setIsPro(false);
        setOrderId(null);
        localStorage.removeItem("pro_order_id");
        alert(t("generate.alerts.refundSuccess"));
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
      console.log("Prompt:", prompt);

      const response = await axios.post(
        API_URL,
        { prompt, level, isPro, usageCount },
        { responseType: "arraybuffer", transformResponse: [] },
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
      setUsageCount((prev) => prev + 1);
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
