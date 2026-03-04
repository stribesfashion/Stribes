// STRIBES Mock Data
// In a real app this would come from your backend API.
// For now, all screens read from these arrays.

export type OutfitPiece = {
  type: 'TOP' | 'BOTTOM' | 'SHOES' | 'ACCESSORIES';
  name: string;
  detail: string;
  color: string;
  confidence: number;
};

export type FeedPost = {
  id: string;
  username: string;
  tribe: string;
  tribeColor: string;
  avatarEmoji: string;
  gradientColors: string[];
  backgroundStyle: 'ci-1' | 'ci-2' | 'ci-3';
  outfitColors: { top: string; bottom: string };
  pieces: OutfitPiece[];
  sauceCount: number;
  caption: string;
  timeAgo: string;
  commentCount: number;
};

export type Tribe = {
  id: string;
  name: string;
  emoji: string;
  memberCount: string;
  accentColor: string;
  bgColors: string[];
  challenge: string;
  timeLeft: string;
  entries: number;
  joined: boolean;
};

export type RemixItem = {
  id: string;
  name: string;
  type: 'top' | 'bottom' | 'shoes' | 'accessories';
  emoji: string;
  color: string;
  bgColors: string[];
};

// ── FEED DATA ──────────────────────────────
export const FEED_POSTS: FeedPost[] = [
  {
    id: '1',
    username: 'jaystyled',
    tribe: 'Streetwear',
    tribeColor: '#A855F7',
    avatarEmoji: '🔥',
    gradientColors: ['#FF6B9D', '#A855F7', '#6366F1'],
    backgroundStyle: 'ci-1',
    outfitColors: { top: '#A855F7', bottom: '#1e1240' },
    pieces: [
      { type: 'TOP', name: 'Oversized Graphic Hoodie', detail: 'Fleece · Black · Graphic', color: '#A855F7', confidence: 94 },
      { type: 'BOTTOM', name: 'Cargo Wide-Leg Pants', detail: 'Cotton · Black', color: '#6366F1', confidence: 89 },
      { type: 'SHOES', name: 'Platform Chunky Boots', detail: 'Faux leather · Lace-up', color: '#FF6B9D', confidence: 91 },
      { type: 'ACCESSORIES', name: 'Chain Crossbody Bag', detail: 'Mini · Silver hardware', color: '#A1A1AA', confidence: 76 },
    ],
    sauceCount: 8241,
    caption: 'all black everything 🖤 cargo season never ends. tap try to see it on you ✦',
    timeAgo: '2 hours ago',
    commentCount: 94,
  },
  {
    id: '2',
    username: 'cleo.m',
    tribe: 'Minimal',
    tribeColor: '#10B981',
    avatarEmoji: '✨',
    gradientColors: ['#FF6B9D', '#F97316'],
    backgroundStyle: 'ci-2',
    outfitColors: { top: '#ffffff', bottom: '#f0f0f0' },
    pieces: [
      { type: 'TOP', name: 'Linen Oversized Shirt', detail: 'Linen · White', color: '#FF6B9D', confidence: 92 },
      { type: 'BOTTOM', name: 'Wide Leg Trousers', detail: 'Cotton · Cream', color: '#10B981', confidence: 87 },
      { type: 'SHOES', name: 'Mule Heels', detail: 'Leather · Beige', color: '#6366F1', confidence: 88 },
    ],
    sauceCount: 5610,
    caption: 'ghost white era ☁️ less is always more #minimal #stribes',
    timeAgo: '5 hours ago',
    commentCount: 42,
  },
  {
    id: '3',
    username: 'cyberkai',
    tribe: 'Techwear',
    tribeColor: '#6366F1',
    avatarEmoji: '🤖',
    gradientColors: ['#6366F1', '#4F46E5'],
    backgroundStyle: 'ci-3',
    outfitColors: { top: '#6366F1', bottom: '#1e1a3a' },
    pieces: [
      { type: 'TOP', name: 'Tech Windbreaker', detail: 'Nylon · All-black', color: '#6366F1', confidence: 96 },
      { type: 'BOTTOM', name: 'Tactical Cargo Pants', detail: 'Ripstop · Multiple pockets', color: '#4F46E5', confidence: 93 },
      { type: 'SHOES', name: 'Chunky Trail Sneakers', detail: 'Rubber sole · Waterproof', color: '#A855F7', confidence: 90 },
    ],
    sauceCount: 3872,
    caption: 'utility mode activated 🤖 all black everything techwear edition #techwear',
    timeAgo: '8 hours ago',
    commentCount: 61,
  },
];

// ── TRIBE DATA ──────────────────────────────
export const TRIBES: Tribe[] = [
  {
    id: 'streetwear',
    name: 'Streetwear',
    emoji: '⚡',
    memberCount: '47.2k',
    accentColor: '#FF6B9D',
    bgColors: ['rgba(255,107,157,0.08)', 'rgba(168,85,247,0.06)'],
    challenge: 'Black & White Fits Only',
    timeLeft: '2d 14h',
    entries: 234,
    joined: true,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    emoji: '🍃',
    memberCount: '31.5k',
    accentColor: '#10B981',
    bgColors: ['rgba(134,239,172,0.08)', 'rgba(59,130,246,0.06)'],
    challenge: '3-Color Palette Fits',
    timeLeft: '4d 6h',
    entries: 89,
    joined: true,
  },
  {
    id: 'techwear',
    name: 'Techwear',
    emoji: '🤖',
    memberCount: '22.8k',
    accentColor: '#6366F1',
    bgColors: ['rgba(99,102,241,0.08)', 'rgba(14,165,233,0.06)'],
    challenge: 'All-Black Utility Fits',
    timeLeft: '1d 22h',
    entries: 412,
    joined: false,
  },
  {
    id: 'academia',
    name: 'Dark Academia',
    emoji: '📜',
    memberCount: '18.1k',
    accentColor: '#F59E0B',
    bgColors: ['rgba(251,191,36,0.08)', 'rgba(245,158,11,0.06)'],
    challenge: 'Library Core Aesthetic',
    timeLeft: '3d 8h',
    entries: 156,
    joined: false,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    emoji: '🕰️',
    memberCount: '14.3k',
    accentColor: '#F472B6',
    bgColors: ['rgba(244,114,182,0.08)', 'rgba(251,191,36,0.06)'],
    challenge: '90s Revival Fits',
    timeLeft: '5d',
    entries: 67,
    joined: false,
  },
];

