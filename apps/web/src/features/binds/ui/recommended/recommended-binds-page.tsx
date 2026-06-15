'use client';

import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import Link from 'next/link';

import { useBindEditor } from '@/features/binds/hooks/use-bind-editor';
import {
  BIND_CATEGORY_LABELS,
  BIND_CATEGORY_ORDER,
  RECOMMENDED_BIND_TEMPLATES,
} from '@/features/binds/lib/model/recommended-binds';
import type { BindCategory } from '@/features/binds/lib/model/types';
import { BindsNav } from '@/features/binds/ui/editor/binds-nav';
import { RecommendedBindCard } from '@/features/binds/ui/recommended/recommended-bind-card';

function groupTemplatesByCategory() {
  const groups = new Map<BindCategory, typeof RECOMMENDED_BIND_TEMPLATES>();

  for (const category of BIND_CATEGORY_ORDER) {
    groups.set(category, []);
  }

  for (const template of RECOMMENDED_BIND_TEMPLATES) {
    const current = groups.get(template.category) ?? [];
    current.push(template);
    groups.set(template.category, current);
  }

  return groups;
}

export function RecommendedBindsPage() {
  const { activeKeys, addRecommendedBind, loadRecommendedBinds, removeBind } =
    useBindEditor();

  const grouped = groupTemplatesByCategory();
  const addedCount = RECOMMENDED_BIND_TEMPLATES.filter((template) =>
    activeKeys.has(template.key)
  ).length;

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-3'>
        <BindsNav />
        <div className='flex flex-col gap-1'>
          <h1 className='font-medium text-sm'>Recommended binds</h1>
          <p className='text-muted-foreground text-xs'>
            Pick only the binds you want. Each one is Valve MM safe and uses
            2026 meta keys — add individually or take the full set.
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            onClick={loadRecommendedBinds}
            type='button'
            variant='outline'
          >
            Add all ({RECOMMENDED_BIND_TEMPLATES.length})
          </Button>
          <span className='text-muted-foreground text-xs'>
            {addedCount} of {RECOMMENDED_BIND_TEMPLATES.length} in your config
          </span>
          <Link
            className='text-muted-foreground text-xs underline-offset-4 hover:underline'
            href='/binds'
          >
            Open editor
          </Link>
        </div>
      </div>

      {BIND_CATEGORY_ORDER.map((category) => {
        const templates = grouped.get(category) ?? [];
        if (templates.length === 0) {
          return null;
        }

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{BIND_CATEGORY_LABELS[category]}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              {templates.map((template) => (
                <RecommendedBindCard
                  isActive={activeKeys.has(template.key)}
                  key={template.id}
                  onAdd={() => {
                    addRecommendedBind(template.id);
                  }}
                  onRemove={() => {
                    removeBind(template.key);
                  }}
                  template={template}
                />
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
