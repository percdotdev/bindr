'use client';

import { authClient } from '@workspace/auth/client/auth-client';
import { Button } from '@workspace/ui/components/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { authCallbackURLs } from '@/features/auth/lib/auth-callback-urls';

export function SignInButton() {
  const t = useTranslations('auth');
  const [redirecting, setRedirecting] = useState(false);

  const signIn = async () => {
    setRedirecting(true);
    // On success the client follows the returned Steam URL.
    const { error } = await authClient.signIn.steam(
      authCallbackURLs(window.location.href)
    );
    if (error) {
      setRedirecting(false);
      toast.error(t('signInFailed'));
    }
  };

  return (
    <Button
      className='font-mono'
      disabled={redirecting}
      onClick={signIn}
      size='sm'
      variant='outline'
    >
      {redirecting ? t('redirecting') : t('signIn')}
    </Button>
  );
}
