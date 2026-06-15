import { ImageResponse } from 'next/og';
import { SITE } from '@/shared/lib/site';

export const OG_ALT = `${SITE.name} — ${SITE.tagline}`;
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const TOOLS = ['crosshair', 'binds', 'config', 'autoexec', 'guides'];

export function renderOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0a0a0a',
        color: '#fafafa',
        padding: '72px',
        fontFamily: 'monospace',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{ width: '20px', height: '20px', backgroundColor: '#fafafa' }}
        />
        <div style={{ fontSize: '34px', letterSpacing: '-0.02em' }}>
          {SITE.name}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            fontSize: '78px',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
          }}
        >
          CS2 crosshair, binds & config — in your browser
        </div>
        <div style={{ fontSize: '30px', color: '#a1a1aa', maxWidth: '880px' }}>
          Import share codes, generate binds, tune cvars and ship one
          autoexec.cfg.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '14px',
          fontSize: '24px',
          color: '#a1a1aa',
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
