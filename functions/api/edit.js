import { createClient } from "@supabase/supabase-js";

// Gemini API 호출을 위한 헬퍼 함수
async function callGemini(env, model, payload) {
  const apiVersion = "v1beta";
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "X-Goog-Api-Key": env.GEMINI_API_KEY
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // 내부 로그에는 남기되 클라이언트에는 최소 정보만 전달
    const errorText = await response.text();
    console.error(`Gemini API Error (${model}):`, errorText);
    throw new Error(`Gemini API Error: ${response.status}`);
  }

  return await response.json();
}

export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const { userMessage, baseImage } = await request.json();

    // 보안 강화: 입력값 검증
    if (!userMessage || userMessage.length > 1000) {
      return new Response(JSON.stringify({ error: "Invalid user message (max 1000 chars)" }), { status: 400 });
    }
    if (!baseImage || baseImage.length > 15 * 1024 * 1024) { // 약 15MB 제한
      return new Response(JSON.stringify({ error: "Image size too large" }), { status: 400 });
    }

    // 1. Supabase 인증 확인
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");
      return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
    }

    const accessToken = authHeader.replace("Bearer ", "");
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
    }

    // 2. DB에서 프로필 정보 조회 (Pro 전용 기능 여부 확인)
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_pro")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.is_pro) {
      return new Response(JSON.stringify({ error: "Pro subscription required for editing" }), { status: 403 });
    }

    // 3. Phase 1: The Brain (Gemini 2.5 Flash) - 의도 파악 및 프롬프트 생성
    const brainSystemPrompt = `
      You are the "Brain" of a professional AI Nail Art Editor. 
      Your role is to analyze user requests and translate them into precise, high-quality image editing prompts for the "Artist" model.

      GUIDELINES:
      1. Analyze the current design context (nail art on fingers).
      2. If user asks for a change in texture (e.g., "matte", "glossy"), apply it globally.
      3. If user specifies a finger (e.g., "index", "thumb"), target that specific area.
      4. Use professional nail terminology: "3D gems", "gradient ombré", "french tips", "marble effect", "cat-eye gel".
      5. Ensure style consistency across all 10 nails unless specified otherwise.

      TASK:
      Translate the user's message into a detailed prompt that Gemini 2.5 Flash Image can use to edit the existing photo.
      Keep the hand structure, skin tone, and background the same.

      Output format: JSON only.
      {
        "intent": "Brief summary",
        "detailed_prompt": "Professional prompt for the Artist model"
      }
    `;

    const brainPayload = {
      contents: [
        { role: "user", parts: [{ text: brainSystemPrompt + "\nUser message: " + userMessage }] }
      ],
      generationConfig: { responseMimeType: "application/json" }
    };

    const brainResponse = await callGemini(env, "gemini-2.5-flash", brainPayload);
    const brainResult = JSON.parse(brainResponse.candidates[0].content.parts[0].text);
    const finalEditPrompt = brainResult.detailed_prompt;

    // 4. Phase 2: The Artist (Gemini 2.5 Flash Image) - 이미지 수정
    const artistPayload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `Modify the provided nail art image based on this request: ${finalEditPrompt}. Keep the overall hand position and nail shapes consistent.` },
            {
              inlineData: {
                mimeType: "image/png",
                data: baseImage.split(',')[1] // Base64 데이터만 추출
              }
            }
          ]
        }
      ],
      generationConfig: { responseModalities: ["IMAGE"] }
    };

    const artistResponse = await callGemini(env, "gemini-2.5-flash-image", artistPayload);
    const imagePart = artistResponse.candidates[0].content.parts.find(p => p.inlineData);

    if (imagePart) {
      const { data: base64, mimeType } = imagePart.inlineData;
      const imageBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      return new Response(imageBuffer, {
        headers: { 
          "Content-Type": mimeType ?? "image/png", 
          "X-Engine": "Gemini-Pro-Editor",
          "X-Brain-Intent": brainResult.intent
        },
      });
    }

    throw new Error("Artist failed to generate image");

  } catch (err) {
    console.error("Edit API Error:", err);
    return new Response(JSON.stringify({ error: "Editing failed. Please try again later." }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
