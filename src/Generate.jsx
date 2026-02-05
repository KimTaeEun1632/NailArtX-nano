import { useState } from "react";
import axios from "axios";
import GeneratorLayout from "./components/layout/GeneratorLayout";
import ImageCanvas from "./components/canvas/ImageCanvas";
import Sidebar from "./components/Sidebar";
import { buildPrompt } from "./utils/buildPrompt";

const API_URL =
  "https://nail-art-api-308254581496.asia-northeast3.run.app/generate";

export default function Generate() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [level, setLevel] = useState(null);
  const [shape, setShape] = useState(null);
  const [length, setLength] = useState(null);
  const [artStyles, setArtStyles] = useState([]);
  const [selectedQuickStyles, setSelectedQuickStyles] = useState([]);
  const [selectedTrendColors, setSelectedTrendColors] = useState([]);

  console.log("스타일:", selectedQuickStyles);
  // const isGenerateDisabled = !level || !keyword.trim() || loading;

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
      console.error(err);
      alert("이미지 생성 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GeneratorLayout
      sidebar={
        <Sidebar
          keyword={keyword}
          setKeyword={setKeyword}
          level={level}
          setLevel={setLevel}
          onGenerate={generate}
          loading={loading}
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
        />
      }
      canvas={<ImageCanvas img={img} loading={loading} />}
    />
  );
}
