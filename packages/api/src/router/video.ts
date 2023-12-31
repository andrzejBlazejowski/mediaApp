import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { videosInsertSchema } from "@media/db/schema/video";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const videoRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.videos.findMany({
      orderBy: desc(schema.videos.id),
      with: {
        videoContents: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videos.findFirst({
        where: eq(schema.videos.id, input.id),
        with: {
          videoContents: true,
        },
      });
    }),
  create: protectedProcedure
    .input(videosInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videos).values(input);
    }),
  update: protectedProcedure
    .input(videosInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videos)
        .set(input)
        .where(eq(schema.videos.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.videos).where(eq(schema.videos.id, input));
  }),
});
