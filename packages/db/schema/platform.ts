import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const platforms = mysqlTable(
  "platforms",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (platform) => ({
    idIdx: index("id_idx").on(platform.id),
  }),
);

export const menuPlatforms = mysqlTable(
  "menuPlatforms",
  {
    menuId: varchar("menuId", { length: 255 }),
    platformId: varchar("platformId", { length: 255 }),

    ...baseColumns,
  },
  (menuPlatform) => ({
    idIdx: index("id_idx").on(menuPlatform.id),
  }),
);
