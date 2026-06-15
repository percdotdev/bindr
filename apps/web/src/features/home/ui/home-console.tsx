import { cn } from '@workspace/ui/lib/utils';

type LineTone = 'prompt' | 'brand' | 'dim' | 'cmd' | 'ok';

interface ConsoleLine {
  id: string;
  text: string;
  tone: LineTone;
}

const CONSOLE_LINES: ConsoleLine[] = [
  { id: 'prompt', text: '] exec autoexec', tone: 'prompt' },
  {
    id: 'rule-top',
    text: '===============================================',
    tone: 'dim',
  },
  { id: 'art-1', text: '    __    _           __', tone: 'brand' },
  { id: 'art-2', text: '   / /_  (_)___  ____/ /____', tone: 'brand' },
  { id: 'art-3', text: '  / __ \\/ / __ \\/ __  / ___/', tone: 'brand' },
  { id: 'art-4', text: ' / /_/ / / / / / /_/ / /', tone: 'brand' },
  { id: 'art-5', text: '/_.___/_/_/ /_/\\__,_/_/', tone: 'brand' },
  {
    id: 'tagline',
    text: '   bindr.lol  -  browser CS2 config studio',
    tone: 'dim',
  },
  {
    id: 'rule-bottom',
    text: '===============================================',
    tone: 'dim',
  },
  { id: 'cmd-1', text: 'cl_crosshairsize 2.0', tone: 'cmd' },
  { id: 'cmd-2', text: 'viewmodel_fov 68', tone: 'cmd' },
  { id: 'cmd-3', text: 'bind "z" "switchhands"', tone: 'cmd' },
  { id: 'loaded', text: 'bindr.lol autoexec loaded', tone: 'ok' },
];

const TONE_CLASS: Record<LineTone, string> = {
  prompt: 'text-foreground',
  brand: 'text-foreground',
  dim: 'text-muted-foreground/60',
  cmd: 'text-muted-foreground',
  ok: 'text-foreground',
};

export function HomeConsole() {
  return (
    <div className='overflow-hidden border border-foreground/10 bg-muted/30'>
      <div className='flex items-center gap-1.5 border-foreground/10 border-b bg-muted/50 px-3 py-2'>
        <span className='size-2 rounded-full bg-foreground/20' />
        <span className='size-2 rounded-full bg-foreground/20' />
        <span className='size-2 rounded-full bg-foreground/20' />
        <span className='ml-2 font-mono text-[10px] text-muted-foreground'>
          autoexec.cfg
        </span>
      </div>
      <pre className='overflow-x-auto p-4 font-mono text-[11px] leading-relaxed'>
        <code>
          {CONSOLE_LINES.map((line) => (
            <span className={cn('block', TONE_CLASS[line.tone])} key={line.id}>
              {line.text || ' '}
            </span>
          ))}
          <span aria-hidden className='block animate-pulse text-foreground'>
            ▌
          </span>
        </code>
      </pre>
    </div>
  );
}
