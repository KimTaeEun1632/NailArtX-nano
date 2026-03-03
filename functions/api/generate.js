// functions/generate.js
export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const { prompt, isPro, usageCount } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Limit check (Simple server-side enforcement)
    const limit = isPro ? 80 : 5;
    if (usageCount >= limit) {
       return new Response(JSON.stringify({ error: "Monthly limit reached. Please upgrade or wait until next month." }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    let finalPrompt = prompt;
    if (!isPro) {
      // Free users: Add watermark instruction to the AI
      finalPrompt = `${prompt}. Important: Please include a small, elegant 'NailArtX' text watermark at the bottom right corner of the image.`;
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", // Updated to a more stable model name if needed, but kept original structure
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: finalPrompt }],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE"],
          },
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
      return new Response(
        JSON.stringify({ error: "No image returned", raw: data }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const { data: base64, mimeType } = imagePart.inlineData;
    const imageBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": mimeType ?? "image/png",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Generation failed", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
