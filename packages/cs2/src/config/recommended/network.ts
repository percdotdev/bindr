import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const NETWORK_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-network-competitive',
    label: 'Competitive network',
    description:
      'Unrestricted rate and zero extra buffer ticks — Valve’s low-latency default. `cl_cmdrate` / `cl_updaterate` / `cl_interp` do not exist as player settings in CS2.',
    category: 'network',
    mmSafe: true,
    source: 'CS2 client cvar',
    commands: ['rate 786432', 'cl_net_buffer_ticks 0'],
    patch: {
      network: {
        rate: 786_432,
        bufferTicks: 0,
      },
    },
  },
  {
    id: 'rec-network-ping-cap',
    label: 'Matchmaking ping cap (80)',
    description: 'Limits MM search to 80 ms.',
    category: 'network',
    mmSafe: true,
    source: 'CS2 client cvar',
    commands: ['mm_dedicated_search_maxping 80'],
    patch: {
      network: {
        maxPing: 80,
      },
    },
  },
];
