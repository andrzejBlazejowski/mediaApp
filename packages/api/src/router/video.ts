import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { videos, videosInsertSchema } from "@media/db/schema/video";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

export const videoRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.videos.findMany({ orderBy: desc(schema.videos.id) });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videos.findFirst({
        where: eq(schema.videos.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(videosInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videos).values(input);
    }),
  delete: createDeleteQuery<typeof videos>(videos),
});
