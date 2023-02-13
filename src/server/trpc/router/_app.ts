import { router } from '../trpc';
import audit from './audit';
import auth from './auth';
import item from './item';
import user from './user';
import userPermissions from './userPermissions';

export const appRouter = router({
  auth,
  item,
  user,
  userPermissions,
  audit
});

export type AppRouter = typeof appRouter;
