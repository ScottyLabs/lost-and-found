/* eslint-disable no-console */
// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from './schema.mjs';
import clientEnv, { formatErrors } from './client.mjs';

const serverEnv = serverSchema.safeParse(process.env);

if (!serverEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(serverEnv.error.format())
  );
  throw new Error('Invalid environment variables');
}

Object.keys(serverEnv.data).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.warn('❌ You are exposing a server-side env-variable:', key);

    throw new Error('You are exposing a server-side env-variable');
  }
});

export default { ...serverEnv.data, ...clientEnv };
