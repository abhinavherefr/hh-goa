// Central design tokens for the canvas compositors and customization UI.
import { EVENT } from "../mock";

/* -------------------------------------------------------------------------- */
/* BRAND                                                                      */
/* -------------------------------------------------------------------------- */
export const BRAND = {
  eventName: "HACKER HOUSE",
  year: "2026",
  hashtag: "#FrameInGoa",
  location: "GOA, INDIA",
  dates: "28–31 OCT 2026",
  subLocation: "BEACH LAB · SHIP LIVE",
};

/* -------------------------------------------------------------------------- */
/* FONTS                                                                      */
/* -------------------------------------------------------------------------- */
export const FONT_STACK_DISPLAY = `'Bowlby One', 'Rammetto One', 'Archivo Black', 'Arial Black', -apple-system, sans-serif`;
export const FONT_STACK_SANS = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
export const FONT_STACK_MONO = `'JetBrains Mono', 'Courier New', monospace`;

/* -------------------------------------------------------------------------- */
/* COLORS                                                                     */
/* -------------------------------------------------------------------------- */
export const COLORS = {
  forest: "#2C663A",
  forestDark: "#0A2419",
  mustard: "#F5DC3E",
  mustardLight: "#FBEB8F",
  pink: "#EA3378",
  cream: "#F7F3E8",
  orange: "#F27E2B",
  cyan: "#2DD4BF",
  purple: "#A855F7",
};

/* -------------------------------------------------------------------------- */
/* FORMATS & STYLES                                                           */
/* -------------------------------------------------------------------------- */
export const FORMAT_OPTIONS = [
  {
    id: "pfp",
    name: "PFP Frame",
    description: "Ready-to-use X profile picture",
  },
  {
    id: "card",
    name: "Builder Card",
    description: "Name, role, and a generated title",
  },
];

/* -------------------------------------------------------------------------- */
/* PASS LEVELS / ROLES                                                        */
/* -------------------------------------------------------------------------- */
export const PASS_LEVELS = [
  "BUILDER",
  "HACKER",
  "DESIGNER",
  "SPEAKER",
  "MENTOR",
  "ORGANISER",
  "STAFF",
  "PHOTOGRAPHER",
  "VOLUNTEER",
  "SPONSOR",
  "VIP",
];

/* -------------------------------------------------------------------------- */
/* THEMES                                                                     */
/* -------------------------------------------------------------------------- */
export const THEMES = {
  ocean: {
    id: "ocean",
    name: "Ocean Tide",
    dot: "#F5DC3E",
    accent1: "#F5DC3E",
    accent2: "#EA3378",
    glowBorder: ["#FBEB8F", "#F7F3E8", "#EA3378", "#2C663A"],
    cardGrad: ["#071C14", "#0C291D", "#1C2D1C", "#2B1A24", "#180A15"],
    sunColor: "#F5DC3E",
    waveColor: "#2DD4BF",
    subtleLine: "rgba(245, 220, 62, 0.12)",
  },
  sunset: {
    id: "sunset",
    name: "Goa Sunset",
    dot: "#F27E2B",
    accent1: "#F5DC3E",
    accent2: "#F27E2B",
    glowBorder: ["#F5A25E", "#FBEB8F", "#EA3378", "#0A2419"],
    cardGrad: ["#140C08", "#24140D", "#381B15", "#2B101E", "#140713"],
    sunColor: "#F27E2B",
    waveColor: "#EA3378",
    subtleLine: "rgba(242, 126, 43, 0.15)",
  },
  forest: {
    id: "forest",
    name: "Palm Forest",
    dot: "#8FBF6E",
    accent1: "#F5DC3E",
    accent2: "#8FBF6E",
    glowBorder: ["#8FBF6E", "#F7F3E8", "#F5DC3E", "#0A2419"],
    cardGrad: ["#05150C", "#0B2416", "#143320", "#1D2F1B", "#0D180F"],
    sunColor: "#F5DC3E",
    waveColor: "#8FBF6E",
    subtleLine: "rgba(143, 191, 110, 0.15)",
  },
  cyber: {
    id: "cyber",
    name: "Cyber Midnight",
    dot: "#A855F7",
    accent1: "#2DD4BF",
    accent2: "#A855F7",
    glowBorder: ["#2DD4BF", "#F7F3E8", "#A855F7", "#0A2419"],
    cardGrad: ["#050812", "#0A1124", "#121736", "#1C1130", "#0E071A"],
    sunColor: "#2DD4BF",
    waveColor: "#A855F7",
    subtleLine: "rgba(168, 85, 247, 0.15)",
  },
};

