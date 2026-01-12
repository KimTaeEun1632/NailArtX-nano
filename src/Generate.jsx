import { useState } from "react";
import axios from "axios";
import LiveBackground from "./components/LiveBackground";

const API_URL =
  "https://nail-art-api-308254581496.asia-northeast3.run.app/generate";

export default function Generate() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [level, setLevel] = useState(null);

  const isGenerateDisabled = !level || !keyword.trim() || loading;

  async function generate() {
    try {
      setLoading(true);
      setImg(null);

      const response = await axios.post(
        API_URL,
        { keyword, level },
        { responseType: "arraybuffer", transformResponse: [] }
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
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-white min-h-screen flex flex-col items-center">
      {/* Main */}
      <main className="flex w-full max-w-4xl flex-1 flex-col items-center px-4 py-8 sm:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Your AI-generated nail art design
        </h1>
        <p className="mt-2 text-center text-slate-600 dark:text-slate-400">
          Describe your vision, and the AI will create a stunning nail design.
        </p>

        {/* 난이도 선택 버튼 */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setLevel("beginner")}
            className={`px-5 py-2.5 rounded-full font-medium transition-all border ${
              level === "beginner"
                ? "bg-yellow-500 text-white border-yellow-600 shadow-lg scale-105"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
            }`}
          >
            ⭐ Beginner / 셀프네일
          </button>

          <button
            onClick={() => setLevel("salon")}
            className={`px-5 py-2.5 rounded-full font-medium transition-all border ${
              level === "salon"
                ? "bg-blue-500 text-white border-blue-600 shadow-lg scale-105"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
            }`}
          >
            ⭐⭐ Salon-ready / 네일샵용
          </button>

          <button
            onClick={() => setLevel("advanced")}
            className={`px-5 py-2.5 rounded-full font-medium transition-all border ${
              level === "advanced"
                ? "bg-purple-600 text-white border-purple-700 shadow-lg scale-105"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
            }`}
          >
            ⭐⭐⭐ Advanced / 포트폴리오용
          </button>
        </div>

        {/* Image Box */}
        <div className="mt-8 w-full">
          <div className="w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center overflow-hidden aspect-video">
            {img ? (
              <img
                src={img}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : loading ? (
              <>
                <p>Generating...</p>
                <LiveBackground />
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-slate-600">
                  image
                </span>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Your generated image will appear here
                </p>
              </>
            )}
          </div>
        </div>

        {/* Input Container */}
        <div className="mt-8 w-full max-w-3xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Text Input */}
            <div className="lg:col-span-2">
              <label className="flex w-full flex-col">
                <p className="pb-2 text-sm font-medium">Describe your vision</p>
                <div className="relative flex w-full items-center">
                  <input
                    className="form-input h-12 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent pl-4"
                    placeholder="e.g., snowflake nail art with chrome"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </label>
            </div>

            {/* Generate Button */}
            <div className="lg:self-end">
              <button
                onClick={generate}
                disabled={isGenerateDisabled}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90"
              >
                <span className="material-symbols-outlined">Auto awesome</span>
                Generate
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
