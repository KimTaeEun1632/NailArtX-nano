import { createClient } from "@supabase/supabase-js";

export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const { prompt } = await request.json();

    // 1. Supabase 인증 확인 (유저 세션 확인)
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
    }

    // 2. DB에서 실제 Pro 상태와 사용량 조회
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
      return new Response(JSON.stringify({ error: "Limit reached" }), { status: 403 });
    }

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }

    let finalPrompt = prompt;
    if (!isPro) {
      finalPrompt = `${prompt}. Important: Please include a small, elegant 'NailArtX' text watermark at the bottom right corner of the image.`;
    }

    // Gemini API 호출 (기존 로직 유지)
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(errorText, { status: response.status });
    }

    const data = await response.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart) {
      return new Response(JSON.stringify({ error: "No image returned" }), { status: 500 });
    }

    const { data: base64, mimeType } = imagePart.inlineData;
    const imageBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    // 3. 사용량 업데이트 (서버에서 직접)
    await supabase
      .from("profiles")
      .update({ usage_count: usageCount + 1 })
      .eq("id", user.id);

    return new Response(imageBuffer, {
      headers: { "Content-Type": mimeType ?? "image/png" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Generation failed", detail: String(err) }), { status: 500 });
  }
};
