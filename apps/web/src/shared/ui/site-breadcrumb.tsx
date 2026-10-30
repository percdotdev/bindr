'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@workspace/ui/components/breadcrumb';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import { Link, usePathname } from '@/i18n/navigation';

const SEGMENT_KEYS = new Set([
  'account',
  'autoexec',
  'binds',
  'config',
  'crosshair',
  'guides',
  'recommended',
  'share',
]);

const DASH_RE = /-/gu;

function humanize(segment: string) {
  const spaced = segment.replace(DASH_RE, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function SiteBreadcrumb() {
  const pathname = usePathname();
  const t = useTranslations('breadcrumb');

  if (pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join('/')}`,
    isLast: index === segments.length - 1,
    label: SEGMENT_KEYS.has(segment)
      ? t(
          segment as
            | 'account'
            | 'autoexec'
            | 'binds'
            | 'config'
            | 'crosshair'
            | 'guides'
            | 'recommended'
            | 'share'
        )
      : humanize(segment),
  }));

  return (
    <Breadcrumb className='mx-auto w-full max-w-4xl px-6 pt-3 font-mono'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href='/' />}>bindr.lol</BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs.map((crumb) => (
          <Fragment key={crumb.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={crumb.href} />}>
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
