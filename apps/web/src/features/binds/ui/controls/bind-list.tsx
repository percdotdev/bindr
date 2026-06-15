'use client';

import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

import { formatBindLine } from '@/features/binds/lib/export/format-bind';
import {
  BIND_CATEGORY_LABELS,
  BIND_CATEGORY_ORDER,
} from '@/features/binds/lib/model/recommended-binds';
import type { BindCategory, BindEntry } from '@/features/binds/lib/model/types';

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
  const sorted = binds.toSorted(sortBinds);
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

function getGroupLabel(category: BindCategory | 'other') {
  if (category === 'other') {
    return 'Custom';
  }

  return BIND_CATEGORY_LABELS[category];
}

export function BindList({
  binds,
  onRemove,
  onSelectKey,
  selectedKey,
}: BindListProps) {
  if (binds.length === 0) {
    return (
      <p className='text-muted-foreground text-sm'>
        No binds yet.{' '}
        <Link
          className='underline underline-offset-4'
          href='/binds/recommended'
        >
          Pick from recommended binds
        </Link>{' '}
        or click a key on the keyboard.
      </p>
    );
  }

  const groups = groupBinds(binds);

  return (
    <div className='flex flex-col gap-4'>
      {groups.map((group) => (
        <section className='flex flex-col gap-2' key={group.category}>
          <h3 className='font-medium text-muted-foreground text-xs uppercase tracking-wide'>
            {getGroupLabel(group.category)}
          </h3>
          <ul className='flex flex-col gap-2'>
            {group.items.map((bind) => (
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
                    <p className='font-medium font-mono text-xs uppercase'>
                      {bind.key}
                    </p>
                    {bind.label ? (
                      <span className='rounded-full bg-muted px-2 py-0.5 text-[10px]'>
                        {bind.label}
                      </span>
                    ) : null}
                    {selectedKey === bind.key ? (
                      <span className='text-[10px] text-muted-foreground'>
                        selected
                      </span>
                    ) : null}
                  </div>
                  {bind.description ? (
                    <p className='mt-1 text-muted-foreground text-xs'>
                      {bind.description}
                    </p>
                  ) : null}
                  <p className='mt-2 break-all font-mono text-muted-foreground text-xs'>
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
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
