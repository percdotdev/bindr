import { getAuth } from '@workspace/auth/server/auth';

/** Forwards `/api/auth/*` to Better Auth. */
export function handleAuthRequest(request: Request): Promise<Response> {
  return getAuth().handler(request);
}
