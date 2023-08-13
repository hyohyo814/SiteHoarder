import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { filterMetadata } from "~/server/helpers/filterMetadata";
import { TRPCError } from "@trpc/server";

export const sitesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const sites = await ctx.prisma.site.findMany({
      take: 10,
    });

    return sites;
  }),

  create: privateProcedure.input(
    z.object({
      content: z.string().url(),
    })
  )
  .mutation(async({ctx, input}) => {
    const userId = ctx.userId;
    const siteMeta = await filterMetadata(input.content);

    if (!siteMeta) throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR'
    });

    const siteComplete = await ctx.prisma.site.create({
      data: {
        url: siteMeta.url,
        name: siteMeta.name,
        description: siteMeta.description,
        userId: userId,
      },
    });

    return siteComplete;
  })
});
