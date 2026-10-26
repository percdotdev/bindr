import type { MDXComponents } from 'mdx/types';
import type { ComponentType } from 'react';

import { formatGuideDate } from '@/features/guides/lib/format-date';
import type { GuideMeta } from '@/features/guides/lib/registry';
import { guideMdxComponents } from '@/features/guides/ui/mdx-components';

interface GuideArticleProps {
  Content: ComponentType<{ components?: MDXComponents }>;
  description: string;
  locale: string;
  meta: GuideMeta;
  title: string;
}

export function GuideArticle({
  Content,
  description,
  locale,
  meta,
  title,
}: GuideArticleProps) {
  return (
    <main className='mx-auto w-full max-w-3xl px-6 py-10 md:py-16'>
      <article>
        <header className='border-foreground/10 mb-8 flex flex-col gap-3 border-b pb-6'>
          <span className='text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase'>
            {formatGuideDate(meta.date, locale)}
          </span>
          <h1 className='font-mono text-2xl font-medium tracking-tight md:text-3xl'>
            {title}
          </h1>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {description}
          </p>
        </header>
        <Content components={guideMdxComponents} />
      </article>
    </main>
  );
}
