import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { menus } from "./menu";

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

export const platformsRelations = relations(platforms, ({ many }) => ({
  menuPlatforms: many(menuPlatforms),
}));

export const menuPlatforms = mysqlTable(
  "menuPlatforms",
  {
    menuId: varchar("menuId", { length: 255 }).notNull(),
    platformId: varchar("platformId", { length: 255 }).notNull(),

    ...baseColumns,
  },
  (menuPlatform) => ({
    idIdx: index("id_idx").on(menuPlatform.id),
  }),
);

export const menuPlatformsRelations = relations(menuPlatforms, ({ one }) => ({
  menu: one(menus, {
    fields: [menuPlatforms.menuId],
    references: [menus.id],
  }),
  platform: one(platforms, {
    fields: [menuPlatforms.platformId],
    references: [platforms.id],
  }),
}));
