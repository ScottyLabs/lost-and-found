import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { router } from '../trpc';
import account from './account';
import audit from './audit';
import item from './item';
import subscription from './subscription';
import test from './test';
import user from './user';

export const appRouter = router({
  account,
  audit,
  item,
  subscription,
  test,
  user
});

export type AppRouter = typeof appRouter;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
