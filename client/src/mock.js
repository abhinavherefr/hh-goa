// Mock data for Hacker House Goa 2026 clone

export const EVENT = {
  name: 'Hacker House',
  location: 'Goa, India',
  dates: '28 — 31 Oct 2026',
  hashtag: '#FrameInGoa',
  short: 'HH GOA 2026',
};

export const ROLES = [
  'Builder', 'Hacker', 'Designer', 'Organiser', 'Mentor', 'Staff', 'Photographer', 'Volunteer', 'Custom'
];

export const FRAMES = [
  {
    id: 'arch',
    name: 'Arch Badge',
    category: 'badge',
    tagline: 'Standout yellow, a full green card & bold header under the arch.',
    bg: '#0a3d24',
    accent: '#f9df32',
    accent2: '#ec2f89',
  },
  {
    id: 'portrait',
    name: 'Portrait Frame',
    category: 'portrait',
    tagline: 'Sweet, bold and neat — the classic event portrait.',
    bg: '#0a3d24',
    accent: '#f5edb7',
    accent2: '#ec2f89',
  },
  {
    id: 'ornate',
    name: 'Ornate Badge',
    category: 'badge',
    tagline: 'Postcard medallion, frames and gold details.',
    bg: '#0a3d24',
    accent: '#f9df32',
    accent2: '#ec2f89',
  },
  {
    id: 'slim',
    name: 'Slim Badge',
    category: 'badge',
    tagline: 'One nightlife — smooth, minimal and event driven.',
    bg: '#0a3d24',
    accent: '#f9df32',
    accent2: '#ec2f89',
  },
  {
    id: 'landscape',
    name: 'Landscape Frame',
    category: 'landscape',
    tagline: 'The tropical sunshine, wider than the frame.',
    bg: 'linear-gradient(180deg, #f27e2b 0%, #ec2f89 100%)',
    accent: '#f9df32',
    accent2: '#0a3d24',
  },
  {
    id: 'circle',
    name: 'Circle PFP',
    category: 'pfp',
    tagline: 'A perfect round cutout for your socials.',
    bg: '#0a3d24',
    accent: '#f9df32',
    accent2: '#ec2f89',
  },
  {
    id: 'tall',
    name: 'Tall PFP',
    category: 'pfp',
    tagline: 'Vertical preview, header, footer, clean lines.',
    bg: '#0a3d24',
    accent: '#f9df32',
    accent2: '#ec2f89',
  },
];

export const FRAME_CATEGORIES = ['All', 'Badge', 'Portrait', 'PFP', 'Landscape'];

export const generateId = () => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH-26-${num}`;
};

export const STEPS = [
  { key: 'choose', label: 'Choose' },
  { key: 'details', label: 'Details' },
  { key: 'frame', label: 'Frame' },
  { key: 'generate', label: 'Generate' },
];