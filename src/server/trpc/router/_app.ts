import { router } from '../trpc';
import account from './account';
import audit from './audit';
import auth from './auth';
import item from './item';
import subscription from './subscription';
import user from './user';

export const appRouter = router({
  account,
  audit,
  auth,
  item,
  subscription,
  user
});

export type AppRouter = typeof appRouter;
