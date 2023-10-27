import { z } from "zod";

import { eq, schema } from "@media/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const articleScreenRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.articleScreens.findMany({
      where: (articleScreens, { eq }) => eq(articleScreens.isDeleted, false),
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.articleScreens.findFirst({
        where: (articleScreens, { eq, and }) =>
          and(
            eq(articleScreens.id, input.id),
            eq(articleScreens.isDeleted, false),
          ),
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.articleScreens).values({ ...input });
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .update(schema.articleScreens)
      .set({ isDeleted: true })
      .where(eq(schema.articleScreens.id, input));
  }),
});
