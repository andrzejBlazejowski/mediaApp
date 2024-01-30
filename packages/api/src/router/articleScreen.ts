import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  articleScreenImagesInsertSchema,
  articleScreensInsertSchema,
} from "@media/db/schema/articleScreen";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const articleScreenRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.articleScreens;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.articleScreens.findMany({
      with: {
        articleScreenImages: true,
        screens: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
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
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.articleScreenImages;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.articleScreenImages.findMany({
      with: {
        articleScreen: true,
        image: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
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
