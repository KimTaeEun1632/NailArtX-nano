import { createClient } from "@supabase/supabase-js";

// Gemini API 호출을 위한 헬퍼 함수
async function callGemini(env, model, payload) {
  const apiVersion = "v1beta";
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${model}): ${errorText}`);
  }

  return await response.json();
}

export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const { userMessage, baseImage, history } = await request.json();

    // 1. Supabase 인증 확인 (생략 가능하나 보안상 유지)
    // ... 기존 인증 로직 생략 (프로필 조회 등)

    // 2. Phase 1: The Brain (Gemini 2.5 Flash) - 의도 파악 및 프롬프트 생성
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

    // 3. Phase 2: The Artist (Gemini 2.5 Flash Image) - 이미지 수정
    // Gemini 2.5 Flash Image는 이미지와 텍스트를 함께 받아 수정을 처리합니다.
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

    throw new Error("Artist failed to generate image.");

  } catch (err) {
    console.error("Edit API Error:", err);
    return new Response(JSON.stringify({ error: "Editing failed", detail: String(err) }), { status: 500 });
  }
};
