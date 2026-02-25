import { ART_STYLES } from "../constants/artStyles";
import { QUICK_STYLE_MAP } from "../constants/quickStyleMap";
import { TREND_COLOR_MAP } from "../constants/trendColorMap";

/* -----------------------------
Level Prompt Map (Base)
------------------------------ */
const LEVEL_PROMPT_MAP = {
  beginner: `
A realistic, high-resolution close-up macro shot of five artificial nails, suitable for beginner or self nail art.
The nail designs are based on the theme: {{KEYWORD}}.
The set may include repeated or similar designs across multiple nails, allowing simple pattern structures.
Each nail features easy-to-recreate styles with minimal details, such as solid colors, basic glitter, simple lines, or soft gradients.
The lighting is natural and soft, clearly showing the nails without dramatic effects.
The background is clean and neutral to keep the focus on practical, achievable nail art.
Realistic photography style.
`,

  salon: `
A high-quality, realistic close-up macro shot of five artificial nails designed for professional salon use.
The nail art is inspired by the theme: {{KEYWORD}}.
The set can include a mix of repeated and varied designs, forming natural salon-style patterns.
Each nail displays clean, trendy, and client-ready nail art using moderate techniques such as subtle chrome accents, glitter, ombre, or simple 3D elements.
Studio lighting highlights neat finishes and glossy top coats.
The background is modern and minimal, suitable for a nail salon portfolio.
`,

  advanced: `
A hyper-realistic, high-resolution close-up macro shot of five artificial nails created by a professional nail artist.
The designs are centered around the theme: {{KEYWORD}}.
The nail set may include both repeated and varied designs, allowing artistic pattern compositions across the five nails.
Each nail showcases complex, detailed, and fashionable nail art using advanced techniques such as chrome powder, layered 3D gel, refined ombre effects, and artistic textures.
Studio-quality cinematic lighting emphasizes texture, depth, and glossy reflections.
The background is a clean, modern aesthetic such as marble or soft beige.
Photorealistic, 8k quality.
`,
};

export function buildPrompt({
  keyword,
  level,
  selectedQuickStyles = [],
  selectedTrendColors = [],
  artStyles = [],
  shape,
  length,
}) {
  if (!keyword) return "";

  let prompt = LEVEL_PROMPT_MAP[level || "salon"].replace("{{KEYWORD}}", keyword);

  /* Quick Style */
  if (selectedQuickStyles.length > 0) {
    const quickStylePrompt = selectedQuickStyles
      .map((id) => QUICK_STYLE_MAP[id]?.prompt)
      .filter(Boolean)
      .join(", ");

    prompt += `\n\nOverall style direction: ${quickStylePrompt}.`;
  }

  /* Trend Colors */
  if (selectedTrendColors.length > 0) {
    const colorPrompt = selectedTrendColors
      .map((id) => TREND_COLOR_MAP[id]?.prompt)
      .filter(Boolean)
      .join(", ");

    prompt += `\n\nColor palette focus: ${colorPrompt}.`;
  }

  /* Shape / Length */
  if (shape || length) {
    const shapeParts = [];
    if (shape) shapeParts.push(shape);
    if (length) shapeParts.push(length);

    prompt += `\n\nNail shape and length: ${shapeParts.join(", ")}.`;
  }

  /* Art Styles (Techniques) */
  if (artStyles.length > 0) {
    const artStylePrompt = artStyles
      .map((key) => ART_STYLES[key]?.prompt)
      .filter(Boolean)
      .join(", ");

    prompt += `\n\nIncorporate the following nail art techniques: ${artStylePrompt}.`;
  }

  /* Final Quality Guard & Safety */
  prompt += `
Ensure the final result looks cohesive, aesthetically balanced, and suitable for the selected difficulty level.
Avoid overloading the design; maintain harmony between colors, techniques, and overall mood.
Strictly avoid any inappropriate, offensive, or NSFW content. Generate only clean, professional-quality nail art designs.
`;

  return prompt.trim();
}
