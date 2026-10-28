import { Button } from '@workspace/ui/components/button';
import { ExternalLinkIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getServerSession } from '@/features/auth/lib/get-server-session';
import { UserAvatar } from '@/features/auth/ui/user-avatar';
import { redirect } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';

interface Props {
  locale: AppLocale;
}

export async function AccountOverview({ locale }: Props) {
  const session = await getServerSession();
  if (!session) {
    return redirect({ href: '/', locale });
  }

  const t = await getTranslations({ locale, namespace: 'auth.account' });
  const { image, name, steamId } = session.user;

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 font-mono'>
      <h1 className='text-lg font-medium'>{t('heading')}</h1>
      <section className='flex items-center gap-4'>
        <UserAvatar image={image} name={name} size='lg' />
        <dl className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs'>
          <dt className='text-muted-foreground'>{t('name')}</dt>
          <dd className='text-foreground'>{name}</dd>
          <dt className='text-muted-foreground'>{t('steamId')}</dt>
          <dd className='text-foreground tabular-nums'>{steamId}</dd>
        </dl>
      </section>
      {steamId ? (
        <Button
          className='self-start'
          nativeButton={false}
          render={
            <a
              href={`https://steamcommunity.com/profiles/${steamId}`}
              rel='noopener noreferrer'
              target='_blank'
            />
          }
          size='sm'
          variant='outline'
        >
          {t('steamProfile')}
          <ExternalLinkIcon data-icon='inline-end' />
        </Button>
      ) : null}
    </main>
  );
}
