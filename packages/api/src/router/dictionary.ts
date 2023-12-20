import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  backOfficeDictionaries,
  clientAppDictionaries,
  countries,
} from "@media/db/schema/dictionary";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

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
  create: createCreateQuery<typeof clientAppDictionaries>(
    clientAppDictionaries,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof clientAppDictionaries>(
    clientAppDictionaries,
  ),
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
  create: createCreateQuery<typeof backOfficeDictionaries>(
    backOfficeDictionaries,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof backOfficeDictionaries>(
    backOfficeDictionaries,
  ),
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
  create: createCreateQuery<typeof countries>(
    countries,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof countries>(countries),
});
