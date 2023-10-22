import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { menuLinks } from "./menu";

export const screens = mysqlTable(
  "screens",
  {
    screenTypeId: varchar("screenTypeId", { length: 255 }),
    //TODO:  need to think about that more...
    //TODO: manage screen content I want to set video OR audio OR Article content
    screenContentId: varchar("screenContentId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (screen) => ({
    idIdx: index("id_idx").on(screen.id),
  }),
);

export const screensRelations = relations(screens, ({ many }) => ({
  menuLinks: many(menuLinks),
}));

export const screenTypes = mysqlTable(
  "screenTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (screenType) => ({
    idIdx: index("id_idx").on(screenType.id),
  }),
);
