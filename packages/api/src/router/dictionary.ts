import type { AnyColumn } from "drizzle-orm";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  backOfficeDictionariesInsertSchema,
  clientAppDictionariesInsertSchema,
  countriesInsertSchema,
} from "@media/db/schema/dictionary";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const clientAppDictionaryRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.clientAppDictionaries;
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
    return ctx.db.query.clientAppDictionaries.findMany({
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
      return ctx.db.query.clientAppDictionaries.findFirst({
        where: eq(schema.clientAppDictionaries.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(clientAppDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.clientAppDictionaries).values(input);
    }),
  update: permitedProcedure
    .input(clientAppDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.clientAppDictionaries)
        .set(input)
        .where(eq(schema.clientAppDictionaries.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.clientAppDictionaries)
      .where(eq(schema.clientAppDictionaries.id, input));
  }),
});

export const backOfficeDictionaryRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.backOfficeDictionaries;
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
    return ctx.db.query.backOfficeDictionaries.findMany({
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
      return ctx.db.query.backOfficeDictionaries.findFirst({
        where: eq(schema.backOfficeDictionaries.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(backOfficeDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.backOfficeDictionaries).values(input);
    }),
  update: permitedProcedure
    .input(backOfficeDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.backOfficeDictionaries)
        .set(input)
        .where(eq(schema.backOfficeDictionaries.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.backOfficeDictionaries)
      .where(eq(schema.backOfficeDictionaries.id, input));
  }),
});

export const countryRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.countries;
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
    return ctx.db.query.countries.findMany({
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
      return ctx.db.query.countries.findFirst({
        where: eq(schema.countries.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(countriesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.countries).values(input);
    }),
  update: permitedProcedure
    .input(countriesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.countries)
        .set(input)
        .where(eq(schema.countries.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.countries)
      .where(eq(schema.countries.id, input));
  }),
});
