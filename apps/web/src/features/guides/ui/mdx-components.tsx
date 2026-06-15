import { cn } from '@workspace/ui/lib/utils';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import { GuideImage } from '@/features/guides/ui/guide-image';

function isInternal(href: string) {
  return href.startsWith('/') || href.startsWith('#');
}

function Anchor({ href, ...props }: ComponentPropsWithoutRef<'a'>) {
  const target = href ?? '#';
  const className =
    'font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground';

  if (isInternal(target)) {
    return <Link className={className} href={target} {...props} />;
  }

  return (
    <a
      className={className}
      href={target}
      rel='noopener noreferrer'
      target='_blank'
      {...props}
    />
  );
}

export const guideMdxComponents: MDXComponents = {
  h2: ({ className, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className={cn(
        'mt-10 mb-3 border-foreground/10 border-b pb-2 font-medium font-mono text-base tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className={cn('mt-8 mb-2 font-medium text-sm', className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p
      className={cn(
        'my-4 text-foreground/90 text-sm leading-relaxed',
        className
      )}
      {...props}
    />
  ),
  a: Anchor,
  ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className={cn(
        'my-4 ml-5 list-disc space-y-2 marker:text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className={cn(
        'my-4 ml-5 list-decimal space-y-2 marker:text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li
      className={cn(
        'pl-1 text-foreground/90 text-sm leading-relaxed',
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong
      className={cn('font-medium text-foreground', className)}
      {...props}
    />
  ),
  blockquote: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className={cn(
        'my-4 border-foreground/20 border-l-2 pl-4 text-muted-foreground text-sm italic',
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
    <hr className={cn('my-8 border-foreground/10', className)} {...props} />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className={cn(
        'my-4 overflow-x-auto border border-foreground/10 bg-muted/40 p-4 font-mono text-xs leading-relaxed [&>code]:bg-transparent [&>code]:p-0',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className={cn(
        'bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground',
        className
      )}
      {...props}
    />
  ),
  img: GuideImage,
};
