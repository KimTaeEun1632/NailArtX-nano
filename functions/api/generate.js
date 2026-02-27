// functions/generate.ts
export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent",
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
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
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
