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

const PRO_SPEC_MAP = {
  shapes: {
    almond: "sculpted almond shape with a precise 1/3 back apex for structural integrity",
    stiletto: "razor-sharp stiletto point with a balanced architectural apex",
    ballerina: "modern ballerina silhouette with tapered sides and a flat squared-off edge",
    coffin: "architectural coffin shape, perfectly sculpted with a high-definition C-curve",
    square: "defined square edges with parallel sidewalls and a central apex for strength",
  },
  materials: "utilizing 2026 tech: 5D molding gel, plastiline textures, and builder gel overlays for hyper-realistic depth. High-gloss no-wipe top coat finish.",
  lighting: "professional studio softbox lighting, macro photography showing subtle cuticle detail and healthy nail integrity.",
  trends: "incorporating 2026 'Refined Intention' aesthetics: milky glazes, dusty tones, and depth-focused layering.",
};

export function buildPrompt({
  keyword,
  level,
  selectedQuickStyles = [],
  selectedTrendColors = [],
  artStyles = [],
  shape,
  length,
  isPro = false,
}) {
  if (!keyword) return "";

  let baseTemplate = LEVEL_PROMPT_MAP[level || "salon"];
  
  if (isPro) {
    baseTemplate = baseTemplate.replace(
      "A realistic, high-resolution", 
      "A masterpiece-level, hyper-realistic 8k"
    ).replace(
      "A high-quality, realistic",
      "An award-winning, hyper-realistic 8k"
    );
  }

  let prompt = baseTemplate.replace("{{KEYWORD}}", keyword);

  /* Pro Specifications Injection */
  if (isPro) {
    prompt += `\n\nPRO TECHNICAL SPECS: ${PRO_SPEC_MAP.materials} ${PRO_SPEC_MAP.lighting} ${PRO_SPEC_MAP.trends}`;
  }

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
    let shapeDesc = shape || "";
    if (isPro && shape && PRO_SPEC_MAP.shapes[shape.toLowerCase()]) {
      shapeDesc = PRO_SPEC_MAP.shapes[shape.toLowerCase()];
    }
    
    const shapeParts = [];
    if (shapeDesc) shapeParts.push(shapeDesc);
    if (length) shapeParts.push(length);

    prompt += `\n\nNail architecture: ${shapeParts.join(", ")}.`;
  }

  /* Art Styles (Techniques) */
  if (artStyles.length > 0) {
    const artStylePrompt = artStyles
      .map((key) => ART_STYLES[key]?.prompt)
      .filter(Boolean)
      .join(", ");

    prompt += `\n\nAdvanced techniques: ${artStylePrompt}.`;
  }

  /* Final Quality Guard & Safety */
  if (isPro) {
    prompt += `\n\nFinal verification: Ensure the design captures complex artistic techniques, realistic textures like 3D gel and chrome, and high-fashion aesthetics.`;
  }

  prompt += `
Ensure the final result looks cohesive, aesthetically balanced, and suitable for the selected difficulty level.
Avoid overloading the design; maintain harmony between colors, techniques, and overall mood.
Strictly avoid any inappropriate, offensive, or NSFW content. Generate only clean, professional-quality nail art designs.
`;

  return prompt.trim();
}
