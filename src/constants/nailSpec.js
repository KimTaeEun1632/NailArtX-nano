export const NAIL_SPEC = {
  lengths: {
    short: { label: "generate.sidebar.nailSpec.lengths.short", mm: "0~2mm" },
    medium: { label: "generate.sidebar.nailSpec.lengths.medium", mm: "5~7mm" },
    long: { label: "generate.sidebar.nailSpec.lengths.long", mm: "10~15mm" },
    extra_long: { label: "generate.sidebar.nailSpec.lengths.extra_long", mm: "20mm+" },
  },
  shapes: {
    square: {
      label: "generate.sidebar.nailSpec.shapes.square",
      allowed: ["short", "medium"],
      recommended: "medium",
      min: "short",
    },
    almond: {
      label: "generate.sidebar.nailSpec.shapes.almond",
      allowed: ["medium", "long"],
      recommended: "long",
      min: "medium",
    },
    oval: {
      label: "generate.sidebar.nailSpec.shapes.oval",
      allowed: ["medium", "long"],
      recommended: "medium",
      min: "medium",
    },
    coffin: {
      label: "generate.sidebar.nailSpec.shapes.coffin",
      allowed: ["long", "extra_long"],
      recommended: "long",
      min: "long",
    },
    round: {
      label: "generate.sidebar.nailSpec.shapes.round",
      allowed: ["short", "medium"],
      recommended: "medium",
      min: "medium",
    },
  },
};
