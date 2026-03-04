// usePostFlow.ts
// Manages the 5-step post creation flow state.

import { useState, useCallback } from 'react';
import { OutfitPiece } from '@/constants/data';

export type PostStep = 1 | 2 | 3 | 4 | 5;

type PostFlowState = {
  step: PostStep;
  photoUri: string | null;
  scanProgress: number;
  pieces: OutfitPiece[];
  selectedTribe: string;
  caption: string;
  tryOnEnabled: boolean;
  allowRemix: boolean;
};

// Default AI-detected pieces (in real app this comes from your AI model)
const DEFAULT_PIECES: OutfitPiece[] = [
  { type: 'TOP',         name: 'Oversized Graphic Hoodie', detail: 'Fleece · Black · Graphic',  color: '#A855F7', confidence: 94 },
  { type: 'BOTTOM',      name: 'Cargo Wide-Leg Pants',     detail: 'Cotton · Black',             color: '#6366F1', confidence: 89 },
  { type: 'SHOES',       name: 'Platform Chunky Boots',    detail: 'Faux leather · Lace-up',     color: '#FF6B9D', confidence: 91 },
  { type: 'ACCESSORIES', name: 'Chain Crossbody Bag',      detail: 'Mini · Silver hardware',     color: '#A1A1AA', confidence: 76 },
];

export function usePostFlow() {
  const [state, setState] = useState<PostFlowState>({
    step: 1,
    photoUri: null,
    scanProgress: 0,
    pieces: DEFAULT_PIECES,
    selectedTribe: 'streetwear',
    caption: '',
    tryOnEnabled: true,
    allowRemix: true,
  });

  const goToStep = useCallback((step: PostStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setPhoto = useCallback((uri: string) => {
    setState((prev) => ({ ...prev, photoUri: uri, step: 2 }));
    // Simulate AI scan progress
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 8 + 4;
      if (p >= 100) { p = 100; clearInterval(iv); }
      setState((prev) => ({ ...prev, scanProgress: Math.min(p, 100) }));
    }, 120);
  }, []);

  const updatePiece = useCallback((index: number, name: string) => {
    setState((prev) => {
      const pieces = [...prev.pieces];
      pieces[index] = { ...pieces[index], name };
      return { ...prev, pieces };
    });
  }, []);

  const setTribe = useCallback((id: string) => {
    setState((prev) => ({ ...prev, selectedTribe: id }));
  }, []);

  const setCaption = useCallback((text: string) => {
    setState((prev) => ({ ...prev, caption: text }));
  }, []);

  const toggleTryOn = useCallback(() => {
    setState((prev) => ({ ...prev, tryOnEnabled: !prev.tryOnEnabled }));
  }, []);

  const reset = useCallback(() => {
    setState({
      step: 1,
      photoUri: null,
      scanProgress: 0,
      pieces: DEFAULT_PIECES,
      selectedTribe: 'streetwear',
      caption: '',
      tryOnEnabled: true,
      allowRemix: true,
    });
  }, []);

  return { ...state, goToStep, setPhoto, updatePiece, setTribe, setCaption, toggleTryOn, reset };
}
