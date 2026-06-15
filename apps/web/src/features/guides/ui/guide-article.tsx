import type { MDXComponents } from 'mdx/types';
import type { ComponentType } from 'react';

import { formatGuideDate } from '@/features/guides/lib/format-date';
import type { GuideMeta } from '@/features/guides/lib/registry';
import { guideMdxComponents } from '@/features/guides/ui/mdx-components';

interface GuideArticleProps {
  Content: ComponentType<{ components?: MDXComponents }>;
  meta: GuideMeta;
}

export function GuideArticle({ Content, meta }: GuideArticleProps) {
  return (
    <main className='mx-auto w-full max-w-3xl px-6 py-10 md:py-16'>
      <article>
        <header className='mb-8 flex flex-col gap-3 border-foreground/10 border-b pb-6'>
          <span className='font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]'>
            {formatGuideDate(meta.date)}
          </span>
          <h1 className='font-medium font-mono text-2xl tracking-tight md:text-3xl'>
            {meta.title}
          </h1>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {meta.description}
          </p>
        </header>
        <Content components={guideMdxComponents} />
      </article>
    </main>
  );
}
