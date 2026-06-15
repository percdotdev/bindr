export type BindCategory = 'lineups' | 'radar' | 'utility' | 'weapons';

export interface BindEntry {
  category?: BindCategory;
  command: string;
  description?: string;
  id: string;
  key: string;
  label?: string;
  mmSafe?: boolean;
}

export interface BindEditorState {
  binds: BindEntry[];
  selectedKey: string | null;
}

export interface RecommendedBindTemplate {
  category: BindCategory;
  command: string;
  description: string;
  id: string;
  key: string;
  label: string;
  mmSafe: boolean;
}
