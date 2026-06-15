import type { MDXComponents } from 'mdx/types';

import { guideMdxComponents } from '@/features/guides/ui/mdx-components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...guideMdxComponents,
    ...components,
  };
}
