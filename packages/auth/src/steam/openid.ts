// Steam OpenID 2.0 assertion verification. Ported from better-auth-steam
// (https://github.com/ytsdv/better-auth-steam), MIT License,
// Copyright (c) 2026. See packages/auth/README.md for the full notice.

import {
  isFreshNonceTime,
  parseResponseNonceTime,
  RESPONSE_NONCE_MAX_AGE_MS,
} from './nonce';

export const STEAM_OPENID_URL = 'https://steamcommunity.com/openid/login';

const OPENID_NAMESPACE = 'http://specs.openid.net/auth/2.0';
const IDENTIFIER_SELECT = 'http://specs.openid.net/auth/2.0/identifier_select';
const STEAM_ID_RE =
  /^https:\/\/steamcommunity\.com\/openid\/id\/(?<steamId>\d{17})$/u;
const PRINTABLE_RE = /^[\x21-\x7e]+$/u;
const BASE64_RE =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u;
const SIGNED_FIELD_RE = /^[A-Za-z0-9_.-]+$/u;
const LINE_BREAK_RE = /\r?\n/u;
const MAX_ASSOC_HANDLE_LENGTH = 255;
const REQUEST_TIMEOUT_MS = 10_000;
const REQUIRED_SIGNED_FIELDS = [
  'op_endpoint',
  'claimed_id',
  'identity',
  'return_to',
  'response_nonce',
  'assoc_handle',
] as const;

export interface SteamAssertion {
  nonceExpiresAt: Date;
  responseNonce: string;
  steamId: string;
}

export class SteamOpenIdError extends Error {
  override name = 'SteamOpenIdError';
}

function fail(reason: string): never {
  throw new SteamOpenIdError(reason);
}

/** The URL that sends the browser to Steam's login page. */
export function buildSteamLoginUrl(realm: string, returnTo: string): string {
  const params = new URLSearchParams({
    'openid.claimed_id': IDENTIFIER_SELECT,
    'openid.identity': IDENTIFIER_SELECT,
    'openid.mode': 'checkid_setup',
    'openid.ns': OPENID_NAMESPACE,
    'openid.realm': realm,
    'openid.return_to': returnTo,
  });

  return `${STEAM_OPENID_URL}?${params.toString()}`;
}

function requireParam(params: URLSearchParams, name: string): string {
  return params.get(name) || fail(`Missing ${name}`);
}

function assertNoDuplicateFields(params: URLSearchParams) {
  const seen = new Set<string>();

  for (const name of params.keys()) {
    if (name.startsWith('openid.') && seen.has(name)) {
      fail(`Duplicate OpenID field: ${name}`);
    }
    seen.add(name);
  }
}

function assertSignedFields(params: URLSearchParams) {
  const list = requireParam(params, 'openid.signed').split(',');
  const signed = new Set(list);

  if (
    signed.size !== list.length ||
    list.some((field) => !SIGNED_FIELD_RE.test(field))
  ) {
    fail('Invalid openid.signed');
  }

  for (const field of REQUIRED_SIGNED_FIELDS) {
    if (!signed.has(field)) {
      fail(`Missing signed OpenID field: ${field}`);
    }
  }
}

/**
 * Validates everything about the assertion that can be checked locally:
 * no duplicated fields, Steam as the OP endpoint, the exact `return_to` we
 * sent, an HTTPS `claimed_id` equal to `identity`, a fresh nonce and every
 * security-relevant field listed in `openid.signed`.
 */
export function parseSteamAssertion(
  params: URLSearchParams,
  expectedReturnTo: string,
  now: number = Date.now()
): SteamAssertion {
  assertNoDuplicateFields(params);

  if (params.get('openid.ns') !== OPENID_NAMESPACE) {
    fail('Invalid openid.ns');
  }
  if (params.get('openid.mode') !== 'id_res') {
    fail('Invalid openid.mode');
  }
  if (params.get('openid.op_endpoint') !== STEAM_OPENID_URL) {
    fail('Invalid openid.op_endpoint');
  }
  if (params.get('openid.return_to') !== expectedReturnTo) {
    fail('Invalid openid.return_to');
  }

  const claimedId = requireParam(params, 'openid.claimed_id');
  const steamId = STEAM_ID_RE.exec(claimedId)?.groups?.steamId;
  if (!steamId) {
    fail('Invalid openid.claimed_id');
  }
  if (params.get('openid.identity') !== claimedId) {
    fail('Invalid openid.identity');
  }

  const assocHandle = requireParam(params, 'openid.assoc_handle');
  if (
    assocHandle.length > MAX_ASSOC_HANDLE_LENGTH ||
    !PRINTABLE_RE.test(assocHandle)
  ) {
    fail('Invalid openid.assoc_handle');
  }
  if (!BASE64_RE.test(requireParam(params, 'openid.sig'))) {
    fail('Invalid openid.sig');
  }

  const responseNonce = requireParam(params, 'openid.response_nonce');
  const nonceTime = parseResponseNonceTime(responseNonce);
  if (nonceTime === undefined || !isFreshNonceTime(nonceTime, now)) {
    fail('Invalid openid.response_nonce');
  }

  assertSignedFields(params);

  return {
    nonceExpiresAt: new Date(nonceTime + RESPONSE_NONCE_MAX_AGE_MS),
    responseNonce,
    steamId,
  };
}

function parseKeyValueForm(text: string): Map<string, string> {
  const fields = new Map<string, string>();

  for (const line of text.split(LINE_BREAK_RE)) {
    if (!line) {
      continue;
    }
    const separator = line.indexOf(':');
    if (separator < 1) {
      fail('Invalid check_authentication response');
    }
    const key = line.slice(0, separator);
    if (fields.has(key)) {
      fail(`Duplicate check_authentication field: ${key}`);
    }
    fields.set(key, line.slice(separator + 1));
  }

  return fields;
}

/**
 * Asks Steam to confirm the signature (OpenID 2.0 direct verification,
 * `check_authentication`). Redirects are never followed.
 */
async function confirmWithSteam(params: URLSearchParams) {
  const body = new URLSearchParams();
  for (const [key, value] of params) {
    if (key.startsWith('openid.')) {
      body.set(key, value);
    }
  }
  body.set('openid.mode', 'check_authentication');

  const response = await fetch(STEAM_OPENID_URL, {
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    redirect: 'manual',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (response.status !== 200) {
    fail(`check_authentication returned ${response.status}`);
  }

  const fields = parseKeyValueForm(await response.text());
  if (
    fields.get('ns') !== OPENID_NAMESPACE ||
    fields.get('is_valid') !== 'true'
  ) {
    fail('Steam rejected the assertion');
  }
}

/** Full verification: local checks first, then Steam's own confirmation. */
export async function verifySteamAssertion(
  params: URLSearchParams,
  expectedReturnTo: string,
  now: number = Date.now()
): Promise<SteamAssertion> {
  const assertion = parseSteamAssertion(params, expectedReturnTo, now);
  await confirmWithSteam(params);

  return assertion;
}
