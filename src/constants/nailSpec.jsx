export const NAIL_SPEC = {
  lengths: {
    short: { label: "숏", mm: "0~2mm" },
    medium: { label: "미디엄", mm: "5~7mm" },
    long: { label: "롱", mm: "10~15mm" },
    extra_long: { label: "엑스트라 롱", mm: "20mm+" },
  },
  shapes: {
    square: {
      label: "스퀘어",
      allowed: ["short", "medium"],
      recommended: "medium",
      min: "short",
    },
    almond: {
      label: "아몬드",
      allowed: ["medium", "long"],
      recommended: "long",
      min: "medium",
    },
    oval: {
      label: "오벌",
      allowed: ["medium", "long"],
      recommended: "medium",
      min: "medium",
    },
    coffin: {
      label: "코핀",
      allowed: ["long", "extra_long"],
      recommended: "long",
      min: "long",
    },
  },
};
