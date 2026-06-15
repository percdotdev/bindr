import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@workspace/ui/components/terminal';

const BANNER_ART = [
  '    __    _           __',
  '   / /_  (_)___  ____/ /____',
  '  / __ \\/ / __ \\/ __  / ___/',
  ' / /_/ / / / / / /_/ / /',
  '/_.___/_/_/ /_/\\__,_/_/',
];

export function HomeConsole() {
  return (
    <Terminal className='h-100 max-h-none max-w-none rounded-none border-foreground/10 font-mono text-foreground'>
      <TypingAnimation className='text-foreground'>
        ] exec autoexec
      </TypingAnimation>
      <AnimatedSpan className='text-muted-foreground/50'>
        ===============================================
      </AnimatedSpan>
      {BANNER_ART.map((line) => (
        <AnimatedSpan className='whitespace-pre text-foreground' key={line}>
          {line}
        </AnimatedSpan>
      ))}
      <AnimatedSpan className='text-muted-foreground/60'>
        {'   bindr.lol  -  browser CS2 config studio'}
      </AnimatedSpan>
      <AnimatedSpan className='text-muted-foreground/50'>
        ===============================================
      </AnimatedSpan>
      <TypingAnimation className='text-muted-foreground'>
        cl_crosshairsize 2.0
      </TypingAnimation>
      <TypingAnimation className='text-muted-foreground'>
        viewmodel_fov 68
      </TypingAnimation>
      <TypingAnimation className='text-muted-foreground'>
        bind "z" "switchhands"
      </TypingAnimation>
      <AnimatedSpan className='text-foreground'>
        bindr.lol autoexec loaded
      </AnimatedSpan>
    </Terminal>
  );
}
