import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  articleScreenImagesInsertSchema,
  articleScreensInsertSchema,
} from "@media/db/schema/articleScreen";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const articleScreenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.articleScreens.findMany({
      orderBy: desc(schema.articleScreens.id),
      with: {
        articleScreenImages: true,
        screens: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.articleScreens.findFirst({
        where: eq(schema.articleScreens.id, input.id),
        with: {
          articleScreenImages: true,
          screens: true,
        },
      });
    }),

  create: protectedProcedure
    .input(articleScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.articleScreens).values(input);
    }),
  update: protectedProcedure
    .input(articleScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.articleScreens)
        .set(input)
        .where(eq(schema.articleScreens.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.articleScreens)
      .where(eq(schema.articleScreens.id, input));
  }),
});

export const articleScreenImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.articleScreenImages.findMany({
      orderBy: desc(schema.articleScreenImages.id),
      with: {
        articleScreen: true,
        image: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.articleScreenImages.findFirst({
        where: eq(schema.articleScreenImages.id, input.id),
        with: {
          articleScreen: true,
          image: true,
        },
      });
    }),

  create: protectedProcedure
    .input(articleScreenImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.articleScreenImages).values(input);
    }),
  update: protectedProcedure
    .input(articleScreenImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.articleScreenImages)
        .set(input)
        .where(eq(schema.articleScreenImages.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.articleScreenImages)
      .where(eq(schema.articleScreenImages.id, input));
  }),
});
