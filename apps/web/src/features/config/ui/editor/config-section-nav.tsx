'use client';

import {
  CONFIG_CATEGORY_LABELS,
  CONFIG_CATEGORY_ORDER,
} from '@workspace/cs2/config/recommended/categories';
import { cn } from '@workspace/ui/lib/utils';

export function ConfigSectionNav() {
  return (
    <nav
      aria-label='Config sections'
      className='-mx-1 flex flex-wrap gap-1.5 overflow-x-auto px-1'
    >
      {CONFIG_CATEGORY_ORDER.map((category) => (
        <a
          className={cn(
            'rounded-full border px-3 py-1 text-muted-foreground text-xs transition-colors',
            'hover:border-foreground/30 hover:text-foreground'
          )}
          href={`#config-${category}`}
          key={category}
        >
          {CONFIG_CATEGORY_LABELS[category]}
        </a>
      ))}
    </nav>
  );
}
