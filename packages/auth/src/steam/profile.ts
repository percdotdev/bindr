// Steam Web API profile lookup. Ported from better-auth-steam
// (https://github.com/ytsdv/better-auth-steam), MIT License,
// Copyright (c) 2026. See packages/auth/README.md for the full notice.

const PLAYER_SUMMARIES_URL =
  'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/';
const REQUEST_TIMEOUT_MS = 10_000;

export interface SteamProfile {
  image: string | undefined;
  name: string;
}

interface PlayerSummary {
  avatarfull?: unknown;
  personaname?: unknown;
  steamid?: unknown;
}

/** Placeholder email; Steam OpenID never shares a real address. */
export function steamEmail(steamId: string): string {
  return `steam_${steamId}@steam.invalid`;
}

export function fallbackSteamProfile(steamId: string): SteamProfile {
  return { image: undefined, name: `Steam ${steamId}` };
}

/**
 * Persona name and full-size avatar from `GetPlayerSummaries`. Throws when
 * the API fails or answers for a different SteamID.
 */
export async function fetchSteamProfile(
  steamId: string,
  apiKey: string
): Promise<SteamProfile> {
  const url = new URL(PLAYER_SUMMARIES_URL);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('steamids', steamId);

  const response = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`GetPlayerSummaries returned ${response.status}`);
  }

  const data = (await response.json()) as {
    response?: { players?: PlayerSummary[] };
  };
  const player = data.response?.players?.[0];

  if (player?.steamid !== steamId) {
    throw new Error('GetPlayerSummaries returned no matching player');
  }
  if (typeof player.personaname !== 'string' || !player.personaname) {
    throw new Error('GetPlayerSummaries returned no persona name');
  }

  return {
    image:
      typeof player.avatarfull === 'string' ? player.avatarfull : undefined,
    name: player.personaname,
  };
}
