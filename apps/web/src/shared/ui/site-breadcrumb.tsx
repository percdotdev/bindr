'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@workspace/ui/components/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const SEGMENT_LABELS: Record<string, string> = {
  crosshair: 'Crosshair',
  binds: 'Binds',
  config: 'Game config',
  autoexec: 'Autoexec',
  recommended: 'Recommended',
  guides: 'Guides',
};

const DASH_RE = /-/g;

function humanize(segment: string) {
  const spaced = segment.replace(DASH_RE, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function toLabel(segment: string) {
  return SEGMENT_LABELS[segment] ?? humanize(segment);
}

export function SiteBreadcrumb() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join('/')}`,
    isLast: index === segments.length - 1,
    label: toLabel(segment),
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
