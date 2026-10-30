'use client';

import { composeAutoexec } from '@workspace/cs2/autoexec/compose/compose-autoexec';
import { pickStudioShare } from '@workspace/cs2/share/studio-share';
import { encodeStudioShare } from '@workspace/cs2/share/studio-share-codec';
import {
  CONFIG_SHARE_SECTIONS,
  emptySelection,
  type StudioSlice,
} from '@workspace/cs2/share/studio-slices';
import { useState } from 'react';
import { useBindStore } from '@/features/binds/lib/storage/bind-store';
import { useConfigStore } from '@/features/config/lib/storage/config-store';
import { useCrosshairStore } from '@/features/crosshair/lib/storage/crosshair-store';
import { useMountEffect } from '@/shared/hooks/use-mount-effect';

const DEFAULT_INCLUDE = {
  banner: true,
  slices: emptySelection(true),
};

export type ShareLinkResult =
  | { status: 'empty' }
  | { status: 'ok'; url: string }
  | { status: 'too-long' };

export function useAutoexec() {
  const hydrateCrosshair = useCrosshairStore((state) => state.hydrate);
  const hydrateConfig = useConfigStore((state) => state.hydrate);
  const hydrateBinds = useBindStore((state) => state.hydrate);

  const crosshair = useCrosshairStore((state) => state.crosshair);
  const config = useConfigStore((state) => state.config);
  const binds = useBindStore((state) => state.binds);

  const [include, setInclude] = useState(DEFAULT_INCLUDE);

  useMountEffect(() => {
    hydrateCrosshair(null);
    hydrateConfig();
    hydrateBinds();
  });

  const toggleSlice = (id: StudioSlice) => {
    setInclude((current) => ({
      ...current,
      slices: { ...current.slices, [id]: !current.slices[id] },
    }));
  };

  const toggleBanner = () => {
    setInclude((current) => ({ ...current, banner: !current.banner }));
  };

  const toggleConfigGroup = (enabled: boolean) => {
    setInclude((current) => {
      const slices = { ...current.slices };
      for (const section of CONFIG_SHARE_SECTIONS) {
        slices[section] = enabled;
      }
      return { ...current, slices };
    });
  };

  const cfg = composeAutoexec({ binds, config, crosshair }, include);
  const configGroupOn = CONFIG_SHARE_SECTIONS.every(
    (section) => include.slices[section]
  );

  async function createShareLink(): Promise<ShareLinkResult> {
    const selected = Object.values(include.slices).some(Boolean);
    if (!selected) {
      return { status: 'empty' };
    }

    const wire = pickStudioShare({ binds, config, crosshair }, include.slices);
    if (!wire) {
      return { status: 'too-long' };
    }

    const token = await encodeStudioShare(wire);
    if (!token) {
      return { status: 'too-long' };
    }

    const url = new URL('/share', window.location.origin);
    url.searchParams.set('d', token);
    return { status: 'ok', url: url.toString() };
  }

  return {
    bindCount: binds.length,
    cfg,
    configGroupOn,
    createShareLink,
    include,
    toggleBanner,
    toggleConfigGroup,
    toggleSlice,
  };
}
