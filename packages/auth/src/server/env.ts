import { z } from 'zod';

const authEnvSchema = z.object({
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, 'Use at least 32 random characters (openssl rand -base64 32)'),
  BETTER_AUTH_URL: z.url({ protocol: /^https?$/u }),
  DATABASE_URL: z.url({ protocol: /^postgres(?:ql)?$/u }),
  STEAM_API_KEY: z
    .string()
    .regex(/^[0-9A-F]{32}$/iu, 'Expected a 32-character Steam Web API key'),
});

export type AuthEnv = z.infer<typeof authEnvSchema>;

/** Validates the auth environment, naming every missing or invalid variable. */
export function readAuthEnv(source: NodeJS.ProcessEnv = process.env): AuthEnv {
  const result = authEnvSchema.safeParse(source);

  if (!result.success) {
    throw new Error(
      `Invalid auth environment:\n${z.prettifyError(result.error)}`
    );
  }

  return result.data;
}
