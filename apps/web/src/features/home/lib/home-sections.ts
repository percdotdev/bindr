import {
  Crosshair,
  FileCode2,
  Keyboard,
  type LucideIcon,
  SlidersHorizontal,
} from 'lucide-react';

export interface HomeToolDef {
  href: '/crosshair' | '/binds' | '/config' | '/autoexec';
  icon: LucideIcon;
  index: string;
  key: 'crosshair' | 'binds' | 'config' | 'autoexec';
}

export const HOME_TOOLS: HomeToolDef[] = [
  {
    href: '/crosshair',
    icon: Crosshair,
    index: '01',
    key: 'crosshair',
  },
  {
    href: '/binds',
    icon: Keyboard,
    index: '02',
    key: 'binds',
  },
  {
    href: '/config',
    icon: SlidersHorizontal,
    index: '03',
    key: 'config',
  },
  {
    href: '/autoexec',
    icon: FileCode2,
    index: '04',
    key: 'autoexec',
  },
];

export interface HomeStepDef {
  key: 'import' | 'customize' | 'preview' | 'export';
  step: string;
}

export const HOME_STEPS: HomeStepDef[] = [
  { key: 'import', step: '01' },
  { key: 'customize', step: '02' },
  { key: 'preview', step: '03' },
  { key: 'export', step: '04' },
];

export interface HomeCatalogLinkDef {
  href: '/binds/recommended' | '/config/recommended';
  key: 'binds' | 'config';
}

export const HOME_CATALOG_LINKS: HomeCatalogLinkDef[] = [
  { href: '/binds/recommended', key: 'binds' },
  { href: '/config/recommended', key: 'config' },
];

export interface HomeValuePropDef {
  key: 'browser' | 'mmSafe' | 'local';
}

export const HOME_VALUE_PROPS: HomeValuePropDef[] = [
  { key: 'browser' },
  { key: 'mmSafe' },
  { key: 'local' },
];
