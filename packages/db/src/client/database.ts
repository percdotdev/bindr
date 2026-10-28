import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

/**
 * Drizzle over Neon's HTTP driver: one stateless request per query, which
 * suits serverless functions. It has no interactive transactions.
 */
export function createDatabase(databaseUrl: string) {
  return drizzle({ client: neon(databaseUrl) });
}

export type Database = ReturnType<typeof createDatabase>;
