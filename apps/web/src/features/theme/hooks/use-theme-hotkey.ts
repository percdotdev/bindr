'use client';

import { useTheme } from 'next-themes';
import { useRef } from 'react';

import { isTypingTarget } from '@/features/theme/lib/is-typing-target';
import { useMountEffect } from '@/shared/hooks/use-mount-effect';

export function useThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();
  const resolvedThemeRef = useRef(resolvedTheme);

  resolvedThemeRef.current = resolvedTheme;

  useMountEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (event.key.toLowerCase() !== 't') {
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      setTheme(resolvedThemeRef.current === 'dark' ? 'light' : 'dark');
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });
}
