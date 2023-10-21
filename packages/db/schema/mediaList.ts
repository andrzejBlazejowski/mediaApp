import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const mediaLists = mysqlTable(
  "mediaLists",
  {
    mediaListTypeId: varchar("mediaListTypeId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (mediaList) => ({
    idIdx: index("id_idx").on(mediaList.id),
  }),
);

export const mediaListMedias = mysqlTable(
  "mediaListMedias",
  {
    mediaId: varchar("mediaId", { length: 255 }),
    mediaListId: varchar("mediaListId", { length: 255 }),

    ...baseColumns,
  },
  (mediaListMedia) => ({
    idIdx: index("id_idx").on(mediaListMedia.id),
  }),
);

export const meidaListTypes = mysqlTable(
  "meidaListTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (meidaListType) => ({
    idIdx: index("id_idx").on(meidaListType.id),
  }),
);
