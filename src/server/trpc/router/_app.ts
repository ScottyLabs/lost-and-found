import { router } from '../trpc';
import auth from './auth';
import item from './item';
import user from './user';
import userPermissions from './userPermissions';
import audit from './audit';

export const appRouter = router({
  auth,
  item,
  user,
  userPermissions,
  audit
});

export type AppRouter = typeof appRouter;
