/** Absolute URL Steam sends the browser back to; also the OpenID return_to. */
export function steamReturnTo(baseURL: string, state: string): string {
  const url = new URL(`${baseURL}/callback/steam`);
  url.searchParams.set('state', state);

  return url.toString();
}

/** OpenID realm: the origin Steam shows on its login page. */
export function steamRealm(baseURL: string): string {
  return new URL(baseURL).origin;
}

/**
 * Appends `?error=<code>` to a callback URL, keeping relative targets
 * relative so the redirect stays on the current origin.
 */
export function withErrorParam(
  target: string,
  code: string,
  baseURL: string
): string {
  const url = new URL(target, baseURL);
  url.searchParams.set('error', code);

  return target.startsWith('/')
    ? `${url.pathname}${url.search}${url.hash}`
    : url.toString();
}

/** SteamID stored on a user row, read without widening the user type. */
export function userSteamId(user: object): string | null {
  return 'steamId' in user && typeof user.steamId === 'string'
    ? user.steamId
    : null;
}
