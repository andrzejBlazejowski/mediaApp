import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  articleScreenImages,
  articleScreenImagesInsertSchema,
  articleScreens,
  articleScreensInsertSchema,
} from "@media/db/schema/articleScreen";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

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

  create: protectedProcedure
    .input(articleScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.articleScreens).values(input);
    }),

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

  create: protectedProcedure
    .input(articleScreenImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.articleScreenImages).values(input);
    }),

  delete: createDeleteQuery<typeof articleScreenImages>(articleScreenImages),
});
