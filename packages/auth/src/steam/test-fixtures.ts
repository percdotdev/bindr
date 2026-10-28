// Synthetic Steam OpenID and Web API responses for tests; no real keys.

export const TEST_STEAM_ID = '76561197960287930';
export const TEST_RETURN_TO =
  'http://localhost:3000/api/auth/callback/steam?state=test-state';

const OPENID_NS = 'http://specs.openid.net/auth/2.0';
const MILLISECONDS_RE = /\.\d{3}Z$/u;

export function responseNonce(at: number, suffix = 'a1b2c3'): string {
  return `${new Date(at).toISOString().replace(MILLISECONDS_RE, 'Z')}${suffix}`;
}

export function steamAssertion(
  returnTo: string,
  overrides: Record<string, string> = {},
  at: number = Date.now()
): URLSearchParams {
  const claimedId = `https://steamcommunity.com/openid/id/${TEST_STEAM_ID}`;

  return new URLSearchParams({
    'openid.assoc_handle': '1234567890',
    'openid.claimed_id': claimedId,
    'openid.identity': claimedId,
    'openid.mode': 'id_res',
    'openid.ns': OPENID_NS,
    'openid.op_endpoint': 'https://steamcommunity.com/openid/login',
    'openid.response_nonce': responseNonce(at),
    'openid.return_to': returnTo,
    'openid.sig': 'c2lnbmF0dXJlLWJ5dGVzIQ==',
    'openid.signed':
      'signed,op_endpoint,claimed_id,identity,return_to,response_nonce,assoc_handle',
    ...overrides,
  });
}

export function checkAuthenticationResponse(valid: boolean): Response {
  return new Response(`ns:${OPENID_NS}\nis_valid:${valid}\n`);
}

export function playerSummariesResponse(steamId = TEST_STEAM_ID): Response {
  return Response.json({
    response: {
      players: [
        {
          avatarfull: 'https://avatars.steamstatic.com/test_full.jpg',
          personaname: 'tester',
          steamid: steamId,
        },
      ],
    },
  });
}
