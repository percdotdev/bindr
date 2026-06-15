import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/crosshair', label: 'crosshair' },
  { href: '/binds', label: 'binds' },
  { href: '/binds/recommended', label: 'recommended' },
] as const;

export function SiteFooter() {
  return (
    <footer className='mx-auto mt-auto w-full max-w-4xl px-6 py-10'>
      <div className='flex flex-col gap-4 border-foreground/10 border-t pt-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <Link
            className='w-fit font-mono text-foreground text-xs transition-colors hover:text-muted-foreground'
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
                className='text-muted-foreground transition-colors hover:text-foreground'
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex flex-col gap-1 font-mono text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
          <p>Not affiliated with Valve Corporation.</p>
          <p>
            Press{' '}
            <kbd className='rounded-none bg-muted px-1 py-0.5 text-foreground ring-1 ring-foreground/10'>
              t
            </kbd>{' '}
            for theme
          </p>
        </div>
      </div>
    </footer>
  );
}
