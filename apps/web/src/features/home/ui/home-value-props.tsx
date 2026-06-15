import { HOME_VALUE_PROPS } from '@/features/home/lib/home-sections';

export function HomeValueProps() {
  return (
    <section className='grid gap-6 border-foreground/10 border-t pt-10 sm:grid-cols-3'>
      {HOME_VALUE_PROPS.map((item) => (
        <div className='flex flex-col gap-1' key={item.label}>
          <p className='font-medium text-xs'>{item.label}</p>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            {item.detail}
          </p>
        </div>
      ))}
    </section>
  );
}
