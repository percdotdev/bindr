import { HomeHero } from '@/features/home/ui/home-hero';
import { StudioStepList } from '@/shared/ui/studio-steps';

export function HomePage() {
  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-12 md:py-20'>
      <HomeHero />
      <StudioStepList />
    </main>
  );
}
