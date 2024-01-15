import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { images, imagesInsertSchema } from "@media/db/schema/image";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.images.findMany({ orderBy: desc(schema.images.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.images.findFirst({
        where: eq(schema.images.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(imagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.images).values(input);
    }),
  update: protectedProcedure
    .input(imagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.images)
        .set(input)
        .where(eq(schema.images.id, input.id ?? 0));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.images).where(eq(schema.images.id, input));
  }),
});
