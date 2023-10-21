import { index, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { baseColumns, dictionaryColumns } from "./commonColumns";

export const images = mySqlTable(
  "images",
  {
    url: varchar("url", { length: 255 }),
    alt: varchar("alt", { length: 255 }),

    ...baseColumns,
    ...dictionaryColumns,
  },
  (image) => ({
    idIdx: index("id_idx").on(image.id),
  }),
);
