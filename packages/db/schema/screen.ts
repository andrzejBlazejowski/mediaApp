import { relations } from "drizzle-orm";
import { index, int, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import { articleScreens } from "./articleScreen";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { menuLinks } from "./menu";
import { vodScreens } from "./vodScreen";

export const screens = mysqlTable(
  "screens",
  {
    screenTypeId: int("screenTypeId").notNull(),
    //TODO:  need to think about that more...
    //TODO: manage screen content I want to set video OR audio OR Article content
    articleScreenId: int("articleScreenId"),
    vodScreenId: int("vodScreenId"),

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
  articleScreen: one(articleScreens, {
    fields: [screens.articleScreenId],
    references: [articleScreens.id],
  }),
  vodScreen: one(vodScreens, {
    fields: [screens.vodScreenId],
    references: [vodScreens.id],
  }),
}));

export const screensInsertSchema = createInsertSchema(screens);

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

export const screenTypesInsertSchema = createInsertSchema(screenTypes);
