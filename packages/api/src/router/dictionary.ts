import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  backOfficeDictionariesInsertSchema,
  clientAppDictionariesInsertSchema,
  countriesInsertSchema,
} from "@media/db/schema/dictionary";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const clientAppDictionaryRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.clientAppDictionaries.findMany({
      orderBy: desc(schema.clientAppDictionaries.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.clientAppDictionaries.findFirst({
        where: eq(schema.clientAppDictionaries.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(clientAppDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.clientAppDictionaries).values(input);
    }),
  update: protectedProcedure
    .input(clientAppDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.clientAppDictionaries)
        .set(input)
        .where(eq(schema.clientAppDictionaries.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.clientAppDictionaries)
      .where(eq(schema.clientAppDictionaries.id, input));
  }),
});

export const backOfficeDictionaryRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.backOfficeDictionaries.findMany({
      orderBy: desc(schema.backOfficeDictionaries.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.backOfficeDictionaries.findFirst({
        where: eq(schema.backOfficeDictionaries.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(backOfficeDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.backOfficeDictionaries).values(input);
    }),
  update: protectedProcedure
    .input(backOfficeDictionariesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.backOfficeDictionaries)
        .set(input)
        .where(eq(schema.backOfficeDictionaries.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.backOfficeDictionaries)
      .where(eq(schema.backOfficeDictionaries.id, input));
  }),
});

export const countryRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.countries.findMany({
      orderBy: desc(schema.countries.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.countries.findFirst({
        where: eq(schema.countries.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(countriesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.countries).values(input);
    }),
  update: protectedProcedure
    .input(countriesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.countries)
        .set(input)
        .where(eq(schema.countries.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.countries)
      .where(eq(schema.countries.id, input));
  }),
});
