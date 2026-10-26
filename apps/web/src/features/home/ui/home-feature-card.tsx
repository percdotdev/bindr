import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import type { LucideIcon } from 'lucide-react';

import { Link } from '@/i18n/navigation';

interface HomeFeatureCardProps {
  className?: string;
  cta: string;
  description: string;
  href: '/crosshair' | '/binds' | '/config' | '/autoexec';
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
        'group hover:bg-muted/30 focus-visible:ring-ring block transition-colors focus-visible:ring-1 focus-visible:outline-none',
        className
      )}
      href={href}
    >
      <Card className='ring-foreground/10 group-hover:ring-foreground/25 h-full transition-shadow'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='bg-muted ring-foreground/10 flex size-8 items-center justify-center ring-1'>
              <Icon aria-hidden className='size-4' />
            </div>
            <span className='text-muted-foreground font-mono text-[10px] tabular-nums'>
              {index}
            </span>
          </div>
          <CardTitle className='mt-1'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className='border-foreground/10 text-muted-foreground group-hover:text-foreground mt-auto text-xs transition-colors'>
          {cta} →
        </CardFooter>
      </Card>
    </Link>
  );
}
