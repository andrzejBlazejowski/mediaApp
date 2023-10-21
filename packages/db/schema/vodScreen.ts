import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const vodScreens = mysqlTable(
  "vodScreens",
  {
    vodScreenTypeId: varchar("vodScreenTypeId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (vodScreen) => ({
    idIdx: index("id_idx").on(vodScreen.id),
  }),
);

export const vodScreenTypes = mysqlTable(
  "vodScreenTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (vodScreenType) => ({
    idIdx: index("id_idx").on(vodScreenType.id),
  }),
);

export const vodScreenMediaLists = mysqlTable(
  "vodScreenMediaLists",
  {
    vodScreenId: varchar("vodScreenId", { length: 255 }),
    mediaListId: varchar("mediaListId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (vodScreenMediaList) => ({
    idIdx: index("id_idx").on(vodScreenMediaList.id),
  }),
);
