'use client';

import { CONFIG_CATEGORY_ORDER } from '@workspace/cs2/config/recommended/categories';
import { cn } from '@workspace/ui/lib/utils';
import { useTranslations } from 'next-intl';

export function ConfigSectionNav() {
  const t = useTranslations('config');

  return (
    <nav
      aria-label={t('sectionNavAria')}
      className='-mx-1 flex flex-wrap gap-1.5 overflow-x-auto px-1'
    >
      {CONFIG_CATEGORY_ORDER.map((category) => (
        <a
          className={cn(
            'text-muted-foreground rounded-full border px-3 py-1 text-xs transition-colors',
            'hover:border-foreground/30 hover:text-foreground'
          )}
          href={`#config-${category}`}
          key={category}
        >
          {t(`categories.${category}`)}
        </a>
      ))}
    </nav>
  );
}
