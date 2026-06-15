'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  createRecommendedBinds,
  getRecommendedTemplateById,
  templateToBindEntry,
} from '@/features/binds/lib/model/recommended-binds';
import type { BindEntry } from '@/features/binds/lib/model/types';
import {
  clearStoredBinds,
  loadStoredBinds,
  saveStoredBinds,
} from '@/features/binds/lib/storage/bind-storage';

function createBindId() {
  return crypto.randomUUID();
}

export function useBindEditor() {
  const [binds, setBinds] = useState<BindEntry[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (hasInitialized) {
      return;
    }

    setBinds(loadStoredBinds() ?? []);
    setHasInitialized(true);
  }, [hasInitialized]);

  useEffect(() => {
    if (!hasInitialized) {
      return;
    }

    saveStoredBinds(binds);
  }, [binds, hasInitialized]);

  const selectKey = useCallback((key: string) => {
    setSelectedKey((current) => (current === key ? null : key));
  }, []);

  const upsertBind = useCallback((key: string, command: string) => {
    const trimmed = command.trim();

    setBinds((current) => {
      const existing = current.find((bind) => bind.key === key);

      if (!trimmed) {
        return current.filter((bind) => bind.key !== key);
      }

      if (existing) {
        return current.map((bind) =>
          bind.key === key ? { ...bind, command: trimmed } : bind
        );
      }

      return [
        ...current,
        {
          id: createBindId(),
          key,
          command: trimmed,
        },
      ];
    });
  }, []);

  const removeBind = useCallback((key: string) => {
    setBinds((current) => current.filter((bind) => bind.key !== key));

    setSelectedKey((current) => (current === key ? null : current));
  }, []);

  const clearBinds = useCallback(() => {
    setBinds([]);
    setSelectedKey(null);
    clearStoredBinds();
  }, []);

  const addRecommendedBind = useCallback((templateId: string) => {
    const template = getRecommendedTemplateById(templateId);
    if (!template) {
      return false;
    }

    const entry = templateToBindEntry(template);

    setBinds((current) => {
      const existingIndex = current.findIndex((bind) => bind.key === entry.key);

      if (existingIndex === -1) {
        return [...current, entry];
      }

      return current.map((bind, index) =>
        index === existingIndex ? { ...entry, id: bind.id } : bind
      );
    });

    return true;
  }, []);

  const loadRecommendedBinds = useCallback(() => {
    setBinds(createRecommendedBinds());
    setSelectedKey(null);
  }, []);

  const activeKeys = new Set(binds.map((bind) => bind.key));

  const selectedBind = binds.find((bind) => bind.key === selectedKey) ?? null;

  return {
    activeKeys,
    addRecommendedBind,
    binds,
    clearBinds,
    loadRecommendedBinds,
    removeBind,
    selectKey,
    selectedBind,
    selectedKey,
    upsertBind,
  };
}
