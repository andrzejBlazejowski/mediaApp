import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const videos = mysqlTable(
  "videos",
  {
    url: varchar("url", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (video) => ({
    idIdx: index("id_idx").on(video.id),
  }),
);
