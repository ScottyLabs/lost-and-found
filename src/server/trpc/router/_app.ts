// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import example from "./example";
import auth from "./auth";

export const appRouter = router({
  example,
  auth,
});

// export type definition of API
export type AppRouter = typeof appRouter;
