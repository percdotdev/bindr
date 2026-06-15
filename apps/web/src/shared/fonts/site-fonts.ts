import { cn } from '@workspace/ui/lib/utils';
import { Geist, Geist_Mono } from 'next/font/google';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const siteFontClassName = cn(
  'font-sans antialiased',
  geist.variable,
  fontMono.variable
);
