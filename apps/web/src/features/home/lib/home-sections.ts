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
    cta: 'Open editor',
    description:
      'Decode CS2 share codes (old CSGO- codes convert), tweak gap, color and style, preview on real maps, export console commands.',
    href: '/crosshair',
    icon: Crosshair,
    index: '01',
    title: 'Crosshair editor',
  },
  {
    cta: 'Build binds',
    description:
      'Assign commands on a visual keyboard and export grouped bind lines or a ready-to-paste cfg.',
    href: '/binds',
    icon: Keyboard,
    index: '02',
    title: 'Bind generator',
  },
  {
    cta: 'Tune cvars',
    description:
      'Dial in viewmodel, mouse, radar, network, audio, performance and HUD cvars with sliders.',
    href: '/config',
    icon: SlidersHorizontal,
    index: '03',
    title: 'Game config',
  },
  {
    cta: 'Compose cfg',
    description:
      'Merge crosshair, config and binds into one autoexec.cfg with per-section toggles.',
    href: '/autoexec',
    icon: FileCode2,
    index: '04',
    title: 'Autoexec composer',
  },
];

export interface HomeStep {
  detail: string;
  step: string;
  title: string;
}

export const HOME_STEPS: HomeStep[] = [
  {
    detail: 'Paste a share code or start from MM-safe 2026 presets.',
    step: '01',
    title: 'Import',
  },
  {
    detail: 'Sliders, toggles and a visual keyboard — no syntax to memorize.',
    step: '02',
    title: 'Customize',
  },
  {
    detail: 'Crosshairs render on real maps; cfg output updates live.',
    step: '03',
    title: 'Preview',
  },
  {
    detail: 'Copy console commands or download a single autoexec.cfg.',
    step: '04',
    title: 'Export',
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
    detail: 'Parse, preview and export without installing anything.',
    label: 'Browser-only',
  },
  {
    detail: 'Binds and cvars follow current Valve rules — no banned scripts.',
    label: 'MM-safe defaults',
  },
  {
    detail: 'Edits persist in your browser until cloud save ships.',
    label: 'Local-first',
  },
];
