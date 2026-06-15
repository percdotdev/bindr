'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { isTypingTarget } from '@/features/theme/lib/is-typing-target';

export function useThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
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

      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [resolvedTheme, setTheme]);
}
