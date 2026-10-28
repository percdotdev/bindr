'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  AUTH_FAILED_PARAM,
  AUTH_FAILED_VALUE,
  withoutAuthResult,
} from '@/features/auth/lib/auth-callback-urls';
import { useMountEffect } from '@/shared/hooks/use-mount-effect';

/** Toasts once when Steam redirected back with a failure, then cleans the URL. */
export function useAuthFailureToast() {
  const t = useTranslations('auth');

  useMountEffect(() => {
    const { href, search } = window.location;
    const failed =
      new URLSearchParams(search).get(AUTH_FAILED_PARAM) === AUTH_FAILED_VALUE;
    if (!failed) {
      return;
    }

    toast.error(t('signInFailed'));
    window.history.replaceState(null, '', withoutAuthResult(href));
  });
}
