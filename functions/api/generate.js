import { createClient } from "@supabase/supabase-js";

// 지수 백오프와 지터를 사용한 재시도 헬퍼 함수
async function fetchWithRetry(url, options, maxRetries = 2) {
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
    } catch {
      const waitTime = Math.pow(2, i) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  return null; // 모든 재시도 실패 시 null 반환
}

export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const { prompt, model: requestedModel } = await request.json();

    // 1. Supabase 인증 확인
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
    const geminiKey = env.GEMINI_API_KEY;

    if (!supabaseUrl || !supabaseKey || !geminiKey) {
      const missing = [];
      if (!supabaseUrl) missing.push("VITE_SUPABASE_URL");
      if (!supabaseKey) missing.push("VITE_SUPABASE_ANON_KEY");
      if (!geminiKey) missing.push("GEMINI_API_KEY");
      
      console.error("Missing Environment Variables:", missing.join(", "));
      return new Response(JSON.stringify({ 
        error: "Server configuration error", 
        missing: missing 
      }), { status: 500 });
    }

    const accessToken = authHeader.replace("Bearer ", "");
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
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
    const limit = isPro ? 80 : 5;

    if (usageCount >= limit) {
      return new Response(JSON.stringify({ 
        error: isPro ? "Monthly limit reached (80/80)" : "Free limit reached (5/5). Please upgrade to Pro!" 
      }), { status: 403 });
    }

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }

    // 보안 강화: 프롬프트 길이 제한 (2000자)
    if (prompt.length > 2000) {
      return new Response(JSON.stringify({ error: "Prompt too long (max 2000 chars)" }), { status: 400 });
    }

    // 3. 모델 결정 및 검증
    // Pro 모델 리스트
    const proModels = ["gemini-3-pro-image-preview"];
    let finalModel = requestedModel || (isPro ? "gemini-3-pro-image-preview" : "gemini-2.5-flash-image");

    // Pro가 아닌데 Pro 모델을 요청한 경우 강제로 Flash 모델로 변경 (보안)
    if (!isPro && proModels.includes(finalModel)) {
      finalModel = "gemini-2.5-flash-image";
    }

    let finalPrompt = prompt;
    if (!isPro) {
      finalPrompt = `${prompt}. Important: Please include a small, elegant 'NailArtX' text watermark at the bottom right corner of the image.`;
    }

    // 4. 메인 엔진 시도 (Gemini API)
    const apiVersion = "v1beta";
    const apiOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
    };

    const response = await fetchWithRetry(
      `https://generativelanguage.googleapis.com/${apiVersion}/models/${finalModel}:generateContent`,
      apiOptions
    );

    // Gemini 응답 처리
    if (response && response.ok) {
      const data = await response.json();
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find((p) => p.inlineData);

      if (imagePart) {
        const { data: base64, mimeType } = imagePart.inlineData;
        const imageBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

        // RLS 강화 후에는 Service Role Key로만 업데이트 가능
        const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
        if (serviceKey) {
          try {
            const adminClient = createClient(supabaseUrl, serviceKey);
            await adminClient.from("profiles").update({ usage_count: usageCount + 1 }).eq("id", user.id);
          } catch (updateErr) {
            console.error("Failed to update usage count via service role:", updateErr);
          }
        }

        return new Response(imageBuffer, {
          headers: { 
            "Content-Type": mimeType, 
            "X-Engine": `Gemini-${finalModel}` 
          },
        });
      }
    }

    // 모든 시도가 실패하거나 응답 형식이 올바르지 않은 경우
    console.error("Gemini Generation failed:", response ? await response.text() : "No response");
    return new Response(JSON.stringify({ 
      error: "The AI engine is currently busy. Please try again in a few seconds." 
    }), { 
      status: 503,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Internal Server Error:", err);
    return new Response(JSON.stringify({ error: "Generation failed. Please try again later." }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
