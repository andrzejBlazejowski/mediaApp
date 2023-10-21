import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const articleScreens = mysqlTable(
  "articleScreens",
  {
    title: varchar("title", { length: 255 }),
    content: varchar("content", { length: 5000 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (articleScreen) => ({
    idIdx: index("id_idx").on(articleScreen.id),
  }),
);
