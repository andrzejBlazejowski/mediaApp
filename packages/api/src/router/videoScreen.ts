import type { AnyColumn } from "drizzle-orm";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  vodScreenMediaListsInsertSchema,
  vodScreensInsertSchema,
  vodScreenTypesInsertSchema,
} from "@media/db/schema/vodScreen";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const vodScreenRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.vodScreens;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.vodScreens.findMany({
      with: {
        screens: true,
        vodScreenType: true,
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
      return ctx.db.query.vodScreens.findFirst({
        where: eq(schema.vodScreens.id, input.id),
        with: {
          screens: true,
          vodScreenType: true,
        },
      });
    }),

  create: permitedProcedure
    .input(vodScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreens).values(input);
    }),
  update: permitedProcedure
    .input(vodScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.vodScreens)
        .set(input)
        .where(eq(schema.vodScreens.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.vodScreens)
      .where(eq(schema.vodScreens.id, input));
  }),
});

export const vodScreenTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.vodScreenTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.vodScreenTypes.findMany({
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
      return ctx.db.query.vodScreenTypes.findFirst({
        where: eq(schema.vodScreenTypes.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(vodScreenTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreenTypes).values(input);
    }),
  update: permitedProcedure
    .input(vodScreenTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.vodScreenTypes)
        .set(input)
        .where(eq(schema.vodScreenTypes.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.vodScreenTypes)
      .where(eq(schema.vodScreenTypes.id, input));
  }),
});

export const vodScreenMediaListRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.vodScreenMediaLists;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.vodScreenMediaLists.findMany({
      with: {
        vodScreen: true,
        mediaList: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? eq(table[filter.column as keyof typeof table], filter?.value)
            : like(
                table[filter.column as keyof typeof table],
                `%${filter?.value}%`,
              ),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.vodScreenMediaLists.findFirst({
        where: eq(schema.vodScreenMediaLists.id, input.id),
        with: {
          vodScreen: true,
          mediaList: true,
        },
      });
    }),

  create: permitedProcedure
    .input(vodScreenMediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreenMediaLists).values(input);
    }),
  update: permitedProcedure
    .input(vodScreenMediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.vodScreenMediaLists)
        .set(input)
        .where(eq(schema.vodScreenMediaLists.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.vodScreenMediaLists)
      .where(eq(schema.vodScreenMediaLists.id, input));
  }),
});
