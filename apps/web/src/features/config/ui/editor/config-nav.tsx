'use client';

import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CONFIG_NAV = [
  { href: '/config', label: 'Editor' },
  { href: '/config/recommended', label: 'Recommended' },
] as const;

export function ConfigNav() {
  const pathname = usePathname();

  return (
    <nav aria-label='Config sections' className='flex flex-wrap gap-2'>
      {CONFIG_NAV.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: isActive ? 'default' : 'outline',
              }),
              'inline-flex'
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
