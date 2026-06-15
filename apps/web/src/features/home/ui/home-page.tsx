import { HomeCatalogs } from '@/features/home/ui/home-catalogs';
import { HomeHero } from '@/features/home/ui/home-hero';
import { HomeSteps } from '@/features/home/ui/home-steps';
import { HomeTools } from '@/features/home/ui/home-tools';
import { HomeValueProps } from '@/features/home/ui/home-value-props';

export function HomePage() {
  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-12 md:py-20'>
      <HomeHero />
      <HomeTools />
      <HomeSteps />
      <HomeCatalogs />
      <HomeValueProps />
    </main>
  );
}
