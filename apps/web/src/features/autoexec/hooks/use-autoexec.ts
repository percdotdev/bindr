'use client';

import { useState } from 'react';

import {
  type AutoexecInclude,
  type AutoexecSectionId,
  composeAutoexec,
} from '@/features/autoexec/lib/compose/compose-autoexec';
import { useBindStore } from '@/features/binds/lib/storage/bind-store';
import { useConfigStore } from '@/features/config/lib/storage/config-store';
import { useCrosshairStore } from '@/features/crosshair/lib/storage/crosshair-store';
import { useMountEffect } from '@/shared/hooks/use-mount-effect';

const DEFAULT_INCLUDE: AutoexecInclude = {
  crosshair: true,
  config: true,
  binds: true,
};

export function useAutoexec() {
  const hydrateCrosshair = useCrosshairStore((state) => state.hydrate);
  const hydrateConfig = useConfigStore((state) => state.hydrate);
  const hydrateBinds = useBindStore((state) => state.hydrate);

  const crosshair = useCrosshairStore((state) => state.crosshair);
  const config = useConfigStore((state) => state.config);
  const binds = useBindStore((state) => state.binds);

  const [include, setInclude] = useState<AutoexecInclude>(DEFAULT_INCLUDE);

  useMountEffect(() => {
    hydrateCrosshair(null);
    hydrateConfig();
    hydrateBinds();
  });

  const toggleSection = (id: AutoexecSectionId) => {
    setInclude((current) => ({ ...current, [id]: !current[id] }));
  };

  const cfg = composeAutoexec({ binds, config, crosshair }, include);

  return {
    bindCount: binds.length,
    cfg,
    include,
    toggleSection,
  };
}
