'use client';

import { Toaster } from '@workspace/ui/components/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';

import { ThemeProvider } from '@/features/theme/ui/theme-provider';

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </NuqsAdapter>
  );
}
