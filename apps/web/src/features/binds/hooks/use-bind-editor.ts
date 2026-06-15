'use client';

import { useMemo } from 'react';

import { useBindStore } from '@/features/binds/lib/storage/bind-store';
import { useMountEffect } from '@/shared/hooks/use-mount-effect';

export function useBindEditor() {
  const hydrate = useBindStore((state) => state.hydrate);
  const binds = useBindStore((state) => state.binds);
  const selectedKey = useBindStore((state) => state.selectedKey);
  const selectKey = useBindStore((state) => state.selectKey);
  const upsertBind = useBindStore((state) => state.upsertBind);
  const removeBind = useBindStore((state) => state.removeBind);
  const clearBinds = useBindStore((state) => state.clearBinds);
  const addRecommendedBind = useBindStore((state) => state.addRecommendedBind);
  const loadRecommendedBinds = useBindStore(
    (state) => state.loadRecommendedBinds
  );

  useMountEffect(hydrate);

  const activeKeys = useMemo(
    () => new Set(binds.map((bind) => bind.key)),
    [binds]
  );

  const selectedBind = useMemo(
    () => binds.find((bind) => bind.key === selectedKey) ?? null,
    [binds, selectedKey]
  );

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
