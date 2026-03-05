import { createClient } from "@supabase/supabase-js";

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
    const modelName = isPro ? "gemini-3-pro-image-preview" : "gemini-2.5-flash-image";

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
      // 무료 사용자는 워터마크 추가 유도
      finalPrompt = `${prompt}. Important: Please include a small, elegant 'NailArtX' text watermark at the bottom right corner of the image.`;
    }

    // 3. Gemini API 호출 (사용자 제공 모델 및 설정 반영)
    const apiVersion = "v1beta";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent`,
      {
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
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", JSON.stringify(errorData));
      return new Response(JSON.stringify({ error: "AI Generation failed", detail: errorData }), { status: response.status });
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
