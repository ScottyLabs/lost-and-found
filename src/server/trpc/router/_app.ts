import { router } from '../trpc';
import auth from './auth';
import item from './item';
import user from './user';

export const appRouter = router({
	auth,
	item,
	user
});

export type AppRouter = typeof appRouter;
