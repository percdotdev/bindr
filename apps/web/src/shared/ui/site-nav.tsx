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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavLink {
  description: string;
  href: string;
  label: string;
}

const EDITOR_LINKS: NavLink[] = [
  {
    description: 'Decode share codes, preview, export code and commands.',
    href: '/crosshair',
    label: 'Crosshair editor',
  },
  {
    description: 'Assign commands on a visual keyboard, export cfg.',
    href: '/binds',
    label: 'Bind generator',
  },
  {
    description: 'Viewmodel, mouse, radar, network, audio, HUD cvars.',
    href: '/config',
    label: 'Game config',
  },
  {
    description: 'Merge crosshair, config and binds into one cfg.',
    href: '/autoexec',
    label: 'Autoexec composer',
  },
];

const CATALOG_LINKS: NavLink[] = [
  {
    description: 'MM-safe 2026 meta bind templates.',
    href: '/binds/recommended',
    label: 'Recommended binds',
  },
  {
    description: 'Curated cvar bundles per section.',
    href: '/config/recommended',
    label: 'Recommended config',
  },
];

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

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [menuValue, setMenuValue] = useState<string | null>(null);
  const closeMenu = () => setMenuValue(null);

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
      <NavigationMenu
        align='end'
        className='font-mono'
        onValueChange={setMenuValue}
        value={menuValue}
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>editors</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[280px] gap-0.5'>
                {EDITOR_LINKS.map((item) => (
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
            <NavigationMenuTrigger>catalogs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[280px] gap-0.5'>
                {CATALOG_LINKS.map((item) => (
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
              guides
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
