import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import GeneratorLayout from "./components/layout/GeneratorLayout";
import Sidebar from "./components/Sidebar";
import { buildPrompt } from "./utils/buildPrompt";
import MainPanel from "./components/MainPanel";

const API_URL = "/api/generate";

export default function Generate() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(localStorage.getItem("pro_order_id"));
  const [isPro, setIsPro] = useState(!!localStorage.getItem("pro_order_id"));

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

  async function verifyPayment(checkoutId) {
    try {
      const res = await axios.post("/api/verify", { checkoutId });
      if (res.data.success) {
        setIsPro(true);
        setOrderId(res.data.orderId);
        localStorage.setItem("pro_order_id", res.data.orderId);
        alert("Payment Verified! Welcome to Pro.");
      }
    } catch (err) {
      console.error("Verification failed", err);
    }
  }

  async function handleRefund() {
    if (!orderId) return;
    if (!window.confirm("Are you sure you want to refund your purchase?"))
      return;

    try {
      const res = await axios.post("/api/refund", { orderId });
      if (res.data.id) {
        setIsPro(false);
        setOrderId(null);
        localStorage.removeItem("pro_order_id");
        alert("Refund successful. Your Pro access has been revoked.");
      }
    } catch (err) {
      console.error("Refund failed", err);
      alert("Refund failed. Please contact support.");
    }
  }

  async function generate() {
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
      console.log("완성된 프롬프트:", prompt);

      const response = await axios.post(
        API_URL,
        { prompt, level },
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
    } catch (err) {
      if (err.response?.data instanceof ArrayBuffer) {
        const text = new TextDecoder().decode(err.response.data);
        console.error("에러 내용:", text);
      }
      console.error(err);
      alert("이미지 생성 실패");
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
