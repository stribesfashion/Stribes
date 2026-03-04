# STRIBES — Complete Setup Guide

## What this is
STRIBES is a React Native app built with Expo. One codebase runs on both iOS and Android.

---

## Step 1 — Install Node.js
Download from: https://nodejs.org  
Choose the **LTS** version. Install it.

Verify in your terminal (Ctrl+` in VS Code):
```
node --version
npm --version
```

---

## Step 2 — Install Expo CLI
```
npm install -g expo-cli
```

---

## Step 3 — Install all app dependencies
```
cd stribes
npm install
```

---

## Step 4 — Run the app
```
npx expo start
```

This opens a QR code in your terminal.

**To run on your phone:**
1. Download **Expo Go** from the App Store or Play Store
2. Scan the QR code
3. The app loads on your phone instantly

**To run on an emulator (PC only):**
- Download Android Studio from https://developer.android.com/studio
- Create a virtual device inside it
- Press `a` in the Expo terminal to open it

---

## File structure explained

```
stribes/
├── app/                    ← All SCREENS live here
│   ├── (tabs)/             ← Bottom navigation tabs
│   │   ├── index.tsx       ← FEED screen (home)
│   │   ├── tryon.tsx       ← TRY-ON screen
│   │   ├── tribes.tsx      ← TRIBES screen
│   │   └── me.tsx          ← PROFILE screen
│   ├── post/               ← POST FLOW (5 steps)
│   │   ├── camera.tsx      ← Step 1: Take photo
│   │   ├── scan.tsx        ← Step 2: AI Drape Scan
│   │   ├── tags.tsx        ← Step 3: Tag pieces
│   │   ├── details.tsx     ← Step 4: Caption & settings
│   │   └── success.tsx     ← Step 5: Dropped!
│   └── remix/
│       └── catalogue.tsx   ← Remix piece picker
│
├── components/             ← Reusable UI pieces
│   ├── FeedCard.tsx        ← One post card
│   ├── SauceButton.tsx     ← ◈ Sauce score
│   ├── RemixSheet.tsx      ← Bottom sheet catalogue
│   └── StepDots.tsx        ← Progress dots
│
├── constants/
│   ├── colors.ts           ← All colors (change here to retheme)
│   └── data.ts             ← Mock data (posts, tribes, etc.)
│
└── hooks/
    ├── useSauce.ts         ← Sauce toggle logic
    ├── useTryOn.ts         ← Try-on generation state
    └── usePostFlow.ts      ← Post step navigation
```

---

## How to make changes

| You want to | File to edit |
|---|---|
| Change brand colors | `constants/colors.ts` |
| Add a new feed post | `constants/data.ts` → `FEED_POSTS` array |
| Add a tribe | `constants/data.ts` → `TRIBES` array |
| Add remix items | `constants/data.ts` → `REMIX_ITEMS` array |
| Change Feed UI | `app/(tabs)/index.tsx` |
| Change Try-On UI | `app/(tabs)/tryon.tsx` |
| Change a post flow step | `app/post/[step].tsx` |
| Change the tab bar | `app/(tabs)/_layout.tsx` |

---

## Tech stack
- **React Native** — cross-platform mobile framework
- **Expo** — toolchain that makes RN easy
- **Expo Router** — file-based navigation (like Next.js but for mobile)
- **TypeScript** — typed JavaScript (`.tsx` files)
- **expo-linear-gradient** — gradient colors
- **expo-image-picker** — gallery photo selection
- **expo-camera** — camera access
- **react-native-reanimated** — smooth animations
- **@expo/vector-icons** — icon library (Ionicons)

---

## Common commands
```bash
npx expo start          # Start the dev server
npx expo start --clear  # Clear cache and restart
npm install <package>   # Add a new library
```
