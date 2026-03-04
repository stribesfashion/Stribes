// STRIBES Design System — Color Tokens
// These are all the colors used across the entire app.
// Change them here and they update everywhere.

export const Colors = {
  // Brand gradient colors
  g1: '#FF6B9D',   // rose/pink
  g2: '#A855F7',   // violet/purple
  g3: '#6366F1',   // indigo/blue

  // Gradient as an array (used in LinearGradient components)
  grad: ['#FF6B9D', '#A855F7', '#6366F1'] as string[],
  gradH: ['#FF6B9D', '#A855F7', '#6366F1'] as string[],  // horizontal

  // Background colors (light theme)
  ink: '#09090B',       // near-black, primary text
  ink2: '#18181B',
  ink3: '#27272A',
  mist: '#71717A',      // secondary text
  fog: '#A1A1AA',       // placeholder / disabled text
  smoke: '#E4E4E7',     // borders
  ash: '#F4F4F5',       // light background fills
  paper: '#FAFAFA',     // screen background
  white: '#FFFFFF',

  // Tribe accent colors
  streetwear: '#FF6B9D',
  minimal: '#10B981',
  techwear: '#6366F1',
  academia: '#F59E0B',
  vintage: '#F472B6',

  // Transparent overlays
  softGrad: 'rgba(168,85,247,0.08)',
  softBorder: 'rgba(168,85,247,0.2)',
};

// Skin tone options for the mannequin
export const SkinTones = [
  { fill: '#FDDBB4', stroke: '#e0b090' },
  { fill: '#EDB98A', stroke: '#c8906a' },
  { fill: '#D08B5B', stroke: '#b07040' },
  { fill: '#AE5D29', stroke: '#8e4818' },
  { fill: '#694D3D', stroke: '#503828' },
  { fill: '#3B2314', stroke: '#280f00' },
];
