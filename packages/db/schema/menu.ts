import { relations } from "drizzle-orm";
import { index, int, mysqlTable } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { images } from "./image";
import { menuPlatforms } from "./platform";
import { screens } from "./screen";

export const menus = mysqlTable(
  "menus",
  {
    menuPlatformId: int("platformId").notNull(),
    menuTypeId: int("menuTypeId").notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (menu) => ({
    idIdx: index("id_idx").on(menu.id),
  }),
);

export const menusRelations = relations(menus, ({ many, one }) => ({
  menuPlatform: one(menuPlatforms, {
    fields: [menus.menuPlatformId],
    references: [menuPlatforms.id],
  }),
  menuType: one(menuTypes, {
    fields: [menus.menuTypeId],
    references: [menuTypes.id],
  }),
  menuLinks: many(menuLinks),
}));

export const menuLinks = mysqlTable(
  "menuLinks",
  {
    menuLinkImageId: int("menuLinkImageId").notNull(),
    destinationScreenId: int("destinationScreenId").notNull(),
    menuId: int("menuId").notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (menuLink) => ({
    idIdx: index("id_idx").on(menuLink.id),
  }),
);

export const menuLinksRelations = relations(menuLinks, ({ one }) => ({
  menu: one(menus, { fields: [menuLinks.menuId], references: [menus.id] }),
  menuLinkImage: one(menuLinkImages, {
    fields: [menuLinks.menuLinkImageId],
    references: [menuLinkImages.id],
  }),
  destinationScreen: one(screens, {
    fields: [menuLinks.destinationScreenId],
    references: [screens.id],
  }),
}));

export const menuTypes = mysqlTable(
  "menuTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (menuType) => ({
    idIdx: index("id_idx").on(menuType.id),
  }),
);

export const menuTypesRelations = relations(menuTypes, ({ many }) => ({
  menus: many(menus),
}));

export const menuLinkImages = mysqlTable(
  "menuLinkImages",
  {
    menuLinkId: int("menuLinkId").notNull(),
    imageId: int("imageId").notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (menuLinkImage) => ({
    idIdx: index("id_idx").on(menuLinkImage.id),
  }),
);

export const menuLinkImagesRelations = relations(menuLinkImages, ({ one }) => ({
  menuLink: one(menuLinks, {
    fields: [menuLinkImages.menuLinkId],
    references: [menuLinks.id],
  }),
  image: one(images, {
    fields: [menuLinkImages.imageId],
    references: [images.id],
  }),
}));
