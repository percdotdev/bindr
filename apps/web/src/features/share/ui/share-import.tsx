'use client';

import { composeAutoexec } from '@workspace/cs2/autoexec/compose/compose-autoexec';
import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import {
  applyStudioShare,
  type StudioShare,
  slicesInShare,
} from '@workspace/cs2/share/studio-share';
import {
  CONFIG_SHARE_SECTIONS,
  emptySelection,
  type StudioSlice,
} from '@workspace/cs2/share/studio-slices';
import { Button } from '@workspace/ui/components/button';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { CopyIcon, DownloadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { useBindStore } from '@/features/binds/lib/storage/bind-store';
import { useConfigStore } from '@/features/config/lib/storage/config-store';
import { useCrosshairStore } from '@/features/crosshair/lib/storage/crosshair-store';
import { Link } from '@/i18n/navigation';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';

interface ShareImportProps {
  share: StudioShare | null;
  status: 'empty' | 'invalid' | 'ready';
}

function downloadCfg(text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'autoexec.cfg';
  anchor.click();
  URL.revokeObjectURL(url);
}

function initialSelection(share: StudioShare | null) {
  const selection = emptySelection(false);
  if (!share) {
    return selection;
  }
  for (const slice of slicesInShare(share)) {
    selection[slice] = true;
  }
  return selection;
}

export function ShareImport({ share, status }: ShareImportProps) {
  const t = useTranslations('share');
  const tCommon = useTranslations('common');
  const categories = useTranslations('config.categories');
  const [selection, setSelection] = useState(() => initialSelection(share));

  if (status !== 'ready' || !share) {
    return (
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-3 p-6'>
        <h1 className='text-sm font-medium'>
          {status === 'invalid' ? t('invalidTitle') : t('emptyTitle')}
        </h1>
        <p className='text-muted-foreground text-xs'>
          {status === 'invalid' ? t('invalidBody') : t('emptyBody')}
        </p>
        <Link
          className='text-xs underline-offset-4 hover:underline'
          href='/autoexec'
        >
          {t('createLink')}
        </Link>
      </div>
    );
  }

  const loaded = share;
  const present = slicesInShare(loaded);
  const configSections = CONFIG_SHARE_SECTIONS.filter((section) =>
    present.includes(section)
  );
  const configGroupOn =
    configSections.length > 0 &&
    configSections.every((section) => selection[section]);
  const source = {
    binds: loaded.binds ?? [],
    config: { ...DEFAULT_CONFIG, ...loaded.config },
    crosshair: loaded.crosshair ?? DEFAULT_CROSSHAIR,
  };
  const cfg = composeAutoexec(source, { banner: true, slices: selection });

  function setSlice(id: StudioSlice, enabled: boolean) {
    setSelection((current) => ({ ...current, [id]: enabled }));
  }

  function setConfigGroup(enabled: boolean) {
    setSelection((current) => {
      const next = { ...current };
      for (const section of configSections) {
        next[section] = enabled;
      }
      return next;
    });
  }

  async function copyCfg() {
    try {
      await navigator.clipboard.writeText(cfg);
      toast.success(t('toastCopied'));
    } catch {
      toast.error(t('toastCopyFailed'));
    }
  }

  function importSelected() {
    const chosen = present.some((slice) => selection[slice]);
    if (!chosen) {
      toast.error(t('nothingSelected'));
      return;
    }

    const crosshairStore = useCrosshairStore.getState();
    const configStore = useConfigStore.getState();
    const bindStore = useBindStore.getState();
    crosshairStore.hydrate(null);
    configStore.hydrate();
    bindStore.hydrate();

    const next = applyStudioShare(
      {
        binds: useBindStore.getState().binds,
        config: useConfigStore.getState().config,
        crosshair: useCrosshairStore.getState().crosshair,
      },
      loaded,
      selection
    );

    if (selection.crosshair && loaded.crosshair) {
      useCrosshairStore.getState().replaceCrosshair(next.crosshair);
    }
    if (configSections.some((section) => selection[section])) {
      useConfigStore.getState().replaceConfig(next.config);
    }
    if (selection.binds && loaded.binds !== undefined) {
      useBindStore.getState().replaceBinds(next.binds);
    }

    toast.success(t('imported'));
  }

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-sm font-medium'>{t('title')}</h1>
        <p className='text-muted-foreground text-xs'>{t('subtitle')}</p>
      </div>

      <div className='flex flex-wrap gap-2'>
        <Button onClick={importSelected} type='button'>
          {t('import')}
        </Button>
        <Button onClick={copyCfg} type='button' variant='outline'>
          <CopyIcon data-icon='inline-start' />
          {t('copy')}
        </Button>
        <Button
          onClick={() => {
            downloadCfg(cfg);
          }}
          type='button'
          variant='outline'
        >
          <DownloadIcon data-icon='inline-start' />
          {t('download')}
        </Button>
      </div>

      <CollapsibleSection
        contentClassName='flex flex-col gap-4'
        description={t('includeDescription')}
        title={t('include')}
      >
        {present.includes('crosshair') ? (
          <div className='flex items-center justify-between gap-4'>
            <Label htmlFor='share-crosshair'>{t('crosshair')}</Label>
            <Switch
              checked={selection.crosshair}
              id='share-crosshair'
              onCheckedChange={(checked) =>
                setSlice('crosshair', checked === true)
              }
            />
          </div>
        ) : null}
        {present.includes('binds') ? (
          <div className='flex items-center justify-between gap-4'>
            <Label htmlFor='share-binds'>
              {t('binds')}
              <span className='text-muted-foreground ml-2 text-xs'>
                {t('bindCount', { count: loaded.binds?.length ?? 0 })}
              </span>
            </Label>
            <Switch
              checked={selection.binds}
              id='share-binds'
              onCheckedChange={(checked) => setSlice('binds', checked === true)}
            />
          </div>
        ) : null}
        {configSections.length > 0 ? (
          <div className='flex items-center justify-between gap-4'>
            <Label htmlFor='share-config'>{t('config')}</Label>
            <Switch
              checked={configGroupOn}
              id='share-config'
              onCheckedChange={(checked) => setConfigGroup(checked === true)}
            />
          </div>
        ) : null}
        {configSections.length > 0 ? (
          <div className='border-foreground/10 flex flex-col gap-3 border-l pl-4'>
            {configSections.map((section) => (
              <div
                className='flex items-center justify-between gap-4'
                key={section}
              >
                <Label htmlFor={`share-config-${section}`}>
                  {categories(section)}
                </Label>
                <Switch
                  checked={selection[section]}
                  id={`share-config-${section}`}
                  onCheckedChange={(checked) =>
                    setSlice(section, checked === true)
                  }
                />
              </div>
            ))}
          </div>
        ) : null}
      </CollapsibleSection>

      <CollapsibleSection
        action={
          <Button
            onClick={() => {
              copyCfg().catch(() => undefined);
            }}
            size='sm'
            type='button'
            variant='outline'
          >
            <CopyIcon data-icon='inline-start' />
            {tCommon('copy')}
          </Button>
        }
        title={t('preview')}
      >
        <pre className='bg-muted max-h-[28rem] overflow-auto rounded-none p-4 font-mono text-xs leading-relaxed'>
          {cfg}
        </pre>
      </CollapsibleSection>
    </div>
  );
}
