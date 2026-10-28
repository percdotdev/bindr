import { defineConfig } from 'drizzle-kit';

// `db:generate` only diffs the schema; `db:migrate` needs DATABASE_URL
// (prefer Neon's direct, non-pooler host for migrations).
export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  dialect: 'postgresql',
  out: './migrations',
  schema: './src/schema/auth.ts',
  strict: true,
});
