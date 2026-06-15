'use client';

import { type EffectCallback, useEffect } from 'react';

export function useMountEffect(effect: EffectCallback) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only lifecycle wrapper
  useEffect(effect, []);
}
