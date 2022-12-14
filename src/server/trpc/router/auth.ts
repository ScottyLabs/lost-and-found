import { protectedProcedure, publicProcedure, router } from '../trpc';

export default router({
  getSession: publicProcedure.query(({ ctx }) => ctx.session),
  getSecretMessage: protectedProcedure.query(
    () => 'You are logged in and can see this secret message!'
  )
});
