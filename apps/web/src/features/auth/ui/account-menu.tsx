'use client';

import { authClient } from '@workspace/auth/client/auth-client';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { UserAvatar } from '@/features/auth/ui/user-avatar';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

interface Props {
  image: string | null | undefined;
  name: string;
}

export function AccountMenu({ image, name }: Props) {
  const t = useTranslations('auth');
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(t('signOutFailed'));
      return;
    }
    if (pathname === '/account') {
      router.replace('/');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button aria-label={t('menuAria')} size='icon-sm' variant='ghost' />
        }
      >
        <UserAvatar image={image} name={name} size='sm' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48 font-mono'>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='truncate'>{name}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href='/account' />}>
            <UserIcon />
            {t('accountLink')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOut}>
            <LogOutIcon />
            {t('signOut')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