/* -------------------------------------------------------------------------- */
/* DYNAMIC ROLE & TECH STACK KEYWORD TITLE DICTIONARY                         */
/* -------------------------------------------------------------------------- */
export const STACK_TITLE_MAP = {
  // Fullstack & Web Frameworks
  fullstack: "THE UNHINGED FULLSTACK DEVELOPER",
  "full-stack": "THE UNHINGED FULLSTACK DEVELOPER",
  frontend: "THE PIXEL-OBSESSED FRONTEND SORCERER",
  "front-end": "THE PIXEL-OBSESSED FRONTEND SORCERER",
  backend: "THE DISTRIBUTED KERNEL WHISPERER",
  "back-end": "THE DISTRIBUTED KERNEL WHISPERER",
  web: "THE MODERN WEB ARCHITECT",
  react: "THE REACTIVE INTERFACE ARCHITECT",
  next: "THE SSR VELOCITY SPEEDSTER",
  vue: "THE PROGRESSIVE VIEW CRAFTSMAN",
  angular: "THE ENTERPRISE PATTERNS MASTER",
  svelte: "THE ZERO-RUNTIME RUNNER",
  node: "THE EVENT-LOOP CONTROLLER",
  express: "THE RESTFUL ENDPOINT SCULPTOR",
  django: "THE BATTERY-INCLUDED GENERAL",
  fastapi: "THE ASYNC PYTHON SPEEDSTER",
  flask: "THE MICRO-FRAMEWORK MINIMALIST",
  graphql: "THE SCHEMA TELEPATH",
  tailwind: "THE UTILITY-FIRST STYLIST",
  css: "THE CASCADE DOMAIN CONQUEROR",
  html: "THE SEMANTIC DOCUMENT PURIST",

  // Languages
  rust: "THE HIGH-CONCURRENCY RUST WIZARD",
  python: "THE DATA-STREAM ENCHANTER",
  javascript: "THE DYNAMIC ECMA ARTISAN",
  js: "THE DYNAMIC ECMA ARTISAN",
  typescript: "THE TYPE-SAFE CRAFTSMAN",
  ts: "THE TYPE-SAFE CRAFTSMAN",
  golang: "THE GOROUTINE ORCHESTRATOR",
  go: "THE GOROUTINE ORCHESTRATOR",
  solidity: "THE BYTECODE IMMUTABLE HACKER",
  cpp: "THE MEMORY-UNSAFE SPEED DEMON",
  "c++": "THE MEMORY-UNSAFE SPEED DEMON",
  c: "THE HARDWARE REGISTERS WHISPERER",
  java: "THE GARBAGE-COLLECTED TITAN",
  kotlin: "THE IDIOMATIC CONSTRUCT PURIST",
  swift: "THE SWIFTUI ARCHITECT",
  ruby: "THE ELEGANT CODE POET",
  php: "THE WEB 1.0 TO 3.0 SURVIVOR",
  zig: "THE LOW-LEVEL PIONEER",

  // Web3 & Crypto
  solana: "THE ON-CHAIN PROTOCOL PIRATE",
  web3: "THE DECENTRALIZED PROTOCOL VOYAGER",
  crypto: "THE ON-CHAIN PROTOCOL PIRATE",
  ethereum: "THE EVM BYTECODE SHAMAN",
  eth: "THE EVM BYTECODE SHAMAN",
  defi: "THE LIQUIDITY POOL ALCHEMIST",
  nft: "THE METADATA PROVENANCE ARTISAN",
  smartcontract: "THE AUDIT-PROOF CONTRACT BUILDER",
  contract: "THE AUDIT-PROOF CONTRACT BUILDER",
  blockchain: "THE MERKLE TREE NOMAD",
  degen: "THE HIGH-VOLATILITY SURFER",

  // AI & Data Science
  ai: "THE LATENT-SPACE PROMPT ALCHEMIST",
  ml: "THE NEURAL MODEL SYNTHESIZER",
  llm: "THE CONTEXT-WINDOW EXTENDER",
  gpt: "THE ZERO-SHOT WONDER",
  vision: "THE COMPUTER VISION SPECIALIST",
  nlp: "THE SEMANTIC EMBEDDINGS WHISPERER",
  data: "THE PIPELINE EXTRACTIONIST",
  analytics: "THE METRICS RADAR OPERATOR",
  deeplearning: "THE BACKPROPAGATION PROPHET",

  // Infra & DevOps & Databases
  devops: "THE CLOUD-DRIFTING INFRA SHAMAN",
  infra: "THE CLOUD-DRIFTING INFRA SHAMAN",
  sre: "THE NINE-NINES UPTIME SENTINEL",
  docker: "THE CONTAINER CONTAINMENT EXPERT",
  kubernetes: "THE CLUSTER ORCHESTRATION PILOT",
  k8s: "THE CLUSTER ORCHESTRATION PILOT",
  aws: "THE SERVERLESS LAMBDA GURU",
  gcp: "THE MULTI-REGION DEPLOYER",
  azure: "THE ENTERPRISE CLOUD VANGUARD",
  linux: "THE BASH PIPELINE COMMANDER",
  kernel: "THE RING-0 INTERRUPT HANDLER",
  security: "THE ZERO-DAY HUNTER",
  pentest: "THE PENETRATION LAB OPERATIVE",
  postgres: "THE ACID-COMPLIANT DB ZEALOT",
  sql: "THE RELATIONAL QUERY ARTISAN",
  nosql: "THE DOCUMENT STORE NOMAD",
  mongodb: "THE BSON SHARDING MASTER",
  redis: "THE SUB-MILLISECOND IN-MEMORY GURU",

  // Design & Product
  design: "THE AESTHETIC REALM CRAFTSMAN",
  designer: "THE AESTHETIC REALM CRAFTSMAN",
  ui: "THE PIXEL-PERFECT INTERFACE ARCHITECT",
  ux: "THE COGNITIVE FLOW ARCHITECT",
  figma: "THE COMPONENT VARIANT SORCERER",
  product: "THE SPEC-TO-SHIP SHIPPER",
  pm: "THE ROADMAP TRAILBLAZER",
  founder: "THE SUNSET RESIDENCY FOUNDER",
  ceo: "THE CHIEF VIBES OFFICER",
  cto: "THE ARCHITECTURE DICTATOR",
  writer: "THE TECHNICAL PROSE SCULPTOR",
  qa: "THE EDGE-CASE DESTRUCTOR",

  // Roles
  builder: "THE TERMINAL-NATIVE PATHFINDER",
  hacker: "THE ZERO-LATENCY GOA NOMAD",
  speaker: "THE KEYNOTE ILLUMINATOR",
  mentor: "THE ARCHITECTURAL SAGE",
  organiser: "THE CHAOS-CONTAINMENT MASTERMIND",
  staff: "THE OPERATIONS ORCHESTRATOR",
  photographer: "THE GOLDEN-HOUR CHRONICLER",
  volunteer: "THE UNSUNG BEACHSIDE HERO",
  sponsor: "THE VISIONARY ECOSYSTEM CATALYST",
  vip: "THE BEACHSIDE LUMINARY",
  custom: "THE EXPEDITIONARY MAVERICK",
};

