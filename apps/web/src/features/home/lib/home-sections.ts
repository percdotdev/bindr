import {
  Crosshair,
  FileCode2,
  Keyboard,
  type LucideIcon,
  SlidersHorizontal,
} from 'lucide-react';

export interface HomeTool {
  cta: string;
  description: string;
  href: string;
  icon: LucideIcon;
  index: string;
  title: string;
}

export const HOME_TOOLS: HomeTool[] = [
  {
    index: '01',
    href: '/crosshair',
    icon: Crosshair,
    title: 'Crosshair editor',
    description:
      'Decode CSGO share codes, tweak gap, color and style, preview on real maps, export console commands.',
    cta: 'Open editor',
  },
  {
    index: '02',
    href: '/binds',
    icon: Keyboard,
    title: 'Bind generator',
    description:
      'Assign commands on a visual keyboard and export grouped bind lines or a ready-to-paste cfg.',
    cta: 'Build binds',
  },
  {
    index: '03',
    href: '/config',
    icon: SlidersHorizontal,
    title: 'Game config',
    description:
      'Dial in viewmodel, mouse, radar, network, audio, performance and HUD cvars with sliders.',
    cta: 'Tune cvars',
  },
  {
    index: '04',
    href: '/autoexec',
    icon: FileCode2,
    title: 'Autoexec composer',
    description:
      'Merge crosshair, config and binds into one autoexec.cfg with per-section toggles.',
    cta: 'Compose cfg',
  },
];

export interface HomeStep {
  detail: string;
  step: string;
  title: string;
}

export const HOME_STEPS: HomeStep[] = [
  {
    step: '01',
    title: 'Import',
    detail: 'Paste a share code or start from MM-safe 2026 presets.',
  },
  {
    step: '02',
    title: 'Customize',
    detail: 'Sliders, toggles and a visual keyboard — no syntax to memorize.',
  },
  {
    step: '03',
    title: 'Preview',
    detail: 'Crosshairs render on real maps; cfg output updates live.',
  },
  {
    step: '04',
    title: 'Export',
    detail: 'Copy console commands or download a single autoexec.cfg.',
  },
];

export interface HomeCatalogLink {
  href: string;
  label: string;
}

export const HOME_CATALOG_LINKS: HomeCatalogLink[] = [
  { href: '/binds/recommended', label: 'Recommended binds' },
  { href: '/config/recommended', label: 'Recommended config' },
];

export interface HomeValueProp {
  detail: string;
  label: string;
}

export const HOME_VALUE_PROPS: HomeValueProp[] = [
  {
    label: 'Browser-only',
    detail: 'Parse, preview and export without installing anything.',
  },
  {
    label: 'MM-safe defaults',
    detail: 'Binds and cvars follow current Valve rules — no banned scripts.',
  },
  {
    label: 'Local-first',
    detail: 'Edits persist in your browser until cloud save ships.',
  },
];
