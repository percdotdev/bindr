export const PREVIEW_MAP_WIDTH = 909;
export const PREVIEW_MAP_HEIGHT = 160;

export interface PreviewMapBackground {
  id: string;
  label: string;
  src: `/${string}`;
}

export const PREVIEW_MAP_BACKGROUNDS: PreviewMapBackground[] = [
  { id: 'inferno', label: 'Inferno', src: '/inferno.jpg' },
  { id: 'vertigo', label: 'Vertigo', src: '/vertigo.jpg' },
  { id: 'anubis', label: 'Anubis', src: '/anubis.jpg' },
  { id: 'ancient', label: 'Ancient', src: '/ancient.jpg' },
  { id: 'dust2', label: 'Dust II', src: '/dust2.jpg' },
  { id: 'mirage', label: 'Mirage', src: '/mirage.jpg' },
  { id: 'nuke', label: 'Nuke', src: '/nuke.jpg' },
  { id: 'overpass', label: 'Overpass', src: '/overpass.jpg' },
];
