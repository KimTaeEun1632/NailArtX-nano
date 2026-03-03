import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// --- 디버깅 코드 시작 ---
console.log("--- Supabase Debug Info ---");
console.log("URL 주입 여부:", !!supabaseUrl);
console.log("Key 주입 여부:", !!supabaseAnonKey);

if (supabaseUrl) {
  console.log("URL 시작 부분:", supabaseUrl.substring(0, 15), "...");
}

if (supabaseAnonKey) {
  // Key가 'ey'로 시작하는지 확인 (정상적인 Supabase JWT anon key 여부)
  console.log("Key가 'ey'로 시작하는가?:", supabaseAnonKey.startsWith("ey"));
}
console.log("---------------------------");
// --- 디버깅 코드 끝 ---

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase environment variables are missing! Please check your .env file or deployment settings.",
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
);
