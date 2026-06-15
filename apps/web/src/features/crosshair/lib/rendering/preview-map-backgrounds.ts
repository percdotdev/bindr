export const PREVIEW_MAP_WIDTH = 909;
export const PREVIEW_MAP_HEIGHT = 160;

export interface PreviewMapBackground {
  id: string;
  label: string;
  src: `/${string}`;
}

export const PREVIEW_MAP_BACKGROUNDS: PreviewMapBackground[] = [
  { id: 'inferno', label: 'Inferno', src: '/inferno.webp' },
  { id: 'vertigo', label: 'Vertigo', src: '/vertigo.webp' },
  { id: 'anubis', label: 'Anubis', src: '/anubis.webp' },
  { id: 'ancient', label: 'Ancient', src: '/ancient.webp' },
  { id: 'dust2', label: 'Dust II', src: '/dust2.webp' },
  { id: 'mirage', label: 'Mirage', src: '/mirage.webp' },
  { id: 'nuke', label: 'Nuke', src: '/nuke.webp' },
  { id: 'overpass', label: 'Overpass', src: '/overpass.webp' },
];
