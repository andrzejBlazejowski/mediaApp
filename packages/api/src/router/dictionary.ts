import { z } from "zod";

import {
  backOfficeDictionaries,
  clientAppDictionaries,
  countries,
} from "@media/db/schema/dictionary";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const clientAppDictionaryRouter = createTRPCRouter({
  all: createAllQuery<typeof clientAppDictionaries>(clientAppDictionaries),
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
  all: createAllQuery<typeof backOfficeDictionaries>(backOfficeDictionaries),
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
  all: createAllQuery<typeof countries>(countries),
  byId: createByIDQuery<typeof countries>(countries),
  create: createCreateQuery<typeof countries>(
    countries,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof countries>(countries),
});
