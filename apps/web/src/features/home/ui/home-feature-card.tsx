import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface HomeFeatureCardProps {
  className?: string;
  cta: string;
  description: string;
  href: string;
  icon: LucideIcon;
  index: string;
  title: string;
}

export function HomeFeatureCard({
  className,
  cta,
  description,
  href,
  icon: Icon,
  index,
  title,
}: HomeFeatureCardProps) {
  return (
    <Link
      className={cn(
        'group block transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        className
      )}
      href={href}
    >
      <Card className='h-full ring-foreground/10 transition-shadow group-hover:ring-foreground/25'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex size-8 items-center justify-center bg-muted ring-1 ring-foreground/10'>
              <Icon aria-hidden className='size-4' />
            </div>
            <span className='font-mono text-[10px] text-muted-foreground tabular-nums'>
              {index}
            </span>
          </div>
          <CardTitle className='mt-1'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className='mt-auto border-foreground/10 text-muted-foreground text-xs transition-colors group-hover:text-foreground'>
          {cta} →
        </CardFooter>
      </Card>
    </Link>
  );
}
