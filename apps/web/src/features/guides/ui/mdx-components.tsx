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
  a: Anchor,
  blockquote: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className={cn(
        'border-foreground/20 text-muted-foreground my-4 border-l-2 pl-4 text-sm italic',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className={cn(
        'bg-muted text-foreground px-1 py-0.5 font-mono text-[0.85em]',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className={cn(
        'border-foreground/10 mt-10 mb-3 border-b pb-2 font-mono text-base font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className={cn('mt-8 mb-2 text-sm font-medium', className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
    <hr className={cn('border-foreground/10 my-8', className)} {...props} />
  ),
  img: GuideImage,
  li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li
      className={cn(
        'text-foreground/90 pl-1 text-sm leading-relaxed',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className={cn(
        'marker:text-muted-foreground my-4 ml-5 list-decimal space-y-2',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p
      className={cn(
        'text-foreground/90 my-4 text-sm leading-relaxed',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className={cn(
        'border-foreground/10 bg-muted/40 my-4 overflow-x-auto border p-4 font-mono text-xs leading-relaxed [&>code]:bg-transparent [&>code]:p-0',
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong
      className={cn('text-foreground font-medium', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className={cn(
        'marker:text-muted-foreground my-4 ml-5 list-disc space-y-2',
        className
      )}
      {...props}
    />
  ),
};
