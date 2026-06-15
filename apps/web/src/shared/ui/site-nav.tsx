'use client';

import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TOOL_LINKS = [
  {
    href: '/crosshair',
    label: 'crosshair',
    match: (pathname: string) => pathname.startsWith('/crosshair'),
  },
  {
    href: '/binds',
    label: 'binds',
    match: (pathname: string) => pathname.startsWith('/binds'),
  },
  {
    href: '/config',
    label: 'config',
    match: (pathname: string) => pathname.startsWith('/config'),
  },
  {
    href: '/autoexec',
    label: 'autoexec',
    match: (pathname: string) => pathname.startsWith('/autoexec'),
  },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === '/';

  return (
    <header
      className={cn(
        'mx-auto flex w-full max-w-4xl items-baseline gap-4 px-6 pt-6 pb-1',
        onHome ? 'justify-end' : 'justify-between'
      )}
    >
      {onHome ? null : (
        <Link
          className='font-mono text-muted-foreground text-xs transition-colors hover:text-foreground'
          href='/'
        >
          ← bindr.lol
        </Link>
      )}
      <nav
        aria-label='Tools'
        className='flex items-baseline gap-4 font-mono text-xs'
      >
        {TOOL_LINKS.map((item) => {
          const isActive = item.match(pathname);

          return (
            <Link
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'transition-colors',
                isActive
                  ? 'text-foreground underline decoration-foreground/30 underline-offset-[6px]'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
