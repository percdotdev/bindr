import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const NETWORK_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-network-competitive',
    label: 'Competitive network rates',
    description:
      'Max rate, interp 0 + ratio 1, 128 tick cmd/update — standard MM bundle.',
    category: 'network',
    mmSafe: true,
    source: 'csdb.gg + lineups.gg autoexec',
    commands: [
      'rate 786432',
      'cl_interp_ratio 1',
      'cl_interp 0',
      'cl_cmdrate 128',
      'cl_updaterate 128',
    ],
    patch: {
      network: {
        rate: 786_432,
        interpRatio: 1,
        interp: 0,
        cmdrate: 128,
        updaterate: 128,
      },
    },
  },
  {
    id: 'rec-network-ping-cap',
    label: 'Matchmaking ping cap (80)',
    description: 'Limits MM search to 80 ms — csdb competitive network preset.',
    category: 'network',
    mmSafe: true,
    source: 'csdb.gg competitive network',
    commands: ['mm_dedicated_search_maxping 80'],
    patch: {
      network: {
        maxPing: 80,
      },
    },
  },
];
