'use client';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

import { ThemeHotkey } from '@/features/theme/ui/theme-hotkey';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableSystem
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  );
}
