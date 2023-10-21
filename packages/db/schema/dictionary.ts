import { index, mysqlTable } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const ClientAppDictionaries = mysqlTable(
  "ClientAppDictionaries",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (ClientAppDictionary) => ({
    idIdx: index("id_idx").on(ClientAppDictionary.id),
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
