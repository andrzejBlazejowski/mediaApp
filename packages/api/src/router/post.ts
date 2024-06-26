import { z } from "zod";

import { desc, eq, schema } from "@media/db";

import { createTRPCRouter, permitedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: permitedProcedure.query(({ ctx }) => {
    return ctx.db.query.post.findMany({ orderBy: desc(schema.post.id) });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.post.findFirst({
        where: eq(schema.post.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.post).values(input);
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  }),
});
