import { desc } from "drizzle-orm";
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
  byId: createByIDQuery<typeof clientAppDictionaries>(clientAppDictionaries),
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
  byId: createByIDQuery<typeof backOfficeDictionaries>(backOfficeDictionaries),
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
  byId: createByIDQuery<typeof countries>(countries),
  create: createCreateQuery<typeof countries>(
    countries,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof countries>(countries),
});
