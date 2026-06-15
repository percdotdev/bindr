import { HOME_TOOLS } from '@/features/home/lib/home-sections';
import { HomeFeatureCard } from '@/features/home/ui/home-feature-card';

export function HomeTools() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-baseline justify-between'>
        <h2 className='font-medium text-sm'>Tools</h2>
        <p className='text-muted-foreground text-xs'>Everything client-side</p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {HOME_TOOLS.map((tool) => (
          <HomeFeatureCard
            cta={tool.cta}
            description={tool.description}
            href={tool.href}
            icon={tool.icon}
            index={tool.index}
            key={tool.href}
            title={tool.title}
          />
        ))}
      </div>
    </section>
  );
}
