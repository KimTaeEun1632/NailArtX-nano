export const QUICK_STYLE_MAP = {
  cute: {
    label: "Cute",
    emoji: "💕",
    prompt:
      "cute nail art design, soft pastel colors, playful and charming mood, youthful aesthetic",
    conflicts: ["chic", "glam"],
  },
  minimal: {
    label: "Minimal",
    emoji: "🤍",
    prompt:
      "minimal nail design, clean lines, neutral colors, simple and modern aesthetic",
    conflicts: ["glam"],
  },
  elegant: {
    label: "Elegant",
    emoji: "✨",
    prompt:
      "elegant luxury nail design, refined details, balanced composition, high-end salon style",
    conflicts: ["cute"],
  },
  glam: {
    label: "Glam",
    emoji: "🔥",
    prompt:
      "glamorous nail art, bold design, sparkling accents, high-impact visual style",
    conflicts: ["minimal"],
  },
  chic: {
    label: "Chic",
    emoji: "🖤",
    prompt:
      "chic nail design, modern fashion-forward aesthetic, muted tones, stylish mood",
    conflicts: ["cute"],
  },
  pastel: {
    label: "Pastel",
    emoji: "🌸",
    prompt:
      "pastel color palette, soft gradients, light and airy nail art style",
    conflicts: [],
  },
  winter: {
    label: "Winter",
    emoji: "❄️",
    prompt:
      "winter themed nail art, icy blue and silver tones, snowflake or frost-inspired details",
    conflicts: ["summer", "spring"],
  },
  summer: {
    label: "Summer",
    emoji: "🌊",
    prompt:
      "summer themed nail art, bright and fresh colors, beach-inspired vibrant mood",
    conflicts: ["winter", "autumn"],
  },
  spring: {
    label: "Spring",
    emoji: "🌷",
    prompt:
      "spring nail art, soft pastel blooms, cherry blossom or fresh floral accents, light mint lavender pink tones, airy romantic vibe",
    conflicts: ["winter", "autumn"],
  },
  autumn: {
    label: "Autumn",
    emoji: "🍂",
    prompt:
      "autumn nail art, warm earthy tones, milk chocolate browns, spiced orange, grounded green, burgundy accents, cozy foliage-inspired mood",
    conflicts: ["summer", "spring"],
  },
  clean_girl: {
    label: "Clean Girl",
    emoji: "🫧",
    prompt:
      "clean girl nail aesthetic, milky white or fresh nude base, glossy sheer finish, effortless minimal luxury vibe",
    conflicts: ["glam", "gothic"], // 너무 화려하거나 다크하면 안 맞음
  },
  moody: {
    label: "Moody",
    emoji: "🌑",
    prompt:
      "moody nail design, deep earthy tones like forest green mud brown charcoal gray, dramatic subtle shadows, mysterious elegant atmosphere",
    conflicts: ["cute", "pastel", "summer"],
  },
  ethereal: {
    label: "Ethereal",
    emoji: "☁️",
    prompt:
      "ethereal aura nails, iridescent soft glow, cloud-like milky gradients, light-reflective sheer finishes, dreamy celestial mood",
    conflicts: ["glam", "autumn"], // 너무 bold하거나 warm earthy면 깨짐
  },
  maximal: {
    label: "Maximal",
    emoji: "✨💎",
    prompt:
      "refined maximalist nails, curated mix of textures charms accents, bold yet intentional details, playful luxurious chaos",
    conflicts: ["minimal", "clean_girl"], // 미니멀 계열과 정반대
  },
  nude_luxe: {
    label: "Nude Luxe",
    emoji: "🤎",
    prompt:
      "nude luxe nails, rich sophisticated nudes with subtle sheen, fresh milky or soap finish, quiet luxury high-end feel",
    conflicts: ["cute"],
  },
};
