'use client';

import { useCallback, useEffect, useState } from 'react';
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

    const stored = loadStoredBinds();
    if (stored) {
      setBinds(stored);
    }

    setHasInitialized(true);
  }, [hasInitialized]);

  useEffect(() => {
    if (!hasInitialized) {
      return;
    }

    saveStoredBinds(binds);
  }, [binds, hasInitialized]);

  const selectKey = useCallback((key: string) => {
    setSelectedKey(key);
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

  const selectedBind = binds.find((bind) => bind.key === selectedKey) ?? null;

  return {
    binds,
    clearBinds,
    removeBind,
    selectKey,
    selectedBind,
    selectedKey,
    upsertBind,
  };
}
