// Steam OpenID response-nonce handling. Ported from better-auth-steam
// (https://github.com/ytsdv/better-auth-steam), MIT License,
// Copyright (c) 2026. See packages/auth/README.md for the full notice.

const RESPONSE_NONCE_RE =
  /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})Z[\x21-\x7e]*$/u;
const RESPONSE_NONCE_MAX_LENGTH = 255;

/** Steam assertions older (or further in the future) than this are rejected. */
export const RESPONSE_NONCE_MAX_AGE_MS = 10 * 60 * 1000;

/**
 * Reads the UTC timestamp OpenID 2.0 prefixes to every response nonce
 * (`2026-10-28T12:00:00Z<unique>`). Returns undefined for malformed or
 * impossible dates such as `2026-02-30`.
 */
export function parseResponseNonceTime(nonce: string): number | undefined {
  if (nonce.length > RESPONSE_NONCE_MAX_LENGTH) {
    return;
  }

  const groups = RESPONSE_NONCE_RE.exec(nonce)?.groups;
  if (!groups) {
    return;
  }

  const year = Number(groups.year);
  const month = Number(groups.month);
  const day = Number(groups.day);
  const hour = Number(groups.hour);
  const minute = Number(groups.minute);
  const second = Number(groups.second);
  const timestamp = Date.UTC(year, month - 1, day, hour, minute, second);
  const date = new Date(timestamp);

  const roundTrips =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day &&
    date.getUTCHours() === hour &&
    date.getUTCMinutes() === minute &&
    date.getUTCSeconds() === second;

  return roundTrips ? timestamp : undefined;
}

/** Whether a nonce timestamp sits inside the accepted window around `now`. */
export function isFreshNonceTime(timestamp: number, now: number): boolean {
  return Math.abs(now - timestamp) <= RESPONSE_NONCE_MAX_AGE_MS;
}

interface NonceStore {
  findVerificationValue: (identifier: string) => Promise<unknown>;
  reserveVerificationValue: (data: {
    expiresAt: Date;
    identifier: string;
    value: string;
  }) => Promise<boolean>;
}

async function nonceIdentifier(nonce: string): Promise<string> {
  const data = new TextEncoder().encode(
    `https://steamcommunity.com/openid/login:${nonce}`
  );
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hex = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');

  return `steam-openid:${hex}`;
}

/**
 * Records a verified nonce in the verification table and returns false when
 * it was already used. The reservation is first-writer-wins on a primary key
 * derived from the identifier, so concurrent replays lose atomically; the
 * lookup first also covers adapters that do not enforce primary keys.
 */
export async function claimResponseNonce(
  store: NonceStore,
  nonce: string,
  steamId: string,
  expiresAt: Date
): Promise<boolean> {
  const identifier = await nonceIdentifier(nonce);

  if (await store.findVerificationValue(identifier)) {
    return false;
  }

  return store.reserveVerificationValue({
    expiresAt,
    identifier,
    value: steamId,
  });
}