// ── DNA DATA ──────────────────────────────
export const DNA_PROFILE = [
  { name: 'Streetwear', percentage: 45, color: '#FF6B9D', gradColors: ['#FF6B9D', '#A855F7'] },
  { name: 'Minimal',    percentage: 30, color: '#A855F7', gradColors: ['#A855F7', '#6366F1'] },
  { name: 'Techwear',   percentage: 15, color: '#6366F1', gradColors: ['#6366F1', '#4F46E5'] },
  { name: 'Vintage',    percentage: 10, color: '#F59E0B', gradColors: ['#F59E0B', '#FF6B9D'] },
];

// ── REMIX CATALOGUE ──────────────────────────────
export const REMIX_ITEMS: RemixItem[] = [
  { id: 'r1',  name: 'Slim Black Jeans',    type: 'bottom',      emoji: '👖', color: '#111111', bgColors: ['#1a1a2e', '#111111'] },
  { id: 'r2',  name: 'Cargo Olive Pants',   type: 'bottom',      emoji: '👖', color: '#556B2F', bgColors: ['#2d3a1e', '#3a4a28'] },
  { id: 'r3',  name: 'Pleated Trousers',    type: 'bottom',      emoji: '👖', color: '#808080', bgColors: ['#e8e8e8', '#d0d0d0'] },
  { id: 'r4',  name: 'Baggy Denim',         type: 'bottom',      emoji: '👖', color: '#1a3a6e', bgColors: ['#dbe8ff', '#c0d4f8'] },
  { id: 'r5',  name: 'Plaid Mini Skirt',    type: 'bottom',      emoji: '👗', color: '#8B0000', bgColors: ['#fff0f0', '#ffe0e0'] },
  { id: 'r6',  name: 'Leather Skirt',       type: 'bottom',      emoji: '👗', color: '#1a1a1a', bgColors: ['#2a2a2a', '#1a1a1a'] },
  { id: 'r7',  name: 'Varsity Jacket',      type: 'top',         emoji: '🧥', color: '#1a3a6e', bgColors: ['#dbe8ff', '#c0d4f8'] },
  { id: 'r8',  name: 'Oversized Blazer',    type: 'top',         emoji: '🧥', color: '#2d2d2d', bgColors: ['#e8e8e8', '#d0d0d0'] },
  { id: 'r9',  name: 'Crop Hoodie',         type: 'top',         emoji: '👕', color: '#FF6B9D', bgColors: ['#FFF0F8', '#FFD4E8'] },
  { id: 'r10', name: 'Turtleneck',          type: 'top',         emoji: '👕', color: '#ffffff', bgColors: ['#f5f5f5', '#e8e8e8'] },
  { id: 'r11', name: 'Graphic Tee',         type: 'top',         emoji: '👕', color: '#111111', bgColors: ['#2a2a2a', '#1a1a1a'] },
  { id: 'r12', name: 'Linen Shirt',         type: 'top',         emoji: '👔', color: '#f5e6d3', bgColors: ['#fdf5eb', '#f5e6d3'] },
  { id: 'r13', name: 'Air Force 1',         type: 'shoes',       emoji: '👟', color: '#ffffff', bgColors: ['#f5f5f5', '#e0e0e0'] },
  { id: 'r14', name: 'Platform Boots',      type: 'shoes',       emoji: '👢', color: '#111111', bgColors: ['#2a2a2a', '#1a1a1a'] },
  { id: 'r15', name: 'Chunky Sneakers',     type: 'shoes',       emoji: '👟', color: '#A855F7', bgColors: ['#EDE7FF', '#C4B5FD'] },
  { id: 'r16', name: 'Strappy Heels',       type: 'shoes',       emoji: '👠', color: '#c4a882', bgColors: ['#f5e6d3', '#e8d0b8'] },
  { id: 'r17', name: 'Chain Necklace',      type: 'accessories', emoji: '📿', color: '#c0c0c0', bgColors: ['#f5f5f5', '#e0e0e0'] },
  { id: 'r18', name: 'Mini Bag',            type: 'accessories', emoji: '👜', color: '#A855F7', bgColors: ['#EDE7FF', '#C4B5FD'] },
  { id: 'r19', name: 'Sunglasses',          type: 'accessories', emoji: '🕶️', color: '#111111', bgColors: ['#2a2a2a', '#1a1a1a'] },
  { id: 'r20', name: 'Baseball Cap',        type: 'accessories', emoji: '🧢', color: '#1a1a1a', bgColors: ['#2a2a2a', '#1a1a1a'] },
  { id: 'r21', name: 'Corset Top',          type: 'top',         emoji: '👙', color: '#111111', bgColors: ['#2a2a2a', '#1a1a1a'] },
  { id: 'r22', name: 'Tie Dye Hoodie',      type: 'top',         emoji: '👕', color: '#e040fb', bgColors: ['#f3e5f5', '#e1bee7'] },
];
