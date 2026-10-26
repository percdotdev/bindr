'use client';

import { formatBindLine } from '@workspace/cs2/binds/export/format-bind';
import type { BindCategory, BindEntry } from '@workspace/cs2/binds/model/types';
import { BIND_CATEGORY_ORDER } from '@workspace/cs2/binds/recommended/categories';
import { Button } from '@workspace/ui/components/button';
import { useTranslations } from 'next-intl';

import { asBindItemKey } from '@/features/binds/lib/bind-item-key';
import { Link } from '@/i18n/navigation';

interface BindListProps {
  binds: BindEntry[];
  onRemove: (key: string) => void;
  onSelectKey: (key: string) => void;
  selectedKey: string | null;
}

function sortBinds(a: BindEntry, b: BindEntry) {
  const categoryA = a.category ?? 'other';
  const categoryB = b.category ?? 'other';
  const orderA = BIND_CATEGORY_ORDER.indexOf(categoryA as BindCategory);
  const orderB = BIND_CATEGORY_ORDER.indexOf(categoryB as BindCategory);
  const rankA = orderA === -1 ? BIND_CATEGORY_ORDER.length : orderA;
  const rankB = orderB === -1 ? BIND_CATEGORY_ORDER.length : orderB;

  if (rankA !== rankB) {
    return rankA - rankB;
  }

  return a.key.localeCompare(b.key);
}

function groupBinds(binds: BindEntry[]) {
  const sorted = [...binds].sort(sortBinds);
  const groups: { category: BindCategory | 'other'; items: BindEntry[] }[] = [];

  for (const bind of sorted) {
    const category = bind.category ?? 'other';
    const last = groups.at(-1);

    if (last?.category === category) {
      last.items.push(bind);
      continue;
    }

    groups.push({ category, items: [bind] });
  }

  return groups;
}

export function BindList({
  binds,
  onRemove,
  onSelectKey,
  selectedKey,
}: BindListProps) {
  const t = useTranslations('binds');
  const tCommon = useTranslations('common');

  function getGroupLabel(category: BindCategory | 'other') {
    if (category === 'other') {
      return t('customCategory');
    }

    return t(`categories.${category}`);
  }

  function getBindLabel(bind: BindEntry) {
    const itemKey = asBindItemKey(bind.id);
    if (itemKey) {
      return t(`items.${itemKey}.label`);
    }

    return bind.label;
  }

  function getBindDescription(bind: BindEntry) {
    const itemKey = asBindItemKey(bind.id);
    if (itemKey) {
      return t(`items.${itemKey}.description`);
    }

    return bind.description;
  }

  if (binds.length === 0) {
    return (
      <p className='text-muted-foreground text-sm'>
        {t.rich('emptyList', {
          link: (chunks) => (
            <Link
              className='underline underline-offset-4'
              href='/binds/recommended'
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    );
  }

  const groups = groupBinds(binds);

  return (
    <div className='flex flex-col gap-4'>
      {groups.map((group) => (
        <section className='flex flex-col gap-2' key={group.category}>
          <h3 className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
            {getGroupLabel(group.category)}
          </h3>
          <ul className='flex flex-col gap-2'>
            {group.items.map((bind) => {
              const label = getBindLabel(bind);
              const description = getBindDescription(bind);

              return (
                <li
                  className='flex items-start justify-between gap-3 rounded-md border p-3'
                  key={bind.id}
                >
                  <button
                    className='min-w-0 flex-1 text-left'
                    onClick={() => {
                      onSelectKey(bind.key);
                    }}
                    type='button'
                  >
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='font-mono text-xs font-medium uppercase'>
                        {bind.key}
                      </p>
                      {label ? (
                        <span className='bg-muted rounded-full px-2 py-0.5 text-[10px]'>
                          {label}
                        </span>
                      ) : null}
                      {selectedKey === bind.key ? (
                        <span className='text-muted-foreground text-[10px]'>
                          {t('selected')}
                        </span>
                      ) : null}
                    </div>
                    {description ? (
                      <p className='text-muted-foreground mt-1 text-xs'>
                        {description}
                      </p>
                    ) : null}
                    <p className='text-muted-foreground mt-2 font-mono text-xs break-all'>
                      {formatBindLine(bind)}
                    </p>
                  </button>
                  <Button
                    onClick={() => {
                      onRemove(bind.key);
                    }}
                    size='sm'
                    type='button'
                    variant='ghost'
                  >
                    {tCommon('remove')}
                  </Button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
