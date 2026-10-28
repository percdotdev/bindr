// Entry point for the Better Auth CLI (`bun run auth:generate`), which reads
// the plugin and adapter options to write ../db/src/schema/auth.ts. The CLI
// loads .env / .env.local from this folder, or export the variables first.
import { getAuth } from './src/server/auth';

export const auth = getAuth();
