import { index, mysqlTable } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const genres = mysqlTable(
  "genres",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (genre) => ({
    idIdx: index("id_idx").on(genre.id),
  }),
);
