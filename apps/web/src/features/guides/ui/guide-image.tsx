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
    <span className='border-foreground/10 bg-muted/30 my-6 block overflow-hidden border'>
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
