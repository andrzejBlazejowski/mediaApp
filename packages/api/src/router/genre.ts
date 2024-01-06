import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { genres, genresInsertSchema } from "@media/db/schema/genre";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const genreRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.genres.findMany({ orderBy: desc(schema.genres.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.genres.findFirst({
        where: eq(schema.genres.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(genresInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.genres).values(input);
    }),
  update: protectedProcedure
    .input(genresInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.genres)
        .set(input)
        .where(eq(schema.genres.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.genres).where(eq(schema.genres.id, input));
  }),
});