const TITLES_POOL = [
  "THE TERMINAL-NATIVE PATHFINDER",
  "THE UNHINGED FULLSTACK DEVELOPER",
  "THE SUNSET SHIPPER",
  "THE BEACHSIDE ARCHITECT",
  "THE ZERO-LATENCY NOMAD",
  "THE FULL-STACK VOYAGER",
  "THE PROTOCOL CARTOGRAPHER",
  "THE LATE-NIGHT DEBUGGER",
  "THE DISTRIBUTED DREAMER",
  "THE PROTOTYPE PILOT",
  "THE HIGH-THROUGHPUT HACKER",
  "THE NEURAL NAVIGATION LEAD",
];

/**
 * Dynamically generates an epic title reacting to the chosen role and stack.
 */
export function generateBuilderTitle(stack = "", role = "BUILDER", name = "") {
  const cleanStack = String(stack || "").trim().toLowerCase();
  const cleanRole = String(role || "").trim().toLowerCase();

  // 1. Check stack match first (words or substrings)
  const stackWords = cleanStack.split(/[\s,+/&|_-]+/);
  for (const word of stackWords) {
    if (word && STACK_TITLE_MAP[word]) {
      return STACK_TITLE_MAP[word];
    }
  }
  for (const [key, title] of Object.entries(STACK_TITLE_MAP)) {
    if (key.length > 2 && cleanStack.includes(key)) {
      return title;
    }
  }

  // 2. Map directly to selected Role
  if (STACK_TITLE_MAP[cleanRole]) {
    return STACK_TITLE_MAP[cleanRole];
  }

  // 3. Fallback deterministic pick based on name/role seed
  const seedString = `${name}-${role}-${stack}`.trim();
  if (!seedString) return TITLES_POOL[0];

  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % TITLES_POOL.length;
  return TITLES_POOL[index];
}
