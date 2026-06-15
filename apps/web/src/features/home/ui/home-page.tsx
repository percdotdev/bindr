import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';

export function HomePage() {
  return (
    <div className='flex min-h-svh p-6'>
      <div className='flex min-w-0 max-w-md flex-col gap-4 text-sm leading-loose'>
        <div>
          <h1 className='font-medium'>Bindr</h1>
          <p>Import, customize, and share CS2 crosshairs in the browser.</p>
          <Link
            className={cn(buttonVariants(), 'mt-2 inline-flex w-fit')}
            href='/crosshair'
          >
            Open crosshair editor
          </Link>
        </div>
        <div className='font-mono text-muted-foreground text-xs'>
          (Press <kbd>t</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
