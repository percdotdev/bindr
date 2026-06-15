import { cn } from '@workspace/ui/lib/utils';
import Image from 'next/image';

interface GuideImageProps {
  alt?: string;
  className?: string;
  src?: string;
}

export function GuideImage({ alt = '', className, src }: GuideImageProps) {
  if (!src) {
    return null;
  }

  return (
    <span className='my-6 block overflow-hidden border border-foreground/10 bg-muted/30'>
      <Image
        alt={alt}
        className={cn('h-auto w-full', className)}
        height={0}
        sizes='(max-width: 768px) 100vw, 768px'
        src={src}
        width={0}
      />
    </span>
  );
}
