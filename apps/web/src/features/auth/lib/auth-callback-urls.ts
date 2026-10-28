/** Query flag the Steam callback appends when sign-in fails. */
export const AUTH_FAILED_PARAM = 'auth';
export const AUTH_FAILED_VALUE = 'failed';

const AUTH_RESULT_PARAMS = [AUTH_FAILED_PARAM, 'error', 'error_description'];

function relative(url: URL): string {
  return `${url.pathname}${url.search}${url.hash}`;
}

/** Return to the current page after Steam, flagging failures in the URL. */
export function authCallbackURLs(href: string) {
  const callback = new URL(href);
  const error = new URL(href);
  error.searchParams.set(AUTH_FAILED_PARAM, AUTH_FAILED_VALUE);

  return { callbackURL: relative(callback), errorCallbackURL: relative(error) };
}

/** The same URL without the parameters the auth callback added. */
export function withoutAuthResult(href: string): string {
  const url = new URL(href);
  for (const param of AUTH_RESULT_PARAMS) {
    url.searchParams.delete(param);
  }

  return relative(url);
}
