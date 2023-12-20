import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { videos } from "@media/db/schema/video";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCreateQuery, createDeleteQuery } from "./commonRouter";

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
  create: createCreateQuery<typeof videos>(
    videos,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof videos>(videos),
});
