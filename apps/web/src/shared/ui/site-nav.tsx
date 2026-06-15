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

interface NavLink {
  description: string;
  href: string;
  label: string;
}

const EDITOR_LINKS: NavLink[] = [
  {
    href: '/crosshair',
    label: 'Crosshair editor',
    description: 'Decode share codes, preview, export console commands.',
  },
  {
    href: '/binds',
    label: 'Bind generator',
    description: 'Assign commands on a visual keyboard, export cfg.',
  },
  {
    href: '/config',
    label: 'Game config',
    description: 'Viewmodel, mouse, radar, network, audio, HUD cvars.',
  },
  {
    href: '/autoexec',
    label: 'Autoexec composer',
    description: 'Merge crosshair, config and binds into one cfg.',
  },
];

const CATALOG_LINKS: NavLink[] = [
  {
    href: '/binds/recommended',
    label: 'Recommended binds',
    description: 'MM-safe 2026 meta bind templates.',
  },
  {
    href: '/config/recommended',
    label: 'Recommended config',
    description: 'Curated cvar bundles per section.',
  },
];

function NavMenuLink({
  active,
  description,
  href,
  label,
}: NavLink & { active: boolean }) {
  return (
    <li>
      <NavigationMenuLink
        active={active}
        className='flex-col items-start gap-0.5'
        render={<Link href={href} />}
      >
        <span className='font-medium text-foreground'>{label}</span>
        <span className='text-[11px] text-muted-foreground leading-snug'>
          {description}
        </span>
      </NavigationMenuLink>
    </li>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === '/';

  return (
    <header
      className={cn(
        'mx-auto flex w-full max-w-4xl items-center gap-4 px-6 pt-6 pb-1',
        onHome ? 'justify-end' : 'justify-between'
      )}
    >
      {onHome ? null : (
        <Link
          className='font-mono text-foreground text-xs transition-colors hover:text-muted-foreground'
          href='/'
        >
          bindr.lol
        </Link>
      )}
      <NavigationMenu align='end' className='font-mono'>
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
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              active={pathname.startsWith('/guides')}
              className={navigationMenuTriggerStyle()}
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
