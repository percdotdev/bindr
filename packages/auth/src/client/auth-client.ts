import { createAuthClient } from 'better-auth/react';

import { steamClient } from '../steam/client-plugin';

/** Browser auth client; talks to the same-origin `/api/auth` handler. */
export const authClient = createAuthClient({
  plugins: [steamClient()],
});
