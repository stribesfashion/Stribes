// useTryOn.ts
// Manages all state for the Try-On screen:
// - which outfit is loaded
// - whether user has captured their photo
// - generation progress and result

import { useState, useCallback, useRef } from 'react';

type TryOnState = {
  outfitLoaded: boolean;
  photoTaken: boolean;
  isGenerating: boolean;
  progress: number;
  currentStep: number;
  resultReady: boolean;
  styleMatch: number;
  selectedOutfitColor: string;
};

const GEN_STEPS = [
  'Body detection',
  'Pose mapping',
  'Cloth warping',
  'Texture blend',
  'Finishing',
];

export function useTryOn() {
  const [state, setState] = useState<TryOnState>({
    outfitLoaded: false,
    photoTaken: false,
    isGenerating: false,
    progress: 0,
    currentStep: 0,
    resultReady: false,
    styleMatch: 94,
    selectedOutfitColor: '#A855F7',
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadOutfit = useCallback((color?: string) => {
    setState((prev) => ({
      ...prev,
      outfitLoaded: true,
      selectedOutfitColor: color ?? prev.selectedOutfitColor,
    }));
  }, []);

  const resetOutfit = useCallback(() => {
    setState((prev) => ({
      ...prev,
      outfitLoaded: false,
      resultReady: false,
      progress: 0,
      currentStep: 0,
    }));
  }, []);

  const takePhoto = useCallback(() => {
    setState((prev) => ({ ...prev, photoTaken: true }));
  }, []);

  const resetPhoto = useCallback(() => {
    setState((prev) => ({
      ...prev,
      photoTaken: false,
      resultReady: false,
      progress: 0,
      currentStep: 0,
    }));
  }, []);

  const generate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState((prev) => ({
      ...prev,
      isGenerating: true,
      progress: 0,
      currentStep: 0,
      resultReady: false,
    }));

    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          progress: 100,
          currentStep: GEN_STEPS.length,
          resultReady: true,
          styleMatch: Math.floor(Math.random() * 8) + 90, // 90–97%
        }));
        return;
      }
      const step = Math.floor((p / 100) * GEN_STEPS.length);
      setState((prev) => ({ ...prev, progress: p, currentStep: step }));
    }, 200);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState({
      outfitLoaded: false,
      photoTaken: false,
      isGenerating: false,
      progress: 0,
      currentStep: 0,
      resultReady: false,
      styleMatch: 94,
      selectedOutfitColor: '#A855F7',
    });
  }, []);

  return {
    ...state,
    genSteps: GEN_STEPS,
    loadOutfit,
    resetOutfit,
    takePhoto,
    resetPhoto,
    generate,
    reset,
  };
}
