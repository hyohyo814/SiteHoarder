import { createTRPCRouter } from "~/server/api/trpc";
import { sitesRouter } from "./routers/sites";
import { profileRouter } from "./routers/profile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sites: sitesRouter,
  profiles: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
