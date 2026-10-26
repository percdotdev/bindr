'use client';

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@workspace/ui/components/terminal';
import { useTranslations } from 'next-intl';

const BANNER_ART = [
  '    __    _           __',
  '   / /_  (_)___  ____/ /____',
  '  / __ \\/ / __ \\/ __  / ___/',
  ' / /_/ / / / / / /_/ / /',
  '/_.___/_/_/ /_/\\__,_/_/',
];

export function HomeConsole() {
  const t = useTranslations('home.console');

  return (
    <Terminal className='border-foreground/10 text-foreground h-100 max-h-none max-w-none rounded-none font-mono'>
      <TypingAnimation className='text-foreground'>
        ] exec autoexec
      </TypingAnimation>
      <AnimatedSpan className='text-muted-foreground'>
        ===============================================
      </AnimatedSpan>
      {BANNER_ART.map((line) => (
        <AnimatedSpan className='text-foreground whitespace-pre' key={line}>
          {line}
        </AnimatedSpan>
      ))}
      <AnimatedSpan className='text-muted-foreground'>
        {t('tagline')}
      </AnimatedSpan>
      <AnimatedSpan className='text-muted-foreground'>
        ===============================================
      </AnimatedSpan>
      <TypingAnimation className='text-muted-foreground'>
        cl_crosshair_length 8
      </TypingAnimation>
      <TypingAnimation className='text-muted-foreground'>
        viewmodel_fov 68
      </TypingAnimation>
      <TypingAnimation className='text-muted-foreground'>
        bind "z" "switchhands"
      </TypingAnimation>
      <AnimatedSpan className='text-foreground'>{t('loaded')}</AnimatedSpan>
    </Terminal>
  );
}
