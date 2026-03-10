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
    const { prompt } = await request.json();

    // 1. Supabase 인증 확인
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase environment variables missing.");
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

    let finalPrompt = prompt;
    if (!isPro) {
      finalPrompt = `${prompt}. Important: Please include a small, elegant 'NailArtX' text watermark at the bottom right corner of the image.`;
    }

    // 3. 메인 엔진 시도 (Gemini API)
    const apiVersion = "v1beta";
    let modelName = isPro ? "gemini-3-pro-image-preview" : "gemini-2.5-flash-image";
    
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

    let response = await fetchWithRetry(
      `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent`,
      apiOptions
    );

    // Pro 모델 실패 시 Flash 모델로 폴백
    if ((!response || !response.ok) && isPro) {
      console.warn("Gemini Pro failed, attempting Gemini Flash fallback...");
      modelName = "gemini-2.5-flash-image";
      response = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent`,
        apiOptions
      );
    }

    // 4. 최종 백업 엔진 시도 (Cloudflare Workers AI - SDXL)
    // 구글 API가 완전히 응답하지 않거나 에러인 경우 실행
    if (!response || !response.ok) {
      console.error("All Gemini attempts failed. Activating Cloudflare Workers AI Fallback...");
      
      if (env.AI) {
        try {
          // SDXL 모델에 최적화된 프롬프트 튜닝 (네일아트 특화 키워드 추가)
          const sdxlPrompt = `(hyper-realistic nail art:1.2), macro photography of a hand with decorated nails, 8k resolution, professional studio lighting, focus on nails, ${finalPrompt}`;
          
          const aiResponse = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
            prompt: sdxlPrompt,
            num_steps: 25, // 퀄리티와 속도의 균형
          });

          // Cloudflare AI는 이미지를 Uint8Array 또는 Stream 형태로 반환합니다.
          const imageBuffer = aiResponse instanceof Response ? await aiResponse.arrayBuffer() : aiResponse;

          // 사용량 업데이트 (백업 생성도 횟수에 포함)
          await supabase.from("profiles").update({ usage_count: usageCount + 1 }).eq("id", user.id);

          return new Response(imageBuffer, {
            headers: { "Content-Type": "image/png", "X-Engine": "Cloudflare-AI" },
          });
        } catch (aiErr) {
          console.error("Cloudflare AI Fallback also failed:", aiErr);
        }
      } else {
        console.warn("Cloudflare AI binding not found. Skipping fallback.");
      }
    }

    // Gemini 응답 처리 (성공한 경우)
    if (response && response.ok) {
      const data = await response.json();
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find((p) => p.inlineData);

      if (imagePart) {
        const { data: base64, mimeType } = imagePart.inlineData;
        const imageBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

        await supabase.from("profiles").update({ usage_count: usageCount + 1 }).eq("id", user.id);

        return new Response(imageBuffer, {
          headers: { "Content-Type": mimeType ?? "image/png", "X-Engine": "Gemini" },
        });
      }
    }

    // 모든 시도가 실패한 경우
    return new Response(JSON.stringify({ 
      error: "Service temporarily unavailable. Our AI engines are currently under heavy load. Please try again in a few minutes." 
    }), { status: 503 });

  } catch (err) {
    console.error("Internal Server Error:", err);
    return new Response(JSON.stringify({ error: "Generation failed", detail: String(err) }), { status: 500 });
  }
};
