import { index, mysqlTable } from "drizzle-orm/mysql-core";

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
