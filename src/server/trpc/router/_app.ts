import { router } from '../trpc';

import audit from './audit';
import auth from './auth';
import item from './item';
import permission from './permission';
import subscription from './subscription';
import user from './user';

export const appRouter = router({
  auth,
  item,
  user,
  permission,
  audit,
  subscription
});

export type AppRouter = typeof appRouter;
