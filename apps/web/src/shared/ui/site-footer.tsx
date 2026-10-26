import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/crosshair', label: 'crosshair' },
  { href: '/binds', label: 'binds' },
  { href: '/config', label: 'config' },
  { href: '/autoexec', label: 'autoexec' },
  { href: '/binds/recommended', label: 'binds catalog' },
  { href: '/config/recommended', label: 'config catalog' },
  { href: '/guides', label: 'guides' },
] as const;

export function SiteFooter() {
  return (
    <footer className='mx-auto mt-auto w-full max-w-4xl px-6 py-10'>
      <div className='border-foreground/10 flex flex-col gap-4 border-t pt-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <Link
            className='text-foreground hover:text-muted-foreground w-fit font-mono text-xs transition-colors'
            href='/'
          >
            bindr.lol
          </Link>
          <nav
            aria-label='Footer'
            className='flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs'
          >
            {FOOTER_LINKS.map((item) => (
              <Link
                className='text-muted-foreground hover:text-foreground transition-colors'
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className='text-muted-foreground flex flex-col gap-1 font-mono text-[10px] sm:flex-row sm:items-center sm:justify-between'>
          <p>Not affiliated with Valve Corporation.</p>
          <p>
            Press{' '}
            <kbd className='bg-muted text-foreground ring-foreground/10 rounded-none px-1 py-0.5 ring-1'>
              t
            </kbd>{' '}
            for theme
          </p>
        </div>
      </div>
    </footer>
  );
}
