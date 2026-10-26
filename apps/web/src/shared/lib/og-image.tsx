import { ImageResponse } from 'next/og';
import { SITE } from '@/shared/lib/site';

export const OG_ALT = `${SITE.name} — CS2 crosshair, binds & config tools`;
export const OG_SIZE = { height: 630, width: 1200 };
export const OG_CONTENT_TYPE = 'image/png';

const TOOLS = ['crosshair', 'binds', 'config', 'autoexec', 'guides'];

export function renderOgImage() {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: '#0a0a0a',
        color: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
        height: '100%',
        justifyContent: 'space-between',
        padding: '72px',
        width: '100%',
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
        <div
          style={{ backgroundColor: '#fafafa', height: '20px', width: '20px' }}
        />
        <div style={{ fontSize: '34px', letterSpacing: '-0.02em' }}>
          {SITE.name}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            fontSize: '78px',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: '900px',
          }}
        >
          CS2 crosshair, binds & config — in your browser
        </div>
        <div style={{ color: '#a1a1aa', fontSize: '30px', maxWidth: '880px' }}>
          Import share codes, generate binds, tune cvars and ship one
          autoexec.cfg.
        </div>
      </div>

      <div
        style={{
          color: '#a1a1aa',
          display: 'flex',
          fontSize: '24px',
          gap: '14px',
        }}
      >
        {TOOLS.map((tool) => (
          <div
            key={tool}
            style={{ border: '1px solid #27272a', padding: '8px 18px' }}
          >
            {tool}
          </div>
        ))}
      </div>
    </div>,
    OG_SIZE
  );
}
