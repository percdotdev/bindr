'use client';

import { Card } from '@workspace/ui/components/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@workspace/ui/components/collapsible';
import { cn } from '@workspace/ui/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface CollapsibleSectionProps {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  defaultOpen?: boolean;
  description?: ReactNode;
  id?: string;
  title: ReactNode;
}

export function CollapsibleSection({
  action,
  children,
  className,
  contentClassName,
  defaultOpen = true,
  description,
  id,
  title,
}: CollapsibleSectionProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      render={<Card className={cn('scroll-mt-16 gap-0', className)} id={id} />}
    >
      <div className='flex items-center gap-2 px-(--card-spacing)'>
        <CollapsibleTrigger className='group/section flex flex-1 items-center gap-2 text-left'>
          <ChevronDownIcon className='text-muted-foreground size-4 shrink-0 -rotate-90 transition-transform duration-200 group-data-panel-open/section:rotate-0' />
          <span className='flex flex-col gap-1'>
            <span className='font-heading text-sm font-medium'>{title}</span>
            {description ? (
              <span className='text-muted-foreground text-xs font-normal'>
                {description}
              </span>
            ) : null}
          </span>
        </CollapsibleTrigger>
        {action}
      </div>
      <CollapsibleContent>
        <div
          className={cn(
            'px-(--card-spacing) pt-(--card-spacing)',
            contentClassName
          )}
        >
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
