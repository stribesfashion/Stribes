// useSauce.ts
// Manages the ◈ Sauce score toggle for each post.
// Each post has its own sauce count tracked separately.

import { useState, useCallback } from 'react';

type SauceState = {
  count: number;
  isSauced: boolean;
};

export function useSauce(initialCount: number) {
  const [state, setState] = useState<SauceState>({
    count: initialCount,
    isSauced: false,
  });

  const toggle = useCallback(() => {
    setState((prev) => ({
      count: prev.isSauced ? prev.count - 1 : prev.count + 1,
      isSauced: !prev.isSauced,
    }));
  }, []);

  // Format number: 8241 → "8.2k"
  const formatted =
    state.count >= 1000
      ? (state.count / 1000).toFixed(1) + 'k'
      : String(state.count);

  return { count: state.count, isSauced: state.isSauced, formatted, toggle };
}
