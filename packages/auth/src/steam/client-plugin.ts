import type { BetterAuthClientPlugin } from 'better-auth/client';

import type { steam } from './plugin';

/** Adds `authClient.signIn.steam()` and `authClient.link.steam()`. */
export function steamClient() {
  return {
    $InferServerPlugin: {} as ReturnType<typeof steam>,
    id: 'steam',
    pathMethods: {
      '/link/steam': 'POST',
      '/sign-in/steam': 'POST',
    },
  } satisfies BetterAuthClientPlugin;
}
