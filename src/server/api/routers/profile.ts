import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      take: 10,
    });

    return users;
  }),
});
