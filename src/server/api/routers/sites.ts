import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const sitesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const sites = await ctx.prisma.site.findMany({
      take: 10,
    });

    return sites;
  }),
});
