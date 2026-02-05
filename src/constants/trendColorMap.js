export const TREND_COLOR_MAP = {
  cloud_dancer: {
    label: "Cloud Dancer",
    emoji: "☁️",
    prompt:
      "Pantone Cloud Dancer 2026, soft milky foam white, airy off-white neutral base, calming clean girl aesthetic",
    conflicts: ["charcoal", "burgundy"],
  },
  milky_nude: {
    label: "Milky Nude / Soap",
    emoji: "🫧",
    prompt:
      "milky nude or soap nails, sheer fresh natural skin-like tones, effortless quiet luxury",
    conflicts: ["supreme_orange", "vivid red"],
  },
  milk_chocolate: {
    label: "Milk Chocolate",
    emoji: "🍫",
    prompt:
      "warm milk chocolate or creamy mocha tones, rich cozy earthy browns",
    conflicts: ["cloud_dancer", "fog_blue"],
  },
  fog_blue: {
    label: "Fog Blue / Stormy Blue",
    emoji: "🌫️",
    prompt: "foggy stormy blue tones, muted cool misty ethereal vibe",
    conflicts: ["milk_chocolate"],
  },
  grounded_green: {
    label: "Grounded Green / Sage",
    emoji: "🌿",
    prompt:
      "grounded sage or muted olive green tones, natural calming earthy palette",
    conflicts: ["supreme_orange"],
  },
  supreme_orange: {
    label: "Supreme Orange",
    emoji: "🟠",
    prompt:
      "vibrant supreme orange or persimmon tones, bold spiced energetic accent",
    conflicts: ["minimal styles", "cloud_dancer"],
  },
  charcoal_black: {
    label: "Charcoal / Glossy Black",
    emoji: "🖤",
    prompt:
      "charcoal gray or glossy carbon black tones, dramatic deep neutral matte or shine",
    conflicts: ["cute", "pastel", "milky_nude"],
  },
};
