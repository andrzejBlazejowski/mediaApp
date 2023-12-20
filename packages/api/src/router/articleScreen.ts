import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  articleScreenImages,
  articleScreens,
} from "@media/db/schema/articleScreen";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCreateQuery, createDeleteQuery } from "./commonRouter";

export const articleScreenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.articleScreens.findMany({
      orderBy: desc(schema.articleScreens.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.articleScreens.findFirst({
        where: eq(schema.articleScreens.id, input.id),
      });
    }),
  create: createCreateQuery<typeof articleScreens>(
    articleScreens,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof articleScreens>(articleScreens),
});

export const articleScreenImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.articleScreenImages.findMany({
      orderBy: desc(schema.articleScreenImages.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.articleScreenImages.findFirst({
        where: eq(schema.articleScreenImages.id, input.id),
      });
    }),
  create: createCreateQuery<typeof articleScreenImages>(
    articleScreenImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof articleScreenImages>(articleScreenImages),
});
