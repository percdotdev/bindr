'use client';

import { authClient } from '@workspace/auth/client/auth-client';

import { useAuthFailureToast } from '@/features/auth/hooks/use-auth-failure-toast';
import { AccountMenu } from '@/features/auth/ui/account-menu';
import { SignInButton } from '@/features/auth/ui/sign-in-button';

/**
 * Nav entry for auth. The session is fetched in the browser, so pages that
 * render the nav stay statically prerendered.
 */
export function AccountButton() {
  const { data, isPending } = authClient.useSession();
  useAuthFailureToast();

  if (isPending) {
    return <span aria-hidden className='size-7' />;
  }
  if (!data) {
    return <SignInButton />;
  }

  return <AccountMenu image={data.user.image} name={data.user.name} />;
}
