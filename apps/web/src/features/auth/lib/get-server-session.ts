import { getAuth } from '@workspace/auth/server/auth';
import { headers } from 'next/headers';

/**
 * The signed-in session for the current request, or null. Reading the request
 * headers first opts the caller into dynamic rendering before the auth env is
 * touched, so builds never need it.
 */
export async function getServerSession() {
  const requestHeaders = await headers();
  return getAuth().api.getSession({ headers: requestHeaders });
}
