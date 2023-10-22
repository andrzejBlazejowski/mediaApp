import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { articleScreens } from "./articleScreen";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { menuLinks } from "./menu";
import { vodScreens } from "./vodScreen";

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

export const screensRelations = relations(screens, ({ many, one }) => ({
  menuLinks: many(menuLinks),
  screenType: one(screenTypes, {
    fields: [screens.screenTypeId],
    references: [screenTypes.id],
  }),
  screenContent: one(articleScreens || vodScreens, {
    fields: [screens.screenContentId],
    references: [articleScreens.id || vodScreens.id],
  }),
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

export const screenTypesRelations = relations(screenTypes, ({ many }) => ({
  screens: many(screens),
}));
