'use client';

import { sanitizeBindCommand } from '@workspace/cs2/binds/model/bind-command';
import type { BindEntry } from '@workspace/cs2/binds/model/types';
import {
  createRecommendedBinds,
  templateToBindEntry,
} from '@workspace/cs2/binds/recommended/helpers';
import { getRecommendedTemplateById } from '@workspace/cs2/binds/recommended/templates';
import { parseStoredBinds } from '@workspace/cs2/share/studio-share';
import { create } from 'zustand';

import { readStudioDraft, writeStudioDraft } from '@/shared/lib/studio-draft';

function createBindId() {
  return crypto.randomUUID();
}

function upsertBindEntry(binds: BindEntry[], key: string, command: string) {
  const trimmed = sanitizeBindCommand(command);
  const existing = binds.find((bind) => bind.key === key);

  if (!trimmed) {
    return binds.filter((bind) => bind.key !== key);
  }

  if (existing) {
    return binds.map((bind) =>
      bind.key === key ? { ...bind, command: trimmed } : bind
    );
  }

  return [
    ...binds,
    {
      command: trimmed,
      id: createBindId(),
      key,
    },
  ];
}

interface BindStore {
  addRecommendedBind: (templateId: string) => boolean;
  binds: BindEntry[];
  clearBinds: () => void;
  hydrate: () => void;
  hydrated: boolean;
  loadRecommendedBinds: () => void;
  removeBind: (key: string) => void;
  replaceBinds: (binds: BindEntry[]) => void;
  selectedKey: string | null;
  selectKey: (key: string) => void;
  upsertBind: (key: string, command: string) => void;
}

export const useBindStore = create<BindStore>((set, get) => ({
  addRecommendedBind: (templateId) => {
    const template = getRecommendedTemplateById(templateId);
    if (!template) {
      return false;
    }

    const entry = templateToBindEntry(template);
    const current = get().binds;
    const existingIndex = current.findIndex((bind) => bind.key === entry.key);
    const nextBinds =
      existingIndex === -1
        ? [...current, entry]
        : current.map((bind, index) =>
            index === existingIndex ? { ...entry, id: bind.id } : bind
          );

    set({ binds: nextBinds });
    return true;
  },
  binds: [],

  clearBinds: () => {
    set({ binds: [], selectedKey: null });
  },

  hydrate: () => {
    if (get().hydrated) {
      return;
    }

    const stored = readStudioDraft('binds', parseStoredBinds);
    set({
      binds: stored ?? get().binds,
      hydrated: true,
    });
  },
  hydrated: false,

  loadRecommendedBinds: () => {
    const nextBinds = createRecommendedBinds();
    set({ binds: nextBinds, selectedKey: null });
  },

  removeBind: (key) => {
    const nextBinds = get().binds.filter((bind) => bind.key !== key);
    set((state) => ({
      binds: nextBinds,
      selectedKey: state.selectedKey === key ? null : state.selectedKey,
    }));
  },

  replaceBinds: (binds) => {
    set({ binds, hydrated: true, selectedKey: null });
  },
  selectedKey: null,

  selectKey: (key) => {
    set((state) => ({
      selectedKey: state.selectedKey === key ? null : key,
    }));
  },

  upsertBind: (key, command) => {
    const nextBinds = upsertBindEntry(get().binds, key, command);
    set({ binds: nextBinds });
  },
}));

useBindStore.subscribe((state, previous) => {
  if (!(state.hydrated && state.binds !== previous.binds)) {
    return;
  }
  writeStudioDraft('binds', state.binds);
});
