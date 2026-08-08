// Single source of truth for brand tokens used inside <canvas> drawing code
// (CSS variables aren't readable by the 2D context, so we mirror them here).

export const BRAND = {
  eventName: "HH GOA",
  year: "2026",
  dates: "28–31 OCT 2026",
  location: "GOA, INDIA",
  studioTag: "2:47 PM STUDIO",
  hashtag: "#FrameInGoa",
};


// Real HH Goa brand palette. This is the source of truth — badgeCompositor.js
// and frameCompositor.js both read COLORS.* with `|| "#fallback"`, but that
// fallback only ever fires if a key here is missing, so keep this object as
// the single place to change brand color.
export const COLORS = {
  void: "#0a0d12",
  panel: "#12171f",

  cream: "#F7F3E8",
  sand: "#F7F3E8",
  sandDim: "rgba(247,243,232,0.7)",

  forest: "#2C663A",
  forestDark: "#1D4A2A",

  mustard: "#F5DC3E",
  mustardLight: "#FBEB8F",

  pink: "#EA3378",
  pinkLight: "#F27DA5",

  teal: "#2DD4BF",

  line: "rgba(247,243,232,0.25)"
};

export const FONT_STACK_DISPLAY = "'Space Grotesk', sans-serif";
export const FONT_STACK_MONO = "'JetBrains Mono', monospace";

export const SHARE_CAPTION_TEMPLATES = {
  pfp: "I just framed myself in for HH GOA 2026 🌅 500 elite builders, 4 days, one build-station in Goa. Locking in. #FrameInGoa",
  card: "My HH GOA 2026 builder card is live. See you on the sand, 28–31 Oct. #FrameInGoa",
};

export const MAX_UPLOAD_MB = 20;

export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

// Word pools for the generated "builder title" on Format B.
// Deliberately playful, terminal/ocean themed — matches HH Goa's own copy
// ("live in their terminals", "the ocean at your doorstep").
export const TITLE_ADJECTIVES = [
  "Midnight",
  "Off-Grid",
  "High-Signal",
  "Zero-Latency",
  "Sun-Fried",
  "Tideline",
  "Caffeinated",
  "Terminal-Native",
  "Undeterred",
  "Salt-Air",
];

export const TITLE_NOUNS = [
  "Shipper",
  "Wave Rider",
  "Debugger",
  "Architect",
  "Sorcerer",
  "Whisperer",
  "Pathfinder",
  "Tinkerer",
  "Builder",
  "Signal Chaser",
];

/**
 * Turns a free-text "stack/role" field into a fun, deterministic builder title.
 * Deterministic (hashed off the input) so the same input always regenerates
 * the same title — feels designed, not random noise on every re-render.
 */
export function generateBuilderTitle(stackInput = "") {
  const seedSource = stackInput.trim().toLowerCase() || "builder";
  let hash = 0;
  for (let i = 0; i < seedSource.length; i++) {
    hash = (hash * 31 + seedSource.charCodeAt(i)) >>> 0;
  }
  const adjective = TITLE_ADJECTIVES[hash % TITLE_ADJECTIVES.length];
  const noun = TITLE_NOUNS[Math.floor(hash / TITLE_ADJECTIVES.length) % TITLE_NOUNS.length];

  // Keep the actual stack visible too, e.g. "The Midnight React Shipper"
  const stackWord = stackInput.trim().split(/[\s,/]+/)[0];
  if (stackWord) {
    return `The ${adjective} ${capitalize(stackWord)} ${noun}`;
  }
  return `The ${adjective} ${noun}`;
}

export const DECORATION = {
  waves: {
    enabled: true,
    opacity: 0.14,
    lineWidth: 3,
  },

  tropical: {
    enabled: true,
    opacity: 0.12,
  },

  grid: {
    enabled: true,
    opacity: 0.06,
  },

  glow: {
    opacity: 0.28,
  },

  noise: {
    opacity: 0.03,
  },
};

export const TYPE = {
  hero: 0.090,
  title: 0.062,
  subtitle: 0.032,
  body: 0.028,
  label: 0.026,
  mono: 0.024,
  caption: 0.020,
};

export const LAYOUT = {
  radius: {
    sm: 16,
    md: 28,
    lg: 42,
    xl: 56,
  },

  spacing: {
    xs: 12,
    sm: 20,
    md: 32,
    lg: 48,
    xl: 72,
  },

  border: {
    thin: 2,
    normal: 4,
    thick: 6,
  },
};

function capitalize(word) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}