export const TRIBES = [
  { id: '1', name: 'Streetwear', emoji: '🔥', members: '47.2k', joined: true, color: '#FFE4E1', challenge: 'Black & White Fits Only', timeLeft: '2d 14h', entries: 234 },
  { id: '2', name: 'Minimal', emoji: '🌿', members: '31.5k', joined: true, color: '#E8F5E9', challenge: '3-Color Palette Fits', timeLeft: '4d 6h', entries: 89 },
  { id: '3', name: 'Techwear', emoji: '🎮', members: '22.8k', joined: false, color: '#E8EAF6', challenge: 'All-Black Utility Fits', timeLeft: '1d 22h', entries: 412 },
  { id: '4', name: 'Dark Academia', emoji: '📚', members: '18.1k', joined: true, color: '#FFF8E1', challenge: 'Library Core Aesthetic', timeLeft: '3d 8h', entries: 156 },
  { id: '5', name: 'Vintage', emoji: '⏰', members: '14.3k', joined: true, color: '#FCE4EC', challenge: '90s Revival Fits', timeLeft: '5d', entries: 67 },
];
export const FEED_FILTERS = ['For You', 'Street', 'Tech', 'Minimal', 'Vintage'];
export const CLOTHING_ITEMS = {
  tops: [
    { id: 't1', name: 'Oversized Hoodie', emoji: '👕', color: '#9C27B0', tribe: 'Street' },
    { id: 't2', name: 'Bomber Jacket', emoji: '🧥', color: '#FF5722', tribe: 'Street' },
    { id: 't3', name: 'Linen Shirt', emoji: '👔', color: '#E0E0E0', tribe: 'Minimal' },
    { id: 't4', name: 'Turtleneck', emoji: '🎽', color: '#212121', tribe: 'Minimal' },
    { id: 't5', name: 'Tech Vest', emoji: '🦺', color: '#1A237E', tribe: 'Tech' },
    { id: 't6', name: 'Blazer', emoji: '🧣', color: '#4E342E', tribe: 'Academia' },
  ],
  bottoms: [
    { id: 'b1', name: 'Cargo Pants', emoji: '👖', color: '#37474F', tribe: 'Street' },
    { id: 'b2', name: 'Wide Trousers', emoji: '👖', color: '#F5F5F5', tribe: 'Minimal' },
    { id: 'b3', name: 'Slim Jeans', emoji: '👖', color: '#1565C0', tribe: 'Street' },
    { id: 'b4', name: 'Pleated Pants', emoji: '👖', color: '#795548', tribe: 'Academia' },
    { id: 'b5', name: 'Track Pants', emoji: '🩱', color: '#000000', tribe: 'Tech' },
    { id: 'b6', name: 'Mini Skirt', emoji: '🩴', color: '#F48FB1', tribe: 'Vintage' },
  ],
  shoes: [
    { id: 's1', name: 'Platform Boots', emoji: '👢', color: '#212121', tribe: 'Street' },
    { id: 's2', name: 'Mule Heels', emoji: '👠', color: '#BDBDBD', tribe: 'Minimal' },
    { id: 's3', name: 'Chunky Sneakers', emoji: '👟', color: '#FFFFFF', tribe: 'Street' },
    { id: 's4', name: 'Oxford Shoes', emoji: '👞', color: '#4E342E', tribe: 'Academia' },
    { id: 's5', name: 'Combat Boots', emoji: '🥾', color: '#1B5E20', tribe: 'Tech' },
    { id: 's6', name: 'Loafers', emoji: '🥿', color: '#FF8F00', tribe: 'Vintage' },
  ],
  accessories: [
    { id: 'a1', name: 'Mini Bag', emoji: '👜', color: '#9C27B0', tribe: 'Street' },
    { id: 'a2', name: 'Chain Necklace', emoji: '📿', color: '#FFD700', tribe: 'Street' },
    { id: 'a3', name: 'Bucket Hat', emoji: '🎩', color: '#37474F', tribe: 'Street' },
    { id: 'a4', name: 'Sunglasses', emoji: '🕶️', color: '#000000', tribe: 'Minimal' },
    { id: 'a5', name: 'Tote Bag', emoji: '👝', color: '#F5F5DC', tribe: 'Minimal' },
    { id: 'a6', name: 'Beret', emoji: '🎓', color: '#4E342E', tribe: 'Academia' },
  ],
};
export const OUTFITS = [
  { id: 'o1', name: 'Void Drip', sauce: 8200, creator: 'jaystyled', tribe: 'Street', bgColor: '#EDE7F6', avatarColor: '#7E57C2', top: CLOTHING_ITEMS.tops[0], bottom: CLOTHING_ITEMS.bottoms[0], shoes: CLOTHING_ITEMS.shoes[0], accessory: CLOTHING_ITEMS.accessories[0] },
  { id: 'o2', name: 'Proto Set', sauce: 5400, creator: 'cyber', tribe: 'Tech', bgColor: '#E8EAF6', avatarColor: '#3949AB', top: CLOTHING_ITEMS.tops[4], bottom: CLOTHING_ITEMS.bottoms[4], shoes: CLOTHING_ITEMS.shoes[4], accessory: CLOTHING_ITEMS.accessories[3] },
  { id: 'o3', name: 'Rose Edit', sauce: 5610, creator: 'cleo.m', tribe: 'Minimal', bgColor: '#FCE4EC', avatarColor: '#E0E0E0', top: CLOTHING_ITEMS.tops[2], bottom: CLOTHING_ITEMS.bottoms[1], shoes: CLOTHING_ITEMS.shoes[1], accessory: CLOTHING_ITEMS.accessories[4] },
  { id: 'o4', name: 'Forest', sauce: 3200, creator: 'mir', tribe: 'Minimal', bgColor: '#E8F5E9', avatarColor: '#66BB6A', top: CLOTHING_ITEMS.tops[2], bottom: CLOTHING_ITEMS.bottoms[1], shoes: CLOTHING_ITEMS.shoes[4], accessory: CLOTHING_ITEMS.accessories[4] },
];
export const FEED_POSTS = [
  { id: 'p1', user: 'jaystyled', userEmoji: '🔥', tribe: 'Streetwear Tribe', outfit: OUTFITS[0], sauce: 8200, caption: 'void drip era 🌑 #streetwear #stribes', timeAgo: '2h ago', items: ['Oversized Hoodie', 'Cargo Pants', 'Platform Boots'] },
  { id: 'p2', user: 'cleo.m', userEmoji: '🌸', tribe: 'Minimal Tribe', outfit: OUTFITS[2], sauce: 5610, caption: 'ghost white era 🤍 less is always more #minimal #stribes', timeAgo: '5h ago', items: ['Linen Shirt', 'Wide Trousers', 'Mule Heels'] },
];
export const LOOK_CHAINS = [
  { id: 'lc1', name: 'Void Drip', remixCount: 14, chain: [
    { user: 'jaystyled', userEmoji: '🔥', badge: 'original', action: 'Posted the original Void Drip look', outfit: OUTFITS[0], sauce: 8200 },
    { user: 'streetkid_mx', userEmoji: '😎', badge: 'remix', action: 'Swapped hoodie for bomber jacket', outfit: { ...OUTFITS[0], name: 'Void Drip Mk.2', sauce: 3100 }, sauce: 3100 },
    { user: 'yuki.fits', userEmoji: '🌸', badge: 'remix', action: 'Added pastel colourway + mini bag', outfit: { ...OUTFITS[2], name: 'Void Pastel', sauce: 1800 }, sauce: 1800 },
  ]},
];
export const STYLE_DNA = [
  { label: 'Streetwear', percent: 45, color: '#EC4899' },
  { label: 'Minimal', percent: 30, color: '#8B5CF6' },
  { label: 'Techwear', percent: 15, color: '#3B82F6' },
  { label: 'Vintage', percent: 10, color: '#F59E0B' },
];
export const USER_PROFILE = {
  name: 'You', handle: '@your.stribes', location: 'Chennai, IN',
  emoji: '😎', looks: 47, followers: '1.2k', sauce: '24k', dnaLevel: 3,
};
