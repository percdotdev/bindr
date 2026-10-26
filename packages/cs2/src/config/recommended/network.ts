import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const NETWORK_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    category: 'network',
    commands: ['rate 786432', 'cl_net_buffer_ticks 0'],
    description:
      'Unrestricted rate and zero extra buffer ticks — Valve’s low-latency default. `cl_cmdrate` / `cl_updaterate` / `cl_interp` do not exist as player settings in CS2.',
    id: 'rec-network-competitive',
    label: 'Competitive network',
    mmSafe: true,
    patch: {
      network: {
        bufferTicks: 0,
        rate: 786_432,
      },
    },
    source: 'CS2 client cvar',
  },
  {
    category: 'network',
    commands: ['mm_dedicated_search_maxping 80'],
    description: 'Limits MM search to 80 ms.',
    id: 'rec-network-ping-cap',
    label: 'Matchmaking ping cap (80)',
    mmSafe: true,
    patch: {
      network: {
        maxPing: 80,
      },
    },
    source: 'CS2 client cvar',
  },
];
