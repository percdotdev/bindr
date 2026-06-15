'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from '@/features/theme/ui/theme-provider';

export function RootProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
