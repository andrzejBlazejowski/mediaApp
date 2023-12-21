import { relations } from "drizzle-orm";
import { index, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import { castMembers } from "./cast";
import { baseColumns, dictionaryColumns } from "./commonColumns";

export const clientAppDictionaries = mysqlTable(
  "clientAppDictionaries",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (clientAppDictionary) => ({
    idIdx: index("id_idx").on(clientAppDictionary.id),
  }),
);

export const clientAppDictionariesInsertSchema = createInsertSchema(
  clientAppDictionaries,
);

export const backOfficeDictionaries = mysqlTable(
  "backOfficeDictionaries",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (backOfficeDictionary) => ({
    idIdx: index("id_idx").on(backOfficeDictionary.id),
  }),
);

export const backOfficeDictionariesInsertSchema = createInsertSchema(
  backOfficeDictionaries,
);

export const countries = mysqlTable(
  "countries",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (country) => ({
    idIdx: index("id_idx").on(country.id),
  }),
);

export const countriesRelations = relations(countries, ({ many }) => ({
  castMembers: many(castMembers),
}));

export const countriesInsertSchema = createInsertSchema(countries);
