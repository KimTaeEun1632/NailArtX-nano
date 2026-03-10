import { createClient } from "@supabase/supabase-js";

// 지수 백오프와 지터를 사용한 재시도 헬퍼 함수
async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      // 503 (Service Unavailable) 또는 429 (Too Many Requests)인 경우 재시도
      if (response.status === 503 || response.status === 429) {
        const waitTime = Math.pow(2, i) * 1000 + Math.random() * 1000;
        console.warn(`Gemini API returned ${response.status}. Retrying in ${Math.round(waitTime)}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      return response;
    } catch (err) {
      lastError = err;
      const waitTime = Math.pow(2, i) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  throw lastError || new Error("Max retries reached");
}

export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const { prompt } = await request.json();

    // 1. Supabase 인증 확인
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase environment variables (VITE_SUPABASE_URL/ANON_KEY) are missing in the server environment.");
    }

    const accessToken = authHeader.replace("Bearer ", "");
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
    }

    // 2. DB에서 프로필 정보 조회
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), { status: 404 });
    }

    const isPro = profile.is_pro;
    const usageCount = profile.usage_count;
    
    // 모델 및 제한 설정
    const limit = isPro ? 80 : 5;
    // 초기 시도 모델 (Pro 사용자는 Pro 모델, 무료 사용자는 Flash 모델)
    let modelName = isPro ? "gemini-3-pro-image-preview" : "gemini-2.5-flash-image";

    if (usageCount >= limit) {
      return new Response(JSON.stringify({ 
        error: isPro ? "Monthly limit reached (80/80)" : "Free limit reached (5/5). Please upgrade to Pro!" 
      }), { status: 403 });
    }

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }

    let finalPrompt = prompt;
    if (!isPro) {
      finalPrompt = `${prompt}. Important: Please include a small, elegant 'NailArtX' text watermark at the bottom right corner of the image.`;
    }

    // 3. Gemini API 호출 (재시도 및 폴백 로직 포함)
    const apiVersion = "v1beta";
    const apiOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
        generationConfig: {
          responseModalities: ["IMAGE"],
        },
      }),
    };

    let response = await fetchWithRetry(
      `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent`,
      apiOptions
    );

    // Pro 모델이 여전히 503 또는 에러인 경우 Flash 모델로 폴백 시도
    if (!response.ok && isPro && (response.status === 503 || response.status === 500)) {
      console.warn("Pro model failed, attempting fallback to Flash model...");
      modelName = "gemini-2.5-flash-image";
      response = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent`,
        apiOptions
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Final Error:", JSON.stringify(errorData));
      return new Response(JSON.stringify({ error: "AI Generation failed after retries", detail: errorData }), { status: response.status });
    }

    const data = await response.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart) {
      return new Response(JSON.stringify({ error: "No image data in AI response", raw: data }), { status: 500 });
    }

    const { data: base64, mimeType } = imagePart.inlineData;
    const imageBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    // 4. 사용량 업데이트
    await supabase
      .from("profiles")
      .update({ usage_count: usageCount + 1 })
      .eq("id", user.id);

    return new Response(imageBuffer, {
      headers: { "Content-Type": mimeType ?? "image/png" },
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return new Response(JSON.stringify({ error: "Generation failed", detail: String(err) }), { status: 500 });
  }
};
