import { router } from '../trpc';

import audit from './audit';
import auth from './auth';
import item from './item';
import subscription from './subscription';
import user from './user';

export const appRouter = router({
  auth,
  item,
  user,
  audit,
  subscription
});

export type AppRouter = typeof appRouter;
