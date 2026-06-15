import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';

import { HOME_CATALOG_LINKS } from '@/features/home/lib/home-sections';

export function HomeCatalogs() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <h2 className='font-medium text-sm'>Curated catalogs</h2>
        <p className='text-muted-foreground text-xs'>
          Start from MM-safe 2026 meta presets and keep only what you want.
        </p>
      </div>
      <div className='flex flex-wrap gap-2'>
        {HOME_CATALOG_LINKS.map((item) => (
          <Link
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outline' }),
              'inline-flex'
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
