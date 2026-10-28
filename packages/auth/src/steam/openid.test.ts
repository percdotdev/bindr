import { afterEach, describe, expect, mock, spyOn, test } from 'bun:test';

import { claimResponseNonce } from './nonce';
import { parseSteamAssertion, verifySteamAssertion } from './openid';
import { fallbackSteamProfile, fetchSteamProfile, steamEmail } from './profile';
import {
  checkAuthenticationResponse,
  playerSummariesResponse,
  responseNonce,
  steamAssertion,
  TEST_RETURN_TO,
  TEST_STEAM_ID,
} from './test-fixtures';

const MINUTE = 60_000;

function mockFetch(response: Response) {
  return spyOn(globalThis, 'fetch').mockResolvedValue(response);
}

afterEach(() => {
  mock.restore();
});

describe('verifySteamAssertion', () => {
  test('accepts a valid assertion confirmed by Steam', async () => {
    const fetchMock = mockFetch(checkAuthenticationResponse(true));
    const now = Date.now();
    const params = steamAssertion(TEST_RETURN_TO, {}, now);

    const result = await verifySteamAssertion(params, TEST_RETURN_TO, now);

    expect(result.steamId).toBe(TEST_STEAM_ID);
    expect(result.responseNonce).toBe(
      params.get('openid.response_nonce') ?? ''
    );
    expect(result.nonceExpiresAt.getTime()).toBeGreaterThan(now);

    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(String(url)).toBe('https://steamcommunity.com/openid/login');
    expect(init?.method).toBe('POST');
    expect(init?.redirect).toBe('manual');
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    const body = new URLSearchParams(String(init?.body));
    expect(body.get('openid.mode')).toBe('check_authentication');
    expect(body.get('openid.sig')).toBe(params.get('openid.sig'));
  });

  test('rejects an assertion Steam reports as tampered', async () => {
    mockFetch(checkAuthenticationResponse(false));
    const params = steamAssertion(TEST_RETURN_TO, {
      'openid.sig': 'dGFtcGVyZWQtc2lnbmF0dXJl',
    });

    await expect(verifySteamAssertion(params, TEST_RETURN_TO)).rejects.toThrow(
      'Steam rejected the assertion'
    );
  });

  test('rejects a non-200 or redirecting check_authentication', async () => {
    mockFetch(new Response(null, { headers: { location: '/' }, status: 302 }));

    await expect(
      verifySteamAssertion(steamAssertion(TEST_RETURN_TO), TEST_RETURN_TO)
    ).rejects.toThrow('check_authentication returned 302');
  });

  test('rejects duplicate keys in the check_authentication body', async () => {
    mockFetch(
      new Response(
        'ns:http://specs.openid.net/auth/2.0\nis_valid:false\nis_valid:true\n'
      )
    );

    await expect(
      verifySteamAssertion(steamAssertion(TEST_RETURN_TO), TEST_RETURN_TO)
    ).rejects.toThrow('Duplicate check_authentication field: is_valid');
  });

  test('never calls Steam when local checks fail', async () => {
    const fetchMock = mockFetch(checkAuthenticationResponse(true));
    const params = steamAssertion(TEST_RETURN_TO, {
      'openid.op_endpoint': 'https://evil.example/openid/login',
    });

    await expect(verifySteamAssertion(params, TEST_RETURN_TO)).rejects.toThrow(
      'Invalid openid.op_endpoint'
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('parseSteamAssertion', () => {
  const now = Date.UTC(2026, 9, 28, 12, 0, 0);
  const parse = (overrides: Record<string, string>) =>
    parseSteamAssertion(
      steamAssertion(TEST_RETURN_TO, overrides, now),
      TEST_RETURN_TO,
      now
    );

  test('expires the nonce ten minutes after its timestamp', () => {
    expect(parse({}).nonceExpiresAt).toEqual(new Date(now + 10 * MINUTE));
  });

  test('rejects a wrong op_endpoint', () => {
    expect(() =>
      parse({ 'openid.op_endpoint': 'https://steamcommunity.com/openid/' })
    ).toThrow('Invalid openid.op_endpoint');
  });

  test('rejects a mismatched return_to', () => {
    expect(() =>
      parse({ 'openid.return_to': `${TEST_RETURN_TO}&next=/evil` })
    ).toThrow('Invalid openid.return_to');
    expect(() =>
      parse({
        'openid.return_to':
          'https://evil.example/api/auth/callback/steam?state=test-state',
      })
    ).toThrow('Invalid openid.return_to');
  });

  test('rejects duplicate OpenID params', () => {
    const params = steamAssertion(TEST_RETURN_TO, {}, now);
    params.append(
      'openid.claimed_id',
      'https://steamcommunity.com/openid/id/1'
    );

    expect(() => parseSteamAssertion(params, TEST_RETURN_TO, now)).toThrow(
      'Duplicate OpenID field: openid.claimed_id'
    );
  });

  test('rejects a claimed_id that is not an HTTPS Steam identity', () => {
    for (const claimedId of [
      `http://steamcommunity.com/openid/id/${TEST_STEAM_ID}`,
      `https://steamcommunity.com.evil.example/openid/id/${TEST_STEAM_ID}`,
      `https://steamcommunity.com/openid/id/${TEST_STEAM_ID}/`,
      'https://steamcommunity.com/openid/id/123',
    ]) {
      expect(() =>
        parse({ 'openid.claimed_id': claimedId, 'openid.identity': claimedId })
      ).toThrow('Invalid openid.claimed_id');
    }
  });

  test('rejects an identity that differs from claimed_id', () => {
    expect(() =>
      parse({
        'openid.identity':
          'https://steamcommunity.com/openid/id/76561197960287931',
      })
    ).toThrow('Invalid openid.identity');
  });

  test('rejects stale, future and malformed nonces', () => {
    for (const nonce of [
      responseNonce(now - 11 * MINUTE),
      responseNonce(now + 11 * MINUTE),
      '2026-02-30T12:00:00Zabc',
      'not-a-nonce',
    ]) {
      expect(() => parse({ 'openid.response_nonce': nonce })).toThrow(
        'Invalid openid.response_nonce'
      );
    }
  });

  test('requires every security field to be signed', () => {
    expect(() =>
      parse({
        'openid.signed': 'op_endpoint,claimed_id,identity,response_nonce',
      })
    ).toThrow('Missing signed OpenID field: return_to');
    expect(() =>
      parse({
        'openid.signed':
          'op_endpoint,claimed_id,identity,return_to,return_to,response_nonce,assoc_handle',
      })
    ).toThrow('Invalid openid.signed');
  });

  test('rejects a missing or malformed signature', () => {
    expect(() => parse({ 'openid.sig': '' })).toThrow('Missing openid.sig');
    expect(() => parse({ 'openid.sig': 'not base64!' })).toThrow(
      'Invalid openid.sig'
    );
  });

  test('rejects the wrong mode or namespace', () => {
    expect(() => parse({ 'openid.mode': 'cancel' })).toThrow(
      'Invalid openid.mode'
    );
    expect(() =>
      parse({ 'openid.ns': 'http://openid.net/signon/1.1' })
    ).toThrow('Invalid openid.ns');
  });
});

describe('claimResponseNonce', () => {
  function memoryStore() {
    const rows = new Map<string, string>();
    return {
      findVerificationValue: (identifier: string) =>
        Promise.resolve(rows.get(identifier) ?? null),
      reserveVerificationValue: ({
        identifier,
        value,
      }: {
        identifier: string;
        value: string;
      }) => {
        if (rows.has(identifier)) {
          return Promise.resolve(false);
        }
        rows.set(identifier, value);
        return Promise.resolve(true);
      },
    };
  }

  test('accepts a nonce once and rejects the replay', async () => {
    const store = memoryStore();
    const nonce = responseNonce(Date.now());
    const expiresAt = new Date(Date.now() + 10 * MINUTE);

    expect(
      await claimResponseNonce(store, nonce, TEST_STEAM_ID, expiresAt)
    ).toBe(true);
    expect(
      await claimResponseNonce(store, nonce, TEST_STEAM_ID, expiresAt)
    ).toBe(false);
    expect(
      await claimResponseNonce(
        store,
        responseNonce(Date.now(), 'other'),
        TEST_STEAM_ID,
        expiresAt
      )
    ).toBe(true);
  });
});

describe('fetchSteamProfile', () => {
  test('maps persona name and avatar', async () => {
    const fetchMock = mockFetch(playerSummariesResponse());

    expect(await fetchSteamProfile(TEST_STEAM_ID, 'test-key')).toEqual({
      image: 'https://avatars.steamstatic.com/test_full.jpg',
      name: 'tester',
    });
    const url = new URL(String(fetchMock.mock.calls[0]?.[0]));
    expect(url.searchParams.get('steamids')).toBe(TEST_STEAM_ID);
  });

  test('rejects a profile for a different SteamID', async () => {
    mockFetch(playerSummariesResponse('76561197960287931'));

    await expect(fetchSteamProfile(TEST_STEAM_ID, 'test-key')).rejects.toThrow(
      'no matching player'
    );
  });

  test('builds the fallback identity', () => {
    expect(fallbackSteamProfile(TEST_STEAM_ID).name).toBe(
      `Steam ${TEST_STEAM_ID}`
    );
    expect(steamEmail(TEST_STEAM_ID)).toBe(
      `steam_${TEST_STEAM_ID}@steam.invalid`
    );
  });
});
