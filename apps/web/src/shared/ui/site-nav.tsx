'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@workspace/ui/components/navigation-menu';
import { cn } from '@workspace/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { LocaleSwitcher } from '@/shared/ui/locale-switcher';

interface NavLink {
  description: string;
  href:
    | '/crosshair'
    | '/binds'
    | '/config'
    | '/autoexec'
    | '/binds/recommended'
    | '/config/recommended';
  label: string;
}

export function SiteNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const onHome = pathname === '/';
  const [menuValue, setMenuValue] = useState<string | null>(null);
  const closeMenu = () => setMenuValue(null);

  const editorLinks: NavLink[] = [
    {
      description: t('crosshair.description'),
      href: '/crosshair',
      label: t('crosshair.label'),
    },
    {
      description: t('binds.description'),
      href: '/binds',
      label: t('binds.label'),
    },
    {
      description: t('config.description'),
      href: '/config',
      label: t('config.label'),
    },
    {
      description: t('autoexec.description'),
      href: '/autoexec',
      label: t('autoexec.label'),
    },
  ];

  return (
    <header
      className={cn(
        'mx-auto flex w-full max-w-4xl items-center gap-4 px-6 pt-6 pb-1',
        onHome ? 'justify-end' : 'justify-between'
      )}
    >
      {onHome ? null : (
        <Link
          className='text-foreground hover:text-muted-foreground font-mono text-xs transition-colors'
          href='/'
        >
          bindr.lol
        </Link>
      )}
      <div className='flex items-center gap-3'>
        <NavigationMenu
          align='end'
          className='font-mono'
          onValueChange={setMenuValue}
          value={menuValue}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('editors')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[280px] gap-0.5'>
                  {editorLinks.map((item) => (
                    <NavMenuLink
                      active={pathname === item.href}
                      description={item.description}
                      href={item.href}
                      key={item.href}
                      label={item.label}
                      onSelect={closeMenu}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                active={pathname.startsWith('/guides')}
                className={navigationMenuTriggerStyle()}
                onClick={closeMenu}
                render={<Link href='/guides' />}
              >
                {t('guides')}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <LocaleSwitcher />
      </div>
    </header>
  );
}

function NavMenuLink({
  active,
  description,
  href,
  label,
  onSelect,
}: NavLink & { active: boolean; onSelect: () => void }) {
  return (
    <li>
      <NavigationMenuLink
        active={active}
        className='flex-col items-start gap-0.5'
        onClick={onSelect}
        render={<Link href={href} />}
      >
        <span className='text-foreground font-medium'>{label}</span>
        <span className='text-muted-foreground text-[11px] leading-snug'>
          {description}
        </span>
      </NavigationMenuLink>
    </li>
  );
}
