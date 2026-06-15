import { HOME_STEPS } from '@/features/home/lib/home-sections';

export function HomeSteps() {
  return (
    <section className='flex flex-col gap-5'>
      <h2 className='font-medium text-sm'>How it works</h2>
      <div className='grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4'>
        {HOME_STEPS.map((item) => (
          <div
            className='flex flex-col gap-2 bg-background p-4'
            key={item.step}
          >
            <span className='font-mono text-[10px] text-muted-foreground tabular-nums'>
              {item.step}
            </span>
            <p className='font-medium text-sm'>{item.title}</p>
            <p className='text-muted-foreground text-xs leading-relaxed'>
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
