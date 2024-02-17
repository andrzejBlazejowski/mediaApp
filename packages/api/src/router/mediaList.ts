import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaListMediasInsertSchema,
  mediaListsInsertSchema,
  mediaListTypesInsertSchema,
} from "@media/db/schema/mediaList";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const mediaListRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.mediaLists;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaLists.findMany({
      with: {
        mediaListType: true,
        mediaListMedias: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaLists.findFirst({
        where: eq(schema.mediaLists.id, input.id),
        with: {
          mediaListType: true,
          mediaListMedias: true,
        },
      });
    }),

  create: permitedProcedure
    .input(mediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaLists).values(input);
    }),
  update: permitedProcedure
    .input(mediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaLists)
        .set(input)
        .where(eq(schema.mediaLists.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaLists)
      .where(eq(schema.mediaLists.id, input));
  }),
});

export const mediaListTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.mediaListTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaListTypes.findMany({
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaListTypes.findFirst({
        where: eq(schema.mediaListTypes.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(mediaListTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaListTypes).values(input);
    }),
  update: permitedProcedure
    .input(mediaListTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaListTypes)
        .set(input)
        .where(eq(schema.mediaListTypes.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaListTypes)
      .where(eq(schema.mediaListTypes.id, input));
  }),
});

export const mediaListMediaRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.mediaListMedias;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaListMedias.findMany({
      with: {
        mediaList: true,
        media: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaListMedias.findFirst({
        where: eq(schema.mediaListMedias.id, input.id),
        with: {
          mediaList: true,
          media: true,
        },
      });
    }),

  create: permitedProcedure
    .input(mediaListMediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaListMedias).values(input);
    }),
  update: permitedProcedure
    .input(mediaListMediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaListMedias)
        .set(input)
        .where(eq(schema.mediaListMedias.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaListMedias)
      .where(eq(schema.mediaListMedias.id, input));
  }),
});
