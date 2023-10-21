import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const articleScreens = mysqlTable(
  "articleScreens",
  {
    title: varchar("title", { length: 255 }),
    content: varchar("content", { length: 5000 }),

    articleScreenImageId: varchar("articleScreenImageId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (articleScreen) => ({
    idIdx: index("id_idx").on(articleScreen.id),
  }),
);

export const articleScreenImages = mysqlTable(
  "articleScreenImages",
  {
    articleScreenId: varchar("articleScreenId", { length: 255 }),
    imageId: varchar("imageId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (articleScreenImage) => ({
    idIdx: index("id_idx").on(articleScreenImage.id),
  }),
);
