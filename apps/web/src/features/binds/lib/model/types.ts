export interface BindEntry {
  command: string;
  id: string;
  key: string;
}

export interface BindEditorState {
  binds: BindEntry[];
  selectedKey: string | null;
}
